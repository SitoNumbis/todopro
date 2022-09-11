import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// @mui components
import { ThemeProvider, CssBaseline } from "@mui/material";

// theme
import dark from "./assets/theme/dark";
import light from "./assets/theme/light";

// own components
import Notification from "./components/Notification/Notification";

// views
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Forgot from "./views/Forgot/Forgot";

const App = () => {
  const [mode, setMode] = useState(false);

  const toggleMode = () => setMode(!mode);

  return (
    <ThemeProvider theme={mode ? light : dark}>
      <Notification />
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home toggleMode={toggleMode} mode={mode} />}
          />
          <Route
            exact
            path="/login"
            element={<Login toggleMode={toggleMode} mode={mode} />}
          />
          <Route
            exact
            path="/forgot"
            element={<Forgot toggleMode={toggleMode} mode={mode} />}
          />
        </Routes>
      </BrowserRouter>
      {/*<Notification
        visible={showNotification}
        type={notificationType}
        text={notificationText}
        onClose={handleNotificationClose}
      />*/}
    </ThemeProvider>
  );
};

export default App;
