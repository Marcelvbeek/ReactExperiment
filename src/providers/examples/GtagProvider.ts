import { AnalyticsProvider } from "../AnalyticsProvider.interface";

export class GtagProvider implements AnalyticsProvider {
    constructor(private measurementId: string) {

    }

    trackVariant(key: string, value: string) {
        gtag('config', this.measurementId, {
            'custom_map': {
                [`exp:${key}`]: value,
            }
        });
    }
}