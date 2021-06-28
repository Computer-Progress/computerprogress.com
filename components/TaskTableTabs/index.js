import { Card, Typography, Tabs, Tab } from "@material-ui/core";

export default function TaskTableTabs({
  tasks,
  selectedTask,
  setSelectedTask,
  setSelectedDataset,
}) {
  function handleChange(event, newValue) {
    setSelectedTask(newValue);
    setSelectedDataset(0);
  }

  return (
    <>
      <Card>
        <Tabs
          value={selectedTask}
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
