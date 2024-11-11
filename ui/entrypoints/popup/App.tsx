import './App.css';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Snippets from '../routes/Snippets';
import Landing from '../routes/Landing';
import CreateAndEdit from '../routes/CreateAndEdit';

function App() {

  return (
    <div className='container'>
      <h1 className='title'>Parallel-U</h1>
      <Box className='main-content'>
        <Router>
          <Routes>
            <Route path='/login' element={<Landing/>}/>
            <Route path='/' element={<Snippets/>}/>
            <Route path='/edit' element={<CreateAndEdit/>}/>
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
