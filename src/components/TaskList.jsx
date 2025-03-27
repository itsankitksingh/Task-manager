import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask, updateTask } from '../redux/tasksSlice';
import { selectFilteredAndSortedTasks } from '../redux/tasksSlice';
import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredAndSortedTasks);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  const handleToggleStatus = (id) => {
    dispatch(toggleTaskStatus(id));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setEditFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditSubmit = () => {
    if (!editFormData.title.trim()) return;

    dispatch(updateTask({
      id: currentTask.id,
      title: editFormData.title,
      description: editFormData.description,
      priority: editFormData.priority,
    }));

    setEditDialogOpen(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (tasks.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="subtitle1" color="textSecondary">
          No tasks found. Add a new task to get started!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ width: '100%' }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    divider
                    sx={{
                      bgcolor: task.status === 'completed' ? 'rgba(0, 0, 0, 0.05)' : 'inherit',
                      textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                      opacity: task.status === 'completed' ? 0.7 : 1,
                    }}
                  >
                    <ListItemIcon {...provided.dragHandleProps}>
                      <DragIndicatorIcon />
                    </ListItemIcon>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.status === 'completed'}
                        onChange={() => handleToggleStatus(task.id)}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" component="div">
                          {task.title}
                          <Chip
                            label={task.priority}
                            size="small"
                            color={getPriorityColor(task.priority)}
                            sx={{ ml: 1, textTransform: 'capitalize' }}
                          />
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span" display="block">
                            {task.description}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Created: {formatDate(task.createdAt)}
                            {task.completedAt && ` • Completed: ${formatDate(task.completedAt)}`}
                          </Typography>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleEditClick(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Task Title"
              name="title"
              value={editFormData.title}
              onChange={handleEditChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
              multiline
              rows={3}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="edit-priority-label">Priority</InputLabel>
              <Select
                labelId="edit-priority-label"
                name="priority"
                value={editFormData.priority}
                onChange={handleEditChange}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TaskList;