/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// @mui components
import Box from "../MUI/Box";
import Tab from "../MUI/Tab";
import Tabs from "../MUI/Tabs";
import Typography from "../MUI/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabView = (props) => {
  const { content, tabs, onChange } = props;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((item, i) => (
            <Tab key={item} label={item} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {content.map((item, i) => (
        <TabPanel key={`tc${i}`} value={value} index={i}>
          {item}
        </TabPanel>
      ))}
    </Box>
  );
};

TabView.defaultProps = {
  onChange: undefined,
};

TabView.propTypes = {
  content: PropTypes.arrayOf(PropTypes.node).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
};

export default TabView;
