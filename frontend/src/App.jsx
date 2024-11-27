  import { Routes, Route,Navigate  } from 'react-router-dom';
  import './App.css'
  import Signup from './pages/Signup';
  import Login from './pages/Login';
  import Home from './pages/Home';
  import Add from './pages/Add';
  import Edit from './pages/Edit';
  import ListingDetails from "./pages/ListingDetails";
  import ProtectedRoute from './ProtectedRoute';
  function App() {
    return (
      <div className="App">
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/addItem" element={<ProtectedRoute element={Add} allowedRole="owner"/>}/>
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    )
  }

  export default App;
