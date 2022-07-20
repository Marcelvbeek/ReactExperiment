import { ReactNode } from "react";

interface VariantProps {
    variantName: string;
    children: ReactNode;
}

export const Variant = ({ children }: VariantProps) => {
    return <>{children}</>
};