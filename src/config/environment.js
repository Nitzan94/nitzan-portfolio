// Environment Configuration Manager for React Applications
// Provides type-safe access to environment variables and feature flags

class EnvironmentConfig {
  constructor() {
    this.env = import.meta.env.MODE || 'development';
    this.isDevelopment = this.env === 'development';
    this.isStaging = this.env === 'staging';
    this.isProduction = this.env === 'production';
    
    // Validate required environment variables
    this.validateEnvironment();
  }

  // API Configuration
  get api() {
    return {
      baseUrl: this.getEnvVar('VITE_API_URL', 'http://localhost:3000/api'),
      timeout: parseInt(this.getEnvVar('VITE_API_TIMEOUT', '5000')),
      retries: parseInt(this.getEnvVar('VITE_API_RETRIES', '3')),
      retryDelay: parseInt(this.getEnvVar('VITE_API_RETRY_DELAY', '1000'))
    };
  }

  // Application Configuration
  get app() {
    return {
      name: this.getEnvVar('VITE_APP_NAME', 'My React App'),
      version: this.getEnvVar('VITE_APP_VERSION', '1.0.0'),
      description: this.getEnvVar('VITE_APP_DESCRIPTION', ''),
      homepage: this.getEnvVar('VITE_APP_HOMEPAGE', '/')
    };
  }

  // Feature Flags
  get features() {
    return {
      analytics: this.getBooleanEnv('VITE_ENABLE_ANALYTICS', false),
      debug: this.getBooleanEnv('VITE_ENABLE_DEBUG', this.isDevelopment),
      mockApi: this.getBooleanEnv('VITE_ENABLE_MOCK_API', false),
      serviceWorker: this.getBooleanEnv('VITE_ENABLE_SW', this.isProduction),
      errorReporting: this.getBooleanEnv('VITE_ENABLE_ERROR_REPORTING', this.isProduction),
      performanceMonitoring: this.getBooleanEnv('VITE_ENABLE_PERFORMANCE', this.isProduction),
      a11y: this.getBooleanEnv('VITE_ENABLE_A11Y', true),
      darkMode: this.getBooleanEnv('VITE_ENABLE_DARK_MODE', true),
      experiments: this.getBooleanEnv('VITE_ENABLE_EXPERIMENTS', !this.isProduction)
    };
  }

  // Third-party Services
  get services() {
    return {
      sentry: {
        dsn: this.getEnvVar('VITE_SENTRY_DSN', ''),
        environment: this.env,
        sampleRate: parseFloat(this.getEnvVar('VITE_SENTRY_SAMPLE_RATE', '1.0'))
      },
      googleAnalytics: {
        measurementId: this.getEnvVar('VITE_GA_MEASUREMENT_ID', ''),
        enabled: this.features.analytics && this.isProduction
      },
      hotjar: {
        hjid: this.getEnvVar('VITE_HOTJAR_ID', ''),
        enabled: this.features.analytics && this.isProduction
      }
    };
  }

  // Development Tools
  get development() {
    return {
      showReduxDevTools: this.isDevelopment,
      enableWhyDidYouRender: this.isDevelopment && this.getBooleanEnv('VITE_ENABLE_WDYR', false),
      enableReactQuery: this.getBooleanEnv('VITE_ENABLE_REACT_QUERY_DEVTOOLS', this.isDevelopment),
      mockServiceWorker: this.isDevelopment && this.getBooleanEnv('VITE_ENABLE_MSW', false)
    };
  }

  // Security Configuration
  get security() {
    return {
      csp: {
        enabled: this.isProduction,
        reportOnly: this.isStaging
      },
      https: {
        enforce: this.isProduction,
        hsts: this.isProduction
      }
    };
  }

  // Performance Configuration
  get performance() {
    return {
      lazyLoading: this.getBooleanEnv('VITE_ENABLE_LAZY_LOADING', true),
      codesplitting: this.getBooleanEnv('VITE_ENABLE_CODE_SPLITTING', true),
      prefetch: this.getBooleanEnv('VITE_ENABLE_PREFETCH', this.isProduction),
      caching: {
        enabled: this.getBooleanEnv('VITE_ENABLE_CACHING', true),
        strategy: this.getEnvVar('VITE_CACHE_STRATEGY', 'stale-while-revalidate')
      }
    };
  }

