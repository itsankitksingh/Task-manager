import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

const generateId = () => {
  return Date.now().toString();
};

const initialState = {
  tasks: loadTasksFromStorage(),
  filter: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: generateId(),
        title: action.payload.title,
        description: action.payload.description || '',
        status: 'active',
        priority: action.payload.priority || 'medium',
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTaskStatus: (state, action) => {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload);
      if (taskIndex !== -1) {
        const newStatus = state.tasks[taskIndex].status === 'active' ? 'completed' : 'active';
        state.tasks[taskIndex].status = newStatus;
        state.tasks[taskIndex].completedAt = newStatus === 'completed' ? new Date().toISOString() : null;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, removed);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  reorderTasks,
  setFilter,
  setSortBy,
  setSortOrder,
} = tasksSlice.actions;

export const selectAllTasks = state => state.tasks.tasks;

export const selectFilteredAndSortedTasks = state => {
  const { tasks, filter, sortBy, sortOrder } = state.tasks;
  
  let filteredTasks = [...tasks];
  if (filter !== 'all') {
    filteredTasks = tasks.filter(task => task.status === filter);
  }
  
  filteredTasks.sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      comparison = new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'priority') {
      const priorityValues = { low: 1, medium: 2, high: 3 };
      comparison = priorityValues[a.priority] - priorityValues[b.priority];
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return filteredTasks;
};

export default tasksSlice.reducer;