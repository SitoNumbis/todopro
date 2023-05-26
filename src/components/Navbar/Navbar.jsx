import React, { useMemo } from "react";

// @mui/icons-material
import { Notifications, AccountCircle, Menu } from "@mui/icons-material";

// @mui/components
import Badge from "../MUI/Badge";
import Tooltip from "../MUI/Tooltip";
import IconButton from "../MUI/IconButton";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

// styles
import styles from "./styles.module.css";

function Navbar({ showSidebar, toggleSidebar, widthViewport }) {
  const { languageState } = useLanguage();

  const { appName, tooltips, ariaLabels } = useMemo(() => {
    return {
      appName: languageState.texts.appName,
      ariaLabels: languageState.texts.ariaLabels,
      tooltips: languageState.texts.tooltips,
    };
  }, [languageState]);

  return (
    <div
      className={`${styles.navbar} ${
        widthViewport < 600 || !showSidebar ? styles.full : ""
      }`}
    >
      <h1>
        <IconButton
          onClick={toggleSidebar}
          color="primary"
          className={styles.menuButton}
        >
          <Menu />
        </IconButton>
        {appName}
      </h1>
      <div>
        <Tooltip title={tooltips.noNotifications}>
          <IconButton color="primary" aria-label={ariaLabels.notifications}>
            <Badge>
              <Notifications />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title={tooltips.noAccounts} aria-label={ariaLabels.account}>
          <IconButton color="primary">
            <AccountCircle />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Navbar;
