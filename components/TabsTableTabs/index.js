import { Card, Typography, Tabs, Tab } from "@material-ui/core";

export default function TaskTableTabs({ tasks, selectedTab, setSelectedTab }) {
  function handleChange(event, newValue) {
    setSelectedTab(newValue);
  }

  return (
    <>
      <Typography variant="h2">Tasks</Typography>

      <Card>
        <Tabs
          value={selectedTab}
          variant="scrollable"
          scrollButtons="on"
          onChange={handleChange}
        >
          {tasks.map((task) => (
            <Tab label={task.task_name} wrapped key={task.task_id} />
          ))}
        </Tabs>
      </Card>
    </>
  );
}