  // Utility methods
  getEnvVar(key, defaultValue = '') {
    const value = import.meta.env[key];
    return value !== undefined ? value : defaultValue;
  }

  getBooleanEnv(key, defaultValue = false) {
    const value = this.getEnvVar(key, String(defaultValue));
    return value.toLowerCase() === 'true';
  }

  getNumberEnv(key, defaultValue = 0) {
    const value = this.getEnvVar(key, String(defaultValue));
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  getArrayEnv(key, defaultValue = [], separator = ',') {
    const value = this.getEnvVar(key, '');
    return value ? value.split(separator).map(item => item.trim()) : defaultValue;
  }

  // Validation
  validateEnvironment() {
    const requiredVars = ['VITE_API_URL'];
    const missingVars = [];

    for (const varName of requiredVars) {
      if (!import.meta.env[varName]) {
        missingVars.push(varName);
      }
    }

    if (missingVars.length > 0) {
      const message = `Missing required environment variables: ${missingVars.join(', ')}`;
      
      if (this.isProduction) {
        throw new Error(message);
      } else {
        console.warn('⚠️', message);
      }
    }

    // Validate URLs
    const urlVars = ['VITE_API_URL'];
    for (const varName of urlVars) {
      const url = this.getEnvVar(varName);
      if (url && !this.isValidUrl(url)) {
        console.warn(`⚠️ Invalid URL format for ${varName}: ${url}`);
      }
    }
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Debug information
  getDebugInfo() {
    return {
      environment: this.env,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      buildInfo: {
        mode: import.meta.env.MODE,
        dev: import.meta.env.DEV,
        prod: import.meta.env.PROD,
        ssr: import.meta.env.SSR
      },
      config: {
        api: this.api,
        app: this.app,
        features: this.features,
        performance: this.performance
      }
    };
  }

  // Runtime configuration updates
  updateFeatureFlag(flag, value) {
    if (this.isDevelopment) {
      // Store in localStorage for development
      localStorage.setItem(`feature_${flag}`, String(value));
      console.log(`🚩 Feature flag updated: ${flag} = ${value}`);
      
      // Trigger custom event for components to react
      window.dispatchEvent(new CustomEvent('featureFlagUpdate', {
        detail: { flag, value }
      }));
    } else {
      console.warn('Feature flags can only be updated in development mode');
    }
  }

  getFeatureFlag(flag, defaultValue = false) {
    if (this.isDevelopment) {
      const stored = localStorage.getItem(`feature_${flag}`);
      if (stored !== null) {
        return stored === 'true';
      }
    }
    
    return this.features[flag] ?? defaultValue;
  }
}

// Create singleton instance
const config = new EnvironmentConfig();

// Export for use in components
export default config;

// Export individual sections for convenience
export const { api, app, features, services, development, security, performance } = config;

// Development helpers
if (config.isDevelopment) {
  // Make config available in global scope for debugging
  window.__APP_CONFIG__ = config;
  
  // Log configuration on startup
  console.log('🔧 Application Configuration:', config.getDebugInfo());
}

// React Hook for accessing config
export const useEnvironment = () => {
  return config;
};

// React Hook for feature flags with live updates
export const useFeatureFlag = (flag, defaultValue = false) => {
  const [value, setValue] = React.useState(() => 
    config.getFeatureFlag(flag, defaultValue)
  );

  React.useEffect(() => {
    const handleFeatureFlagUpdate = (event) => {
      if (event.detail.flag === flag) {
        setValue(event.detail.value);
      }
    };

    window.addEventListener('featureFlagUpdate', handleFeatureFlagUpdate);
    return () => window.removeEventListener('featureFlagUpdate', handleFeatureFlagUpdate);
  }, [flag]);

  return value;
};