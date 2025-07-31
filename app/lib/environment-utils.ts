import { CURRENT_CONFIG, CURRENT_ENVIRONMENT } from './environments';

export class EnvironmentUtils {
  static get config() {
    return CURRENT_CONFIG;
  }

  static get environment() {
    return CURRENT_ENVIRONMENT;
  }

  static isProduction() {
    return CURRENT_ENVIRONMENT === 'client-production';
  }

  static isDevelopment() {
    return CURRENT_ENVIRONMENT === 'development';
  }

  static isDemo() {
    return CURRENT_ENVIRONMENT.startsWith('demo-');
  }

  static hasFeature(feature: keyof typeof CURRENT_CONFIG.features): boolean {
    return CURRENT_CONFIG.features[feature] || false;
  }

  static getBranding() {
    return CURRENT_CONFIG.branding || {};
  }

  static getLimits() {
    return CURRENT_CONFIG.limits || {};
  }

  static getTitle(): string {
    return this.getBranding().title || 'HeyGen Interactive Avatar';
  }

  static shouldEnableAnalytics(): boolean {
    return this.hasFeature('analytics') && this.isProduction();
  }

  static getMaxSessionDuration(): number {
    return this.getLimits().maxSessionDuration || 0;
  }

  static getMaxMessagesPerSession(): number {
    return this.getLimits().maxMessagesPerSession || 0;
  }

  static shouldShowFeature(feature: string): boolean {
    switch (feature) {
      case 'github-link':
        return this.isDevelopment();
      case 'api-docs':
        return this.isDevelopment();
      case 'learn-more':
        return !this.isDemo();
      default:
        return true;
    }
  }
} 