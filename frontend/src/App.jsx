  import { Routes, Route } from 'react-router-dom';
  import './App.css'
  import Signup from './pages/Signup';
  import Login from './pages/Login';
  import Home from './pages/Home';
  import Add from './pages/Add';
  import ListingDetails from "./pages/ListingDetails";
  import ProtectedRoute from './ProtectedRoute';
  function App() {
    return (
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/addItem" element={<ProtectedRoute element={Add} allowedRole="owner"/>}/>
          <Route path="/listing/:id" element={<ListingDetails />} />
        </Routes>
      </div>
    )
  }

  export default App;
