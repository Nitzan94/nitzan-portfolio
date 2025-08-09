// Enterprise Monitoring & Analytics Utilities
import { v4 as uuidv4 } from 'uuid';

class MonitoringService {
  constructor() {
    this.sessionId = uuidv4();
    this.userId = localStorage.getItem('userId') || 'anonymous';
    this.startTime = Date.now();
    this.metrics = [];
    this.errors = [];
    
    // Initialize performance monitoring
    this.initPerformanceMonitoring();
    this.initErrorTracking();
    
    // Start periodic metrics collection
    this.startMetricsCollection();
  }

  // Performance Monitoring
  initPerformanceMonitoring() {
    // Web Vitals tracking
    if (typeof window !== 'undefined') {
      // Track Core Web Vitals
      this.trackWebVitals();
      
      // Track custom performance metrics
      this.trackCustomMetrics();
      
      // Track user interactions
      this.trackUserInteractions();
    }
  }

  trackWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('lcp', lastEntry.startTime, {
        element: lastEntry.element?.tagName || 'unknown'
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.recordMetric('fid', entry.processingStart - entry.startTime, {
          eventType: entry.name
        });
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.recordMetric('cls', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  trackCustomMetrics() {
    // API Response Times
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        
        this.recordMetric('api_response_time', endTime - startTime, {
          url: args[0],
          status: response.status,
          success: response.ok
        });
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        this.recordMetric('api_response_time', endTime - startTime, {
          url: args[0],
          error: error.message,
          success: false
        });
        throw error;
      }
    };

    // Component Render Times
    this.trackComponentRenders();
  }

  trackComponentRenders() {
    // Higher-order component for tracking render performance
    window.withPerformanceTracking = (WrappedComponent, componentName) => {
      return function PerformanceTrackedComponent(props) {
        React.useEffect(() => {
          const startTime = performance.now();
          return () => {
            const renderTime = performance.now() - startTime;
            this.recordMetric('component_render_time', renderTime, {
              component: componentName
            });
          };
        });
        
        return React.createElement(WrappedComponent, props);
      };
    };
  }

  trackUserInteractions() {
    // Click tracking
    document.addEventListener('click', (event) => {
      this.recordEvent('user_click', {
        element: event.target.tagName,
        className: event.target.className,
        id: event.target.id,
        coordinates: { x: event.clientX, y: event.clientY }
      });
    });

    // Form interactions
    document.addEventListener('submit', (event) => {
      this.recordEvent('form_submit', {
        formId: event.target.id,
        formAction: event.target.action
      });
    });

    // Scroll depth tracking
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        this.recordEvent('scroll_depth', { depth: scrollDepth });
      }
    });
  }

  // Error Tracking
  initErrorTracking() {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.recordError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.recordError({
        type: 'promise_rejection',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack
      });
    });

    // React error boundary integration
    window.reportReactError = (error, errorInfo) => {
      this.recordError({
        type: 'react',
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    };
  }

  // Metrics Collection
  recordMetric(name, value, metadata = {}) {
    const metric = {
      id: uuidv4(),
      name,
      value,
      metadata,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    this.metrics.push(metric);
    
    // Send to analytics service
    this.sendMetric(metric);
  }

  recordEvent(event, data = {}) {
    this.recordMetric(`event.${event}`, 1, data);
  }

  recordError(error) {
    const errorRecord = {
      id: uuidv4(),
      ...error,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    this.errors.push(errorRecord);
    
    // Send to error tracking service
    this.sendError(errorRecord);
  }

  // Data Transmission
  async sendMetric(metric) {
    try {
      // In development, just log
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Metric:', metric);
        return;
      }

      // Send to analytics endpoint
      await fetch('/api/analytics/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric)
      });
    } catch (error) {
      console.warn('Failed to send metric:', error);
    }
  }

  async sendError(error) {
    try {
      // In development, just log
      if (process.env.NODE_ENV === 'development') {
        console.error('🚨 Error:', error);
        return;
      }

      // Send to error tracking endpoint
      await fetch('/api/analytics/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error)
      });
    } catch (err) {
      console.warn('Failed to send error:', err);
    }
  }

  // Periodic metrics collection
  startMetricsCollection() {
    setInterval(() => {
      this.collectSystemMetrics();
    }, 30000); // Every 30 seconds

    // Send session summary on page unload
    window.addEventListener('beforeunload', () => {
      this.sendSessionSummary();
    });
  }

  collectSystemMetrics() {
    // Memory usage
    if (performance.memory) {
      this.recordMetric('memory_used', performance.memory.usedJSHeapSize);
      this.recordMetric('memory_total', performance.memory.totalJSHeapSize);
      this.recordMetric('memory_limit', performance.memory.jsHeapSizeLimit);
    }

    // Connection info
    if (navigator.connection) {
      this.recordMetric('connection_type', navigator.connection.effectiveType, {
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      });
    }

    // Session duration
    const sessionDuration = Date.now() - this.startTime;
    this.recordMetric('session_duration', sessionDuration);
  }

  sendSessionSummary() {
    const summary = {
      sessionId: this.sessionId,
      userId: this.userId,
      duration: Date.now() - this.startTime,
      metricsCount: this.metrics.length,
      errorsCount: this.errors.length,
      url: window.location.href,
      timestamp: Date.now()
    };

    // Use sendBeacon for reliable delivery
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/sessions', JSON.stringify(summary));
    }
  }

  // Public API
  track(event, data = {}) {
    this.recordEvent(event, data);
  }

  trackTiming(name, duration, metadata = {}) {
    this.recordMetric(`timing.${name}`, duration, metadata);
  }

  trackFeatureUsage(feature, action = 'used', metadata = {}) {
    this.recordEvent(`feature.${feature}.${action}`, metadata);
  }

  setUserId(userId) {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }

  // A/B Testing support
  getVariant(experimentName) {
    const variants = ['A', 'B'];
    const hash = this.hashString(this.userId + experimentName);
    const variant = variants[hash % variants.length];
    
    this.recordEvent('experiment_exposure', {
      experiment: experimentName,
      variant
    });
    
    return variant;
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}

// Singleton instance
const monitoring = new MonitoringService();

// React Hook for easy integration
export const useMonitoring = () => {
  React.useEffect(() => {
    // Track component mount
    monitoring.trackFeatureUsage('component_mount');
    
    return () => {
      // Track component unmount
      monitoring.trackFeatureUsage('component_unmount');
    };
  }, []);

  return {
    track: monitoring.track.bind(monitoring),
    trackTiming: monitoring.trackTiming.bind(monitoring),
    trackFeature: monitoring.trackFeatureUsage.bind(monitoring),
    getVariant: monitoring.getVariant.bind(monitoring)
  };
};

export default monitoring;