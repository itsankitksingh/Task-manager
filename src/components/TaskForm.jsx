import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    dispatch(addTask({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
    }));

    setFormData({
      title: '',
      description: '',
      priority: 'medium',
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={2}
          variant="outlined"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            label="Priority"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskForm;