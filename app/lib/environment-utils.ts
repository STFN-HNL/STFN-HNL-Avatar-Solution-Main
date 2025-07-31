import { CURRENT_CONFIG, EnvironmentConfig } from './environments';

export class EnvironmentUtils {
  static get config() {
    return CURRENT_CONFIG;
  }

  static hasFeature(feature: keyof typeof CURRENT_CONFIG.features): boolean {
    return CURRENT_CONFIG.features[feature] || false;
  }

  static getBranding(): EnvironmentConfig['branding'] {
    return CURRENT_CONFIG.branding;
  }

  static getTitle(): string {
    return this.getBranding()?.title || 'Avatar Solution';
  }
} 