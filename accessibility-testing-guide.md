# Accessibility Testing Guide

This guide provides step-by-step instructions for testing the accessibility improvements and identifying color contrast issues in your portfolio website.

## Quick Testing Setup

### 1. Install Testing Tools

```bash
# Install accessibility testing dependencies
npm install --save-dev @axe-core/react axe-playwright lighthouse

# Install browser testing tools (if system supports)
npm install --save-dev jest-axe @testing-library/jest-dom
```

### 2. Browser Extensions for Manual Testing

1. **axe DevTools** - Chrome/Firefox extension
2. **WAVE Evaluation Tool** - Web accessibility evaluator
3. **Colour Contrast Analyser** - For color testing
4. **Lighthouse** - Built into Chrome DevTools

## Automated Testing Scripts

### A. Lighthouse Accessibility Audit

Create `/home/nitza/claude-projects/nitzan-portfolio/scripts/accessibility-audit.js`:

```javascript
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';

async function runAccessibilityAudit() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['accessibility'],
    port: chrome.port,
  };
  
  const runnerResult = await lighthouse('http://localhost:3000', options);
  
  // Save the report
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lighthouse-accessibility-report.html', reportHtml);
  
  // Log the score
  const accessibilityScore = runnerResult.lhr.categories.accessibility.score * 100;
  console.log(`Accessibility Score: ${accessibilityScore}/100`);
  
  await chrome.kill();
}

runAccessibilityAudit();
```

### B. axe-core Integration Test

