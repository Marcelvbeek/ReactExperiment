import { ExperimentErrors } from '../config/ExperimentErrors';
import { AnalyticsProvider } from '../providers';
import { ExperimentProvider } from '../providers';
import React, { ReactNode, useEffect, useState } from 'react';
import { Variant } from './Variant';

interface ExperimentProps {
    children: ReactNode,
    experimentFlag: string,
    variantOverride?: string;
    experimentProvider?: ExperimentProvider,
    analyticsProvider?: AnalyticsProvider,
}

interface Variants {
    [key: string]: React.ReactElement<any>;
}

const isElementTypeVariant = (child: React.ReactElement<any>): boolean => {
    return child.type === Variant;
}

const checkControlIsSet = (children: ReactNode) => {
    let controlFound = false;
    React.Children.forEach(children, (child: ReactNode) => {
        if (React.isValidElement(child) && child.props.variantName === 'control') {
            controlFound = true;
        }
    });

    if (!controlFound) {
        throw ExperimentErrors.ControlNotFound;
    }
}

const checkExperimentHasChildren = (children: ReactNode) => {
    if (React.Children.count(children) === 0) {
        throw ExperimentErrors.ChildrenNotFound;
    }
}

const filterVariants = (children: ReactNode): Variants => {
    const variants: Variants = {};

    checkExperimentHasChildren(children);

    checkControlIsSet(children);

    React.Children.forEach(children, (child: ReactNode) => {
        if (!React.isValidElement(child) || !isElementTypeVariant(child)) {
            throw ExperimentErrors.ChildrenDoesNotMatchVariant;
        }

        const variantName = child.props.variantName;

        // @ts-ignore
        variants[variantName] = child;
    });

    return variants;
};

export const Experiment = ({
    children,
    experimentFlag,
    variantOverride,
    experimentProvider,
    analyticsProvider,
}: ExperimentProps) => {
    const [experiment, setExperiment] = useState<undefined | string>();
    const variants = filterVariants(children);
    const activeVariantKey = variantOverride ?? experiment ?? 'control';

    useEffect(() => {
        const experimentValue = experimentProvider?.getVariant(experimentFlag);
        if (experimentValue) {
            setExperiment(experimentValue);
            analyticsProvider?.trackVariant(experimentFlag, experimentValue);
        }
    }, []);

    if (activeVariantKey in variants) {
        return variants[activeVariantKey];
    }
    return variants['control'];
};