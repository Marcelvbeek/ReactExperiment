export interface AnalyticsProvider {
    trackVariant(key: string, value: string): void;
}