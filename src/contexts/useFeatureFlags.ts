import { useContext } from "react";
import { FeatureFlagContext, FeatureFlagContextType } from "./FeatureFlagContextValue";

export const useFeatureFlags = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  if (context === undefined) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagProvider",
    );
  }
  return context;
};
