import React, { useState, useEffect } from 'react';
import './style.css';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: ''
  });

  const [errors, setErrors] = useState({});
  const [showGuestName, setShowGuestName] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setShowGuestName(formData.attendingWithGuest === 'Yes');
  }, [formData.attendingWithGuest]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid.";
    if (!formData.age) tempErrors.age = "Age is required.";
    else if (isNaN(formData.age) || formData.age <= 0) tempErrors.age = "Age must be a number greater than 0.";
    if (showGuestName && !formData.guestName) tempErrors.guestName = "Guest Name is required if attending with a guest.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container">
      {submitted ? (
        <div className="summary">
          <h2>Registration Summary</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Attending with Guest:</strong> {formData.attendingWithGuest}</p>
          {showGuestName && <p><strong>Guest Name:</strong> {formData.guestName}</p>}
        </div>
      ) : (
        <>
          <h1>Event Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} />
              {errors.age && <p className="error">{errors.age}</p>}
            </div>
            <div className="form-group">
              <label>Are you attending with a guest?</label>
              <select name="attendingWithGuest" value={formData.attendingWithGuest} onChange={handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            {showGuestName && (
              <div className="form-group">
                <label>Guest Name:</label>
                <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
                {errors.guestName && <p className="error">{errors.guestName}</p>}
              </div>
            )}
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EventRegistrationForm;