Create `/home/nitza/claude-projects/nitzan-portfolio/src/tests/accessibility.test.js`:

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('Home page should not have accessibility violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Manual Testing Checklist

### 1. Color Contrast Testing

#### Browser DevTools Method:
1. Open Chrome DevTools (F12)
2. Navigate to Elements tab
3. Select text element
4. In Styles panel, find `color` property
5. Click the color square
6. Check "Contrast ratio" section
7. Look for AA/AAA compliance indicators

#### Specific Areas to Test:
- [ ] Hero section title on gradient background
- [ ] Form input borders and placeholder text
- [ ] Button text on gradient buttons
- [ ] Architecture diagram node labels
- [ ] Terminal/code syntax highlighting
- [ ] Card borders and subtle text

### 2. Keyboard Navigation Testing

#### Test Sequence:
1. **Tab Navigation:**
   - [ ] Press Tab to move through interactive elements
   - [ ] Verify focus indicators are visible
   - [ ] Check tab order is logical
   - [ ] Ensure all interactive elements are reachable

2. **Keyboard Shortcuts:**
   - [ ] Enter/Space activate buttons
   - [ ] Arrow keys work in carousels/diagrams
   - [ ] Escape closes modals/panels

3. **Focus Management:**
   - [ ] Focus moves to opened panels
   - [ ] Focus returns to trigger after panel close
   - [ ] No focus traps (unless intentional)

### 3. Screen Reader Testing

#### Using NVDA (Windows) or VoiceOver (Mac):

1. **Content Structure:**
   - [ ] Headings form logical hierarchy (h1→h2→h3)
   - [ ] Lists are properly announced
   - [ ] Form labels are associated correctly

2. **Dynamic Content:**
   - [ ] Loading states are announced
   - [ ] Form validation messages are read
   - [ ] Modal/panel changes are communicated

3. **Interactive Elements:**
   - [ ] Buttons have descriptive names
   - [ ] Links describe their purpose
   - [ ] Form fields have clear labels

## Specific Testing Scenarios

### Hero Section Test
```javascript
// Manual test script
const heroTitle = document.querySelector('.hero-title');
const styles = window.getComputedStyle(heroTitle);
const background = document.querySelector('.hero-section');
const bgStyles = window.getComputedStyle(background);

console.log('Hero title color:', styles.color);
console.log('Hero background:', bgStyles.background);
// Check if text is readable against background
```

### Form Contrast Test
```javascript
// Test form input contrast
const inputs = document.querySelectorAll('.form-group input');
inputs.forEach(input => {
  const styles = window.getComputedStyle(input);
  console.log('Input border:', styles.borderColor);
  console.log('Input background:', styles.backgroundColor);
  console.log('Placeholder color:', styles.getPropertyValue('::placeholder')?.color);
});
```

## Testing with Different Conditions

### 1. High Contrast Mode Testing

**Windows:**
1. Press Win+U to open Ease of Access settings
2. Select "High contrast"
3. Turn on high contrast mode
4. Test website appearance and functionality

**CSS Media Query Test:**
```css
/* Test this in browser dev tools */
@media (prefers-contrast: high) {
  /* Your high contrast styles */
}
```

### 2. Color Blindness Simulation

**Chrome DevTools:**
1. Open DevTools → More Tools → Rendering
2. Scroll to "Emulate vision deficiencies"
3. Test with:
   - Protanopia (red-blind)
   - Deuteranopia (green-blind)
   - Tritanopia (blue-blind)
   - Achromatopsia (no color)

### 3. Reduced Motion Testing

```css
/* Test this media query */
@media (prefers-reduced-motion: reduce) {
  /* Your reduced motion styles */
}
```

**Browser Setting:**
- Chrome: Settings → Accessibility → Reduce motion
- Firefox: about:config → ui.prefersReducedMotion

## Automated Testing in CI/CD

### GitHub Actions Workflow
Create `.github/workflows/accessibility.yml`:

```yaml
name: Accessibility Testing

on: [push, pull_request]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Start server
      run: npm start &
      
    - name: Wait for server
      run: sleep 30
    
    - name: Run accessibility tests
      run: npm run test:accessibility
    
    - name: Upload accessibility report
      uses: actions/upload-artifact@v2
      with:
        name: accessibility-report
        path: lighthouse-accessibility-report.html
```

## Common Issues and Solutions

### 1. Low Contrast Issues

**Problem:** Text fails WCAG contrast requirements
**Solution:** 
```css
/* Increase contrast */
color: #fff; /* Instead of #ccc */
background: #000; /* Instead of #333 */

/* Or add text shadow */
text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
```

### 2. Insufficient Focus Indicators

**Problem:** Focus state not visible enough
**Solution:**
```css
button:focus-visible {
  outline: 3px solid #4ade80;
  outline-offset: 2px;
}
```

### 3. Small Touch Targets

**Problem:** Interactive elements < 44px
**Solution:**
```css
@media (max-width: 768px) {
  button, a[role="button"] {
    min-width: 44px;
    min-height: 44px;
  }
}
```

## Performance Impact Monitoring

### Measure Impact of Accessibility Fixes

```javascript
// Before/after performance test
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.startTime);
  }
});

observer.observe({entryTypes: ['measure', 'navigation']});
```

## Reporting and Documentation

### Generate Accessibility Report

```javascript
// Custom reporting function
function generateAccessibilityReport(violations) {
  const report = {
    timestamp: new Date().toISOString(),
    totalViolations: violations.length,
    criticalIssues: violations.filter(v => v.impact === 'critical'),
    moderateIssues: violations.filter(v => v.impact === 'moderate'),
    recommendations: violations.map(v => ({
      rule: v.id,
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl
    }))
  };
  
  return report;
}
```

## Next Steps After Testing

1. **Fix Critical Issues First**
   - Color contrast failures
   - Missing focus indicators
   - Keyboard navigation problems

2. **Implement Gradual Improvements**
   - Add high contrast mode support
   - Improve screen reader experience
   - Enhance mobile touch targets

3. **Establish Ongoing Monitoring**
   - Add accessibility tests to CI/CD pipeline
   - Regular manual testing schedule
   - User feedback collection system

## Resources for Further Learning

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

**Remember:** Accessibility is an ongoing process, not a one-time fix. Regular testing and user feedback are essential for maintaining an accessible website.