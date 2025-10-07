import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd-mobile";
import { FeatureFlagProvider } from "./contexts/FeatureFlagContext";
import { Settings } from "./pages/Settings";
import { Passenger } from "./pages/Passenger";
import { Driver } from "./pages/Driver";
import "./App.css";

function App() {
  return (
    <ConfigProvider>
      <FeatureFlagProvider>
        <Router basename="/ride_safe">
          <div className="app">
            <Routes>
              <Route path="/" element={<Navigate to="/settings" replace />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/passenger" element={<Passenger />} />
              <Route path="/driver" element={<Driver />} />
            </Routes>
          </div>
        </Router>
      </FeatureFlagProvider>
    </ConfigProvider>
  );
}

export default App;
