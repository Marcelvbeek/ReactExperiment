export interface ExperimentProvider {
    getVariant(key: string): string | undefined;
}