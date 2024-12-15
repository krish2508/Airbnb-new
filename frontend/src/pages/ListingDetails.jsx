import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess, fetchCookie } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./ListingDetails.css";

function ListingDetails() {
  const { id } = useParams();
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
          setListing(jsonResponse.data);
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
        const token = await fetchCookie("token");
        const decode = jwtDecode(token);
        setRole(decode.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchListingDetails();
    fetchUserRole();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!listing) {
    return <div className="not-found">Listing not found!</div>;
  }

  const del = async (id) => {
    try {
      const delUrl = `http://localhost:3000/listings/${id}`;
      let response = await fetch(delUrl, {
        method: "DELETE",
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleEdit = (listing) => {
    navigate(`/edit/${listing._id}`, { state: { data: listing } });
  };

  return (
    <div className="listing-details-container">
      <div className="listing-details">
        <h1 className="listing-title">{listing.title}</h1>
        <img
          className="listing-image"
          src={listing.image}
          alt={listing.title}
        />
        <p className="listing-description">{listing.description}</p>
        <p className="listing-price">Price: ${listing.price}</p>
        <p className="listing-location">
          Location: {listing.location}, {listing.country}
        </p>
      </div>
      {role === "owner" && (
        <>
          <button className="delete-button" onClick={() => del(listing._id)}>
            Delete
          </button>
          <button className="edit-button" onClick={() => handleEdit(listing)}>
            Edit
          </button>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default ListingDetails;
