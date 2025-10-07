import React from "react";
import { Card } from "antd-mobile";
import { Coordinates } from "../types";
import "./MapPlaceholder.css";

interface MapPlaceholderProps {
  coordinates: Coordinates;
  className?: string;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  coordinates,
  className = "",
}) => {
  return (
    <Card className={`map-placeholder ${className}`}>
      <div className="map-content">
        <div className="map-icon">🗺️</div>
        <div className="map-coordinates">
          <div className="coordinate-item">
            <span className="coordinate-label">Lat:</span>
            <span className="coordinate-value">
              {coordinates.lat.toFixed(4)}
            </span>
          </div>
          <div className="coordinate-item">
            <span className="coordinate-label">Lng:</span>
            <span className="coordinate-value">
              {coordinates.lng.toFixed(4)}
            </span>
          </div>
        </div>
        <div className="map-note">Map placeholder - Uklon style</div>
      </div>
    </Card>
  );
};
