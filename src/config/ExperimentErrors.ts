export enum ExperimentErrors {
    ControlNotFound = "Control is not found. Fallback if no variant found is not possible. Include one Variant with variantName = control",
    ChildrenNotFound = "No children found",
    ChildrenDoesNotMatchVariant = "Experiment immediate children must be of type variant"
}