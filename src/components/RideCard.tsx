import React from "react";
import { Card, Space, Tag } from "antd-mobile";
import { Ride } from "../types";
import { MapPlaceholder } from "./MapPlaceholder";
import "./RideCard.css";

interface RideCardProps {
  ride: Ride;
  showMap?: boolean;
}

export const RideCard: React.FC<RideCardProps> = ({
  ride,
  showMap = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  const getRoleColor = (role: "passenger" | "driver") => {
    return role === "passenger" ? "primary" : "success";
  };

  return (
    <div role="article">
      <Card className="ride-card" data-testid="ride-card">
        <div className="ride-header">
          <Space align="center" justify="between" style={{ width: "100%" }}>
            <div className="ride-route">
              <div className="route-points">
                <span className="from-point">{ride.from}</span>
                <span className="arrow">→</span>
                <span className="to-point">{ride.to}</span>
              </div>
              <div className="ride-time">{formatDate(ride.when)}</div>
            </div>
            <Tag color={getRoleColor(ride.role)}>
              {ride.role === "passenger" ? "Passenger" : "Driver"}
            </Tag>
          </Space>
        </div>

        {showMap ? (
          <MapPlaceholder coordinates={ride.coords} />
        ) : (
          <div className="map-disabled">
            <div className="disabled-icon">🚫</div>
            <div className="disabled-text">Map disabled</div>
          </div>
        )}
      </Card>
    </div>
  );
};
