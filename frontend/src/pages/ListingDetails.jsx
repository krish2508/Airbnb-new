import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess} from '../utils';
import { Link, useNavigate } from "react-router-dom";

function ListingDetails() {
  const { id } = useParams(); // Extract the ID from the URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/listings/${id}`);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
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

    fetchListingDetails();
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
      <button onClick={()=>{del(listing._id)}}>delete</button>
      <ToastContainer />
    </div>
  );
}

export default ListingDetails;
