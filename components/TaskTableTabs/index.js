import { Tabs, Tab, Typography } from "@material-ui/core";
import { StyledCard } from "./styles";

export default function TableTabs({
  tabs,
  selectedTab,
  onSelectTab
}) {
  function handleChange(event, newValue) {
    onSelectTab(newValue);
  }

  return (
    <StyledCard>
      <Tabs
        value={selectedTab}
        variant="scrollable"
        indicatorColor="primary"
        scrollButtons="on"
        onChange={handleChange}
        style={{ alignItems: 'center' }}
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
            style={{ flexGrow: 1, maxWidth: '50%' }}
          />
        ))}
      </Tabs>
    </StyledCard>
  );
}
