import { Tabs, Tab } from "@material-ui/core";
import { StyledCard } from "./styles";

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
    <StyledCard>
      <Tabs
        value={selectedTask}
        variant="scrollable"
        indicatorColor="primary"
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
    </StyledCard>
  );
}
