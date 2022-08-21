import PropTypes from "prop-types";

// @emotion
import { css } from "@emotion/css";

// framer-motion
import { motion } from "framer-motion";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

// @mui icons
import InfoIcon from "@mui/icons-material/Info";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";

// @mui components
import { Tooltip } from "@mui/material";

// own components
import RadialButton from "../RadialButton/RadialButton";

const FabButtons = (props) => {
  const { onAdd, onSettings, onAbout } = props;
  const { languageState } = useLanguage();

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const ulItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={css({
        position: "fixed",
        bottom: "10px",
        right: "10px",
        display: "flex",
        flexDirection: "column",
        zIndex: 20,
      })}
    >
      <motion.div variants={ulItem} viewport={{ once: true }}>
        <Tooltip
          title={languageState.texts.Tooltips.AddNoteBox}
          placement="left"
        >
          <RadialButton onClick={onAdd} icon={<AddBoxIcon />} />
        </Tooltip>
      </motion.div>
      <motion.div variants={ulItem} viewport={{ once: true }}>
        <Tooltip title={languageState.texts.Tooltips.Settings} placement="left">
          <RadialButton onClick={onSettings} icon={<SettingsIcon />} />
        </Tooltip>
      </motion.div>
      <motion.div variants={ulItem} viewport={{ once: true }}>
        <Tooltip title={languageState.texts.Tooltips.About} placement="left">
          <RadialButton onClick={onAbout} icon={<InfoIcon />} />
        </Tooltip>
      </motion.div>
    </motion.div>
  );
};

FabButtons.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onAbout: PropTypes.func.isRequired,
};

export default FabButtons;
