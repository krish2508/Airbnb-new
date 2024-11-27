import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess,fetchCookie } from "../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Home.css';
import { jwtDecode } from "jwt-decode";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [list, setlist] = useState("");
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  const handleLogout = async(e) => {
    const response = await fetch("http://localhost:3000/logout",{
      credentials: 'include',
    });
    console.log(await response.json().message);
    handleSuccess("Success Logout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const fetchListing = async () => {
    try {
      const response = await fetch("http://localhost:3000/allListings"); // Update the URL if deployed
      const data = await response.json();
      setlist(data);
      //console.log(await fetchCookie('token'));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  const addItem=async ()=>{
    navigate('/addItem');
  };
  useEffect(() => {
    const initializeData = async () => {
      try {
        const tokenn=await fetchCookie("token");
        const decoded=jwtDecode(tokenn);
        console.log(decoded);
        setLoggedInUser(decoded.name);
        setRole(decoded.role);
        await fetchListing();
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    initializeData();
  }, []);
  return (
    <div className="Home">
  <div>Hello {loggedInUser}</div>
  <button onClick={addItem}>add new listing</button>
  <button onClick={handleLogout}>Logout</button>
  <div className="grid-container">
    {list &&
      list?.map((item, index) => {
        return (
          <div key={index} className="grid-item">
            <a href={`/listing/${item._id}`}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "auto" }}
              />
              <p>Price: ${item.price}</p>
              <p>
                Location: {item.location}, {item.country}
              </p>
            </a>
          </div>
        );
      })}
  </div>
  <ToastContainer />
</div>

  );
}

export default Home;
