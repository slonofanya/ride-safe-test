import React, { useState, useEffect } from "react";
import { Card, Button, Space, Empty, DotLoading } from "antd-mobile";
import { useFeatureFlags } from "../contexts/useFeatureFlags";
import { RideCard } from "../components/RideCard";
import { Ride } from "../types";
import { mockApi } from "../../api-mock";
import "./Passenger.css";

export const Passenger: React.FC = () => {
  const { isEnabled } = useFeatureFlags();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await mockApi.getRides("passenger");
        setRides(response.rides);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch rides");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const showMap = isEnabled("passengerRouteMap");

  if (loading) {
    return (
      <div className="passenger-container">
        <Card>
          <div className="loading-container">
            <DotLoading data-testid="loading-spinner" />
            <div className="loading-text">Loading passenger rides...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="passenger-container">
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
    <div className="passenger-container">
      <Card className="passenger-header">
        <div className="header-content">
          <h2>Passenger Rides</h2>
          <div className="map-status">
            Map: {showMap ? "Enabled" : "Disabled"}
          </div>
        </div>
      </Card>

      {rides.length === 0 ? (
        <Card>
          <Empty
            image={<div className="empty-icon">🚗</div>}
            description="No passenger rides available"
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
