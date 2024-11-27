import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructuring the passed listing data from the state
  const listing = location.state?.data;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    location: '',
    country: '',
  });
  // Initialize the form with the passed data when the component mounts
  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || '',
        description: listing.description || '',
        image: listing.image || '',
        price: listing.price || '',
        location: listing.location || '',
        country: listing.country || '',
      });
    }
  }, [listing]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    })); 
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    console.log(updatedData);
    try {
      const response = await fetch(`http://localhost:3000/listings/${listing._id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      if (result.status) {
        // Redirect to the listing page or another relevant page after success
        navigate(`/listing/${listing._id}`);
      } else {
        alert('Failed to update listing.');
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Form JSX
  return (
    <div>
      <h1>Edit Listing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Listing</button>
      </form>
    </div>
  );
};
export default EditComponent;