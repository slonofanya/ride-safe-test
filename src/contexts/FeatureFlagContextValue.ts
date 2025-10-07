import { createContext } from "react";
import { FeatureFlagAPI } from "../types";

interface FeatureFlagContextType extends FeatureFlagAPI {
  loading: boolean;
  error: string | null;
}

export const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(
  undefined,
);

export type { FeatureFlagContextType };
