import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess,fetchCookie} from '../utils';
import { Link, useNavigate } from "react-router-dom";

function ListingDetails() {
  const { id } = useParams(); // Extract the ID from the URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(""); 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/listings/${id}`);
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setListing(jsonResponse.data); // Access data inside 'data' key
        } else {
          console.error("Error fetching listing:", jsonResponse.message);
        }
      } catch (error) {
        console.error("Error fetching listing details:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchUserRole = async () => {
      try {
        const userRole = await fetchCookie("role"); // Fetch the user's role from cookies
        setRole(userRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchListingDetails();
    fetchUserRole();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>Listing not found!</div>;
  }
  const del=async (id)=>{
    try {
      const delUrl=`http://localhost:3000/listings/${id}`;
    let response=await fetch(delUrl,{
      method:"DELETE"
    })
    const result= await response.json();
    const{success,message}=result;
    if(success){
      handleSuccess(message);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }
    else if(!success){
      handleError(message);
    }
    } catch (error) {
      handleError(error);
    }
  }
  const handleEdit=(listing)=>{
    navigate(`/edit/${listing._id}`,{state:{data:listing}});
  }
  return (
    <div>
        <div>
      <h1>{listing.title}</h1>
      <img
        src={listing.image}
        alt={listing.title}
        style={{ width: "100%", height: "auto" }}
      />
      <p>{listing.description}</p>
      <p>Price: ${listing.price}</p>
      <p>
        Location: {listing.location}, {listing.country}
      </p>
      </div>
      {role=="owner" &&
      <button onClick={()=>{del(listing._id)}}>delete</button>
      }&nbsp;
      {role=="owner" &&
      <button onClick={()=>{handleEdit(listing)}}>edit</button>
      
      }
      <ToastContainer />
    </div>
  );
}

export default ListingDetails;
