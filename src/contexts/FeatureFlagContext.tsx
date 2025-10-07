import React, {
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { FeatureFlags } from "../types";
import { mockApi } from "../../api-mock";
import { FeatureFlagContext, FeatureFlagContextType } from "./FeatureFlagContextValue";

interface FeatureFlagProviderProps {
  children: ReactNode;
  initialFlags?: FeatureFlags;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({
  children,
  initialFlags,
}) => {
  const [flags, setFlags] = useState<FeatureFlags>(
    initialFlags || {
      passengerRouteMap: false,
      driverRouteMapPreview: false,
    },
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialFlags) {
      setLoading(false);
      return;
    }

    const fetchFlags = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedFlags = await mockApi.getFeatureFlags();
        setFlags(fetchedFlags);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch feature flags",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFlags();
  }, [initialFlags]);

  const isEnabled = useCallback((
    key: "passengerRouteMap" | "driverRouteMapPreview",
  ): boolean => {
    return flags[key];
  }, [flags]);

  const enable = useCallback((key: string) => {
    setFlags((prev) => ({
      ...prev,
      [key]: true,
    }));
  }, []);

  const disable = useCallback((key: string) => {
    setFlags((prev) => ({
      ...prev,
      [key]: false,
    }));
  }, []);

  const value: FeatureFlagContextType = useMemo(
    () => ({
      isEnabled,
      enable,
      disable,
      loading,
      error,
    }),
    [isEnabled, enable, disable, loading, error],
  );

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

