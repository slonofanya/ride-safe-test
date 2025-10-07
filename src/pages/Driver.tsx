import React, { useState, useEffect } from "react";
import { Card, Button, Space, Empty, DotLoading } from "antd-mobile";
import { useFeatureFlags } from "../contexts/useFeatureFlags";
import { RideCard } from "../components/RideCard";
import { Ride } from "../types";
import { mockApi } from "../../api-mock";
import "./Driver.css";

export const Driver: React.FC = () => {
  const { isEnabled } = useFeatureFlags();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await mockApi.getRides("driver");
        setRides(response.rides);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch rides");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const showMap = isEnabled("driverRouteMapPreview");

  if (loading) {
    return (
      <div className="driver-container">
        <Card>
          <div className="loading-container">
            <DotLoading data-testid="loading-spinner" />
            <div className="loading-text">Loading driver rides...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="driver-container">
        <Card>
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <div className="error-text">Error: {error}</div>
            <Button
              color="primary"
              onClick={() => window.location.reload()}
              style={{ marginTop: "16px" }}
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="driver-container">
      <Card className="driver-header">
        <div className="header-content">
          <h2>Driver Rides</h2>
          <div className="map-status">
            Map Preview: {showMap ? "Enabled" : "Disabled"}
          </div>
        </div>
      </Card>

      {rides.length === 0 ? (
        <Card>
          <Empty
            image={<div className="empty-icon">🚙</div>}
            description="No driver rides available"
          />
        </Card>
      ) : (
        <div className="rides-list">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} showMap={showMap} />
          ))}
        </div>
      )}

      <Space direction="vertical" style={{ width: "100%", marginTop: "16px" }}>
        <Button color="primary" block onClick={() => window.history.back()}>
          Back to Settings
        </Button>
      </Space>
    </div>
  );
};
