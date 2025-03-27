import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DragDropContext } from '@hello-pangea/dnd';
import { reorderTasks } from './redux/tasksSlice';
import './App.css';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    dispatch(reorderTasks({
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Task Manager
          </Typography>
          
          <TaskForm />
          
          <Box sx={{ mt: 3 }}>
            <TaskFilters setDarkMode={setDarkMode} darkMode={darkMode} />
          </Box>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <TaskList />
          </DragDropContext>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
