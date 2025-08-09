import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'http://localhost:3000';

async function takeScreenshots() {
  console.log('🚀 Starting comprehensive website analysis with Playwright...');
  
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  let browser;
  
  try {
    // Launch browser
    browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 }
    });

    console.log(`📱 Navigating to ${url}...`);
    
    // Navigate and wait for load
    await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    // Wait for page to fully load
    await page.waitForTimeout(3000);

    console.log('📸 Taking full page screenshot...');
    
    // 1. Full page screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, '01-full-page.png'),
      fullPage: true
    });

    // 2. Above the fold (hero section)
    console.log('📸 Taking hero section screenshot...');
    await page.screenshot({
      path: path.join(screenshotsDir, '02-hero-section.png'),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });

    // 3. Try to find and screenshot specific sections
    const sections = [
      { name: 'demo', selectors: ['.demo-section', '#demo', '[class*="demo"]', '.demo-carousel'] },
      { name: 'architecture', selectors: ['.architecture-section', '#architecture', '[class*="architecture"]', '.enhanced-architecture'] },
      { name: 'form', selectors: ['.form-section', '#form', 'form', '[class*="form"]', '.lead-form'] },
      { name: 'terminal', selectors: ['.terminal', '[class*="terminal"]', '.enhanced-terminal'] },
      { name: 'metrics', selectors: ['.metrics', '[class*="metrics"]', '.futuristic-metrics'] },
      { name: 'timeline', selectors: ['.timeline', '[class*="timeline"]', '.enhanced-timeline'] },
      { name: 'particles', selectors: ['.particle-background', '[class*="particle"]'] }
    ];

    for (const section of sections) {
      try {
        console.log(`📸 Looking for ${section.name} section...`);
        
        let element = null;
        
        // Try each selector until we find the element
        for (const selector of section.selectors) {
          try {
            element = await page.$(selector);
            if (element) {
              console.log(`✅ Found ${section.name} section with selector: ${selector}`);
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }
        
        if (element) {
          // Scroll element into view
          await element.scrollIntoViewIfNeeded();
          await page.waitForTimeout(1000);
          
          // Take screenshot of the element
          await element.screenshot({
            path: path.join(screenshotsDir, `03-${section.name}-section.png`)
          });
        } else {
          console.log(`⚠️  ${section.name} section not found with any selector`);
          
          // Take a screenshot at potential scroll positions
          const scrollPositions = [800, 1600, 2400, 3200];
          for (const scrollY of scrollPositions) {
            await page.evaluate(y => window.scrollTo(0, y), scrollY);
            await page.waitForTimeout(500);
            
            // Check if we can find the element now
            for (const selector of section.selectors) {
              try {
                element = await page.$(selector);
                if (element && await element.isVisible()) {
                  await element.screenshot({
                    path: path.join(screenshotsDir, `03-${section.name}-section.png`)
                  });
                  console.log(`✅ Found ${section.name} after scrolling`);
                  break;
                }
              } catch (e) {
                // Continue
              }
            }
            if (element) break;
          }
          
          // Scroll back to top
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(1000);
        }
      } catch (error) {
        console.log(`❌ Error capturing ${section.name} section:`, error.message);
      }
    }

    // 4. Mobile view screenshots
    console.log('📱 Taking mobile screenshots...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(2000);
    
    await page.screenshot({
      path: path.join(screenshotsDir, '04-mobile-full.png'),
      fullPage: true
    });

    await page.screenshot({
      path: path.join(screenshotsDir, '05-mobile-hero.png'),
      clip: { x: 0, y: 0, width: 375, height: 812 }
    });

    // 5. Accessibility analysis - check for contrast issues
    console.log('🔍 Analyzing accessibility and contrast issues...');
    
    await page.setViewportSize({ width: 1920, height: 1080 });
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
      const analyzedElements = [];
      
      textElements.forEach((element, index) => {
        if (element.children.length === 0 && element.textContent.trim()) {
          const rect = element.getBoundingClientRect();
          
          // Skip elements that are not visible
          if (rect.width === 0 || rect.height === 0) return;
          
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
          
          const elementInfo = {
            element: element.tagName.toLowerCase(),
            text: element.textContent.trim().substring(0, 50) + (element.textContent.length > 50 ? '...' : ''),
            textColor,
            backgroundColor: actualBgColor,
            contrast: contrast ? contrast.toFixed(2) : 'unknown',
            required: requiredRatio,
            fontSize,
            fontWeight,
            isLargeText,
            rect: {
              x: Math.round(rect.x),
              y: Math.round(rect.y),
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            },
            classes: element.className || ''
          };
          
          analyzedElements.push(elementInfo);
          
          if (contrast !== null && contrast < requiredRatio) {
            issues.push(elementInfo);
          }
        }
      });
      
      return {
        totalElements: analyzedElements.length,
        analyzedElements: analyzedElements.slice(0, 50), // First 50 for review
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
        console.log(`      Classes: ${issue.classes || 'none'}`);
      });
    }

    // 6. Take screenshot highlighting contrast issues
    if (contrastAnalysis.issues.length > 0) {
      console.log('📸 Taking screenshot with contrast issues highlighted...');
      
      await page.addStyleTag({
        content: `
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
        `
      });

      // Highlight elements with contrast issues
      await page.evaluate((issues) => {
        issues.forEach((issue, index) => {
          if (index < 10) { // Limit to first 10 highlights
            const elements = document.querySelectorAll('*');
            elements.forEach(element => {
              if (element.textContent && element.textContent.trim().startsWith(issue.text.replace('...', ''))) {
                element.classList.add('contrast-issue-highlight');
              }
            });
          }
        });
      }, contrastAnalysis.issues);

      await page.waitForTimeout(1000);
      
      await page.screenshot({
        path: path.join(screenshotsDir, '06-contrast-issues-highlighted.png'),
        fullPage: true
      });
    }

    // 7. Take screenshots at different scroll positions for complete coverage
    console.log('📸 Taking scrolled view screenshots...');
    const scrollPositions = [0, 800, 1600, 2400, 3200];
    
    for (let i = 0; i < scrollPositions.length; i++) {
      await page.evaluate(y => window.scrollTo(0, y), scrollPositions[i]);
      await page.waitForTimeout(1000);
      
      await page.screenshot({
        path: path.join(screenshotsDir, `07-scroll-${i + 1}-y${scrollPositions[i]}.png`),
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
    }

    console.log('\n✅ Screenshot analysis complete!');
    console.log(`📁 Screenshots saved to: ${screenshotsDir}`);
    
    // Generate summary report
    const summary = {
      url,
      timestamp: new Date().toISOString(),
      screenshots: {
        fullPage: '01-full-page.png',
        hero: '02-hero-section.png',
        sections: sections.map(s => `03-${s.name}-section.png`),
        mobile: ['04-mobile-full.png', '05-mobile-hero.png'],
        highlighted: '06-contrast-issues-highlighted.png',
        scrollViews: scrollPositions.map((y, i) => `07-scroll-${i + 1}-y${y}.png`)
      },
      accessibility: {
        totalElements: contrastAnalysis.totalElements,
        issuesFound: contrastAnalysis.issues.length,
        topIssues: contrastAnalysis.issues.slice(0, 5).map(issue => ({
          text: issue.text,
          contrast: issue.contrast,
          required: issue.required,
          element: issue.element,
          classes: issue.classes
        }))
      }
    };

    fs.writeFileSync(
      path.join(screenshotsDir, 'analysis-summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
  } catch (error) {
    console.error('❌ Error during screenshot capture:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the screenshot analysis
takeScreenshots().catch(console.error);