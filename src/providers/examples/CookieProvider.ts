import { ExperimentProvider } from "../ExperimentProvider.interface";

const prefix = 'experiment';

export class CookieProvider implements ExperimentProvider {
    getVariant(key: string) {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v => v.split(/=(.*)/s).map(decodeURIComponent)));
        return cookies[`${prefix}-${key}`];
    }
}