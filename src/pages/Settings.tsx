import React from "react";
import { List, Switch, Card, Space, Button, Toast } from "antd-mobile";
import { useFeatureFlags } from "../contexts/useFeatureFlags";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

export const Settings: React.FC = () => {
  const { isEnabled, enable, disable, loading, error } = useFeatureFlags();
  const navigate = useNavigate();

  const handleToggle = (key: "passengerRouteMap" | "driverRouteMapPreview") => {
    const currentValue = isEnabled(key);
    if (currentValue) {
      disable(key);
      Toast.show(`${key} disabled`);
    } else {
      enable(key);
      Toast.show(`${key} enabled`);
    }
  };

  if (loading) {
    return (
      <div className="settings-container">
        <Card>
          <div className="loading">Loading settings...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="settings-container">
        <Card>
          <div className="error">Error: {error}</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <Card className="settings-card">
        <div className="settings-header">
          <h2>Feature Settings</h2>
          <p>Toggle features on/off for different user roles</p>
        </div>

        <List className="settings-list">
          <List.Item
            extra={
              <Switch
                data-testid="switch-passengerRouteMap"
                checked={isEnabled("passengerRouteMap")}
                onChange={() => handleToggle("passengerRouteMap")}
              />
            }
          >
            <div className="setting-item">
              <div className="setting-title">Passenger Route Map</div>
              <div className="setting-description">
                Show map for passenger rides
              </div>
            </div>
          </List.Item>

          <List.Item
            extra={
              <Switch
                data-testid="switch-driverRouteMapPreview"
                checked={isEnabled("driverRouteMapPreview")}
                onChange={() => handleToggle("driverRouteMapPreview")}
              />
            }
          >
            <div className="setting-item">
              <div className="setting-title">Driver Route Preview</div>
              <div className="setting-description">
                Show map preview for driver rides
              </div>
            </div>
          </List.Item>
        </List>

        <Space
          direction="vertical"
          style={{ width: "100%", marginTop: "24px" }}
        >
          <Button color="primary" block onClick={() => navigate("/passenger")}>
            View Passenger Page
          </Button>
          <Button color="success" block onClick={() => navigate("/driver")}>
            View Driver Page
          </Button>
        </Space>
      </Card>
    </div>
  );
};
