import { Card, Typography, Tabs, Tab } from "@material-ui/core";

export default function TaskTableTabs({
  tasks,
  selectedTab,
  setSelectedTab,
  setSelectedDataset,
}) {
  function handleChange(event, newValue) {
    setSelectedTab(newValue);
    setSelectedDataset(0);
  }

  return (
    <>
      <Card>
        <Tabs
          value={selectedTab}
          variant="scrollable"
          scrollButtons="on"
          onChange={handleChange}
        >
          {tasks.map((task) => (
            <Tab
              label={task.task_name}
              wrapped
              key={task.task_id}
              style={{ flexGrow: 1 }}
            />
          ))}
        </Tabs>
      </Card>
    </>
  );
}
