import { Tabs, Tab, Typography } from "@material-ui/core";
import { StyledCard } from "./styles";
import { useMediaQuery } from "@material-ui/core";
import { MuiTheme } from "../../styles/theme";

export default function TableTabs({ tabs, selectedTab, onSelectTab }) {
  function handleChange(event, newValue) {
    onSelectTab(newValue);
  }

  const isMobile = useMediaQuery(MuiTheme.breakpoints.down(500));

  return (
    <StyledCard>
      <Tabs
        value={selectedTab}
        variant="scrollable"
        indicatorColor="primary"
        scrollButtons="on"
        onChange={handleChange}
      >
        {tabs.map((tab) => (
          <Tab
            label={
              <Typography variant="subtitle2" color="primary">
                {tab.task_name}
              </Typography>
            }
            wrapped
            key={tab.task_id}
            style={{ flexGrow: 1, maxWidth: isMobile ? "300px" : "50%" }}
          />
        ))}
      </Tabs>
    </StyledCard>
  );
}
