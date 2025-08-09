import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'http://localhost:3000';

async function takeScreenshots() {
  console.log('🚀 Starting comprehensive website analysis...');
  
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-features=VizDisplayCompositor',
      '--disable-extensions',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
      '--single-process'
    ],
    executablePath: null  // Let Puppeteer find its own Chrome
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport for consistent screenshots
    await page.setViewport({ 
      width: 1920, 
      height: 1080,
      deviceScaleFactor: 1
    });

    console.log(`📱 Navigating to ${url}...`);
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Wait for page to fully load
    await page.waitForTimeout(3000);

    console.log('📸 Taking full page screenshot...');
    
    // 1. Full page screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, '01-full-page.png'),
      fullPage: true,
      type: 'png'
    });

    // 2. Above the fold (hero section)
    console.log('📸 Taking hero section screenshot...');
    await page.screenshot({
      path: path.join(screenshotsDir, '02-hero-section.png'),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
      type: 'png'
    });

    // 3. Try to find and screenshot specific sections
    const sections = [
      { name: 'demo', selector: '.demo-section, #demo, [class*="demo"]' },
      { name: 'architecture', selector: '.architecture-section, #architecture, [class*="architecture"]' },
      { name: 'form', selector: '.form-section, #form, form, [class*="form"]' },
      { name: 'terminal', selector: '.terminal, [class*="terminal"]' },
      { name: 'metrics', selector: '.metrics, [class*="metrics"]' },
      { name: 'timeline', selector: '.timeline, [class*="timeline"]' }
    ];

    for (const section of sections) {
      try {
        console.log(`📸 Looking for ${section.name} section...`);
        
        // Try to find the element
        const element = await page.$(section.selector);
        if (element) {
          console.log(`✅ Found ${section.name} section, taking screenshot...`);
          
          // Scroll element into view
          await page.evaluate((el) => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, element);
          
          await page.waitForTimeout(1000);
          
          // Take screenshot of the element
          await element.screenshot({
            path: path.join(screenshotsDir, `03-${section.name}-section.png`),
            type: 'png'
          });
        } else {
          console.log(`⚠️  ${section.name} section not found with selector: ${section.selector}`);
        }
      } catch (error) {
        console.log(`❌ Error capturing ${section.name} section:`, error.message);
      }
    }

    // 4. Mobile view screenshots
    console.log('📱 Taking mobile screenshots...');
    await page.setViewport({ width: 375, height: 812 });
    await page.waitForTimeout(2000);
    
    await page.screenshot({
      path: path.join(screenshotsDir, '04-mobile-full.png'),
      fullPage: true,
      type: 'png'
    });

    await page.screenshot({
      path: path.join(screenshotsDir, '05-mobile-hero.png'),
      clip: { x: 0, y: 0, width: 375, height: 812 },
      type: 'png'
    });

    // 5. Accessibility analysis - check for contrast issues
    console.log('🔍 Analyzing accessibility and contrast issues...');
    
    await page.setViewport({ width: 1920, height: 1080 });
    await page.waitForTimeout(2000);

    const contrastAnalysis = await page.evaluate(() => {
      const issues = [];
      
      // Helper function to get computed styles
      function getComputedColor(element, property) {
        return window.getComputedStyle(element)[property];
      }
      
      // Helper function to convert rgb to luminance
      function getLuminance(rgbColor) {
        if (!rgbColor || rgbColor === 'transparent') return null;
        
        const rgb = rgbColor.match(/\d+/g);
        if (!rgb || rgb.length < 3) return null;
        
        const [r, g, b] = rgb.map(x => {
          const val = parseInt(x) / 255;
          return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }
      
      // Helper function to calculate contrast ratio
      function getContrastRatio(color1, color2) {
        const l1 = getLuminance(color1);
        const l2 = getLuminance(color2);
        
        if (l1 === null || l2 === null) return null;
        
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        
        return (lighter + 0.05) / (darker + 0.05);
      }
      
      // Find all text elements
      const textElements = document.querySelectorAll('*');
      
      textElements.forEach((element, index) => {
        if (element.children.length === 0 && element.textContent.trim()) {
          const textColor = getComputedColor(element, 'color');
          const bgColor = getComputedColor(element, 'backgroundColor');
          const fontSize = parseInt(getComputedColor(element, 'fontSize'));
          const fontWeight = getComputedColor(element, 'fontWeight');
          
          // Get background color from parent if transparent
          let actualBgColor = bgColor;
          if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            let parent = element.parentElement;
            while (parent && (actualBgColor === 'rgba(0, 0, 0, 0)' || actualBgColor === 'transparent')) {
              actualBgColor = getComputedColor(parent, 'backgroundColor');
              parent = parent.parentElement;
            }
            if (actualBgColor === 'rgba(0, 0, 0, 0)' || actualBgColor === 'transparent') {
              actualBgColor = 'rgb(255, 255, 255)'; // Assume white background
            }
          }
          
          const contrast = getContrastRatio(textColor, actualBgColor);
          const isLargeText = fontSize >= 18 || (fontSize >= 14 && parseInt(fontWeight) >= 700);
          const requiredRatio = isLargeText ? 3.0 : 4.5;
          
          if (contrast !== null && contrast < requiredRatio) {
            issues.push({
              element: element.tagName.toLowerCase(),
              text: element.textContent.trim().substring(0, 50) + (element.textContent.length > 50 ? '...' : ''),
              textColor,
              backgroundColor: actualBgColor,
              contrast: contrast.toFixed(2),
              required: requiredRatio,
              fontSize,
              fontWeight,
              isLargeText,
              rect: element.getBoundingClientRect()
            });
          }
        }
      });
      
      return {
        totalElements: textElements.length,
        issues: issues.slice(0, 20), // Limit to first 20 issues
        timestamp: new Date().toISOString()
      };
    });

    // Save contrast analysis to file
    fs.writeFileSync(
      path.join(screenshotsDir, 'contrast-analysis.json'),
      JSON.stringify(contrastAnalysis, null, 2)
    );

    console.log(`\n📊 Accessibility Analysis Complete:`);
    console.log(`   • Total elements analyzed: ${contrastAnalysis.totalElements}`);
    console.log(`   • Contrast issues found: ${contrastAnalysis.issues.length}`);
    
    if (contrastAnalysis.issues.length > 0) {
      console.log(`\n⚠️  Top contrast issues:`);
      contrastAnalysis.issues.slice(0, 5).forEach((issue, i) => {
        console.log(`   ${i + 1}. "${issue.text}" - Contrast: ${issue.contrast}:1 (needs ${issue.required}:1)`);
        console.log(`      Colors: ${issue.textColor} on ${issue.backgroundColor}`);
      });
    }

    // 6. Take screenshot highlighting contrast issues
    if (contrastAnalysis.issues.length > 0) {
      console.log('📸 Taking screenshot with contrast issues highlighted...');
      
      await page.evaluate((issues) => {
        // Add highlighting styles
        const style = document.createElement('style');
        style.textContent = `
          .contrast-issue-highlight {
            outline: 3px solid red !important;
            outline-offset: 2px !important;
            position: relative !important;
          }
          .contrast-issue-highlight::after {
            content: "⚠️ Low Contrast";
            position: absolute !important;
            top: -25px !important;
            left: 0 !important;
            background: red !important;
            color: white !important;
            padding: 2px 6px !important;
            font-size: 12px !important;
            border-radius: 3px !important;
            z-index: 9999 !important;
          }
        `;
        document.head.appendChild(style);

        // Find and highlight elements with contrast issues
        const textElements = document.querySelectorAll('*');
        let highlightCount = 0;
        
        issues.forEach(issue => {
          textElements.forEach(element => {
            if (element.textContent.trim().startsWith(issue.text.replace('...', '')) && highlightCount < 10) {
              element.classList.add('contrast-issue-highlight');
              highlightCount++;
            }
          });
        });
      }, contrastAnalysis.issues);

      await page.waitForTimeout(1000);
      
      await page.screenshot({
        path: path.join(screenshotsDir, '06-contrast-issues-highlighted.png'),
        fullPage: true,
        type: 'png'
      });
    }

    console.log('\n✅ Screenshot analysis complete!');
    console.log(`📁 Screenshots saved to: ${screenshotsDir}`);
    
  } catch (error) {
    console.error('❌ Error during screenshot capture:', error);
  } finally {
    await browser.close();
  }
}

// Run the screenshot analysis
takeScreenshots().catch(console.error);