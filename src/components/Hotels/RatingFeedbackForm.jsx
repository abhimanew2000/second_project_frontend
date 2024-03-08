// RatingFeedbackForm.jsx

import React, { useState } from 'react';
import axios from '../../Utils/axios';
export const RatingFeedbackForm = ({ hotelId, onRatingAdded, history }) => {
  const [ratings, setRatings] = useState(0);
  const [description, setDescription] = useState('');

  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post(
        `/api/add-rating-feedback/${hotelId}/`,
        { ratings, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('usertoken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        // Optionally, you can update the UI or trigger a refetch of hotel data
        onRatingAdded();
        // Navigate back to the previous page after submitting the rating
        history.goBack();
      } else {
        console.error('Error adding rating and feedback:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding rating and feedback:', error);
    }
  };

  return (
    <div>
      <h2>Add Rating and Feedback</h2>
      <label>
        Ratings:
        <input type="number" value={ratings} onChange={(e) => setRatings(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <button onClick={handleRatingSubmit}>Submit</button>
    </div>
  );
};

