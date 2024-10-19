import { Route, Routes } from 'react-router';
import './App.css';
import Login from './pages/Login';
import Users from './pages/Users';
import Edit from './pages/Edit';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/Edit' element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
