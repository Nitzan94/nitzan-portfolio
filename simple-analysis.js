import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://nitzan-portfolio-ovybt0v9r-nitzans-projects-d0fda97a.vercel.app';

async function analyzeWebsite() {
  console.log('🚀 Starting website analysis (without screenshots)...');
  console.log(`🌐 Target URL: ${url}`);
  
  // Create analysis directory
  const analysisDir = path.join(__dirname, 'analysis');
  if (!fs.existsSync(analysisDir)) {
    fs.mkdirSync(analysisDir);
  }

  // Fetch the HTML content
  try {
    console.log('📥 Fetching website HTML...');
    const htmlContent = await fetchHTML(url);
    
    // Save HTML for analysis
    fs.writeFileSync(path.join(analysisDir, 'website-content.html'), htmlContent);
    console.log('✅ HTML content saved');

    // Analyze HTML for potential contrast issues
    const analysis = analyzeHTML(htmlContent);
    
    // Save analysis results
    fs.writeFileSync(
      path.join(analysisDir, 'analysis-results.json'),
      JSON.stringify(analysis, null, 2)
    );

    console.log('\n📊 Analysis Results:');
    console.log(`   • Total text elements found: ${analysis.textElements.length}`);
    console.log(`   • Potential contrast issues: ${analysis.potentialIssues.length}`);
    console.log(`   • Components identified: ${analysis.components.join(', ')}`);
    
    if (analysis.potentialIssues.length > 0) {
      console.log('\n⚠️  Potential contrast issues found:');
      analysis.potentialIssues.forEach((issue, i) => {
        console.log(`   ${i + 1}. ${issue.element}: "${issue.text}"`);
        console.log(`      Classes: ${issue.classes}`);
      });
    }

    // Generate recommendations
    const recommendations = generateRecommendations(analysis);
    
    console.log('\n💡 Recommendations:');
    recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`);
    });

    // Save recommendations
    fs.writeFileSync(
      path.join(analysisDir, 'recommendations.txt'),
      recommendations.join('\n')
    );

    console.log(`\n✅ Analysis complete! Results saved to: ${analysisDir}`);
    
  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
  }
}

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function analyzeHTML(html) {
  const textElements = [];
  const potentialIssues = [];
  const components = new Set();
  
  // Simple HTML parsing using regex (not perfect but useful for analysis)
  const elementRegex = /<(\w+)([^>]*)>([\s\S]*?)<\/\1>/gi;
  const classRegex = /class="([^"]*)"/i;
  const styleRegex = /style="([^"]*)"/i;
  
  let match;
  while ((match = elementRegex.exec(html)) !== null) {
    const [fullMatch, tagName, attributes, content] = match;
    
    // Skip script and style tags
    if (['script', 'style', 'svg', 'path'].includes(tagName.toLowerCase())) {
      continue;
    }
    
    // Extract text content (remove HTML tags)
    const textContent = content.replace(/<[^>]*>/g, '').trim();
    
    if (textContent.length > 0) {
      const classMatch = attributes.match(classRegex);
      const styleMatch = attributes.match(styleRegex);
      
      const classes = classMatch ? classMatch[1] : '';
      const inlineStyle = styleMatch ? styleMatch[1] : '';
      
      textElements.push({
        element: tagName.toLowerCase(),
        text: textContent.substring(0, 100) + (textContent.length > 100 ? '...' : ''),
        classes,
        inlineStyle
      });

      // Identify components
      if (classes) {
        classes.split(/\s+/).forEach(className => {
          if (className.includes('hero') || className.includes('demo') || 
              className.includes('architecture') || className.includes('form') ||
              className.includes('terminal') || className.includes('metrics') ||
              className.includes('timeline') || className.includes('carousel')) {
            components.add(className);
          }
        });
      }

      // Look for potential contrast issues based on class names and styles
      const suspiciousPatterns = [
        /transparent/i,
        /overlay/i,
        /gradient/i,
        /dark.*text/i,
        /light.*text/i,
        /opacity/i,
        /rgba.*0\./i,
        /background.*dark/i,
        /text.*white/i,
        /color.*white/i
      ];

      const hasSuspiciousClass = suspiciousPatterns.some(pattern => 
        pattern.test(classes + ' ' + inlineStyle)
      );

      if (hasSuspiciousClass || inlineStyle.includes('color') || inlineStyle.includes('background')) {
        potentialIssues.push({
          element: tagName.toLowerCase(),
          text: textContent.substring(0, 50) + (textContent.length > 50 ? '...' : ''),
          classes: classes || 'none',
          inlineStyle: inlineStyle || 'none',
          reason: 'Suspicious styling patterns detected'
        });
      }
    }
  }
  
  return {
    textElements,
    potentialIssues,
    components: Array.from(components),
    timestamp: new Date().toISOString()
  };
}

function generateRecommendations(analysis) {
  const recommendations = [];
  
  // General recommendations
  recommendations.push('Run automated accessibility testing with tools like axe-core or Lighthouse');
  recommendations.push('Test with actual users using screen readers');
  recommendations.push('Verify color contrast ratios meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)');
  
  // Specific recommendations based on analysis
  if (analysis.potentialIssues.length > 0) {
    recommendations.push(`Review ${analysis.potentialIssues.length} elements with potentially problematic styling`);
    recommendations.push('Pay special attention to text over gradients, transparent backgrounds, and overlay elements');
  }
  
  // Component-specific recommendations
  if (analysis.components.includes('hero')) {
    recommendations.push('Hero section: Ensure text over background images/videos has sufficient contrast');
  }
  
  if (analysis.components.some(c => c.includes('terminal'))) {
    recommendations.push('Terminal component: Verify terminal text colors meet accessibility standards');
  }
  
  if (analysis.components.some(c => c.includes('gradient'))) {
    recommendations.push('Gradient backgrounds: Test text readability across the entire gradient');
  }
  
  recommendations.push('Consider adding a high contrast mode toggle for users with visual impairments');
  recommendations.push('Test the website with Windows High Contrast mode and forced colors');
  recommendations.push('Use CSS custom properties for colors to enable easy theme switching');
  
  return recommendations;
}

// Run the analysis
analyzeWebsite().catch(console.error);