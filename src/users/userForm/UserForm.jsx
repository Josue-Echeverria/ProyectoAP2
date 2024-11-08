import React, { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    id: "",
    email: "",
    workArea: "",
    initialBalance: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.id) newErrors.id = "ID is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.workArea) newErrors.workArea = "Work area is required.";
    if (!formData.initialBalance || isNaN(formData.initialBalance))
      newErrors.initialBalance = "A valid initial balance is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="user-form">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </label>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
          {errors.id && <span className="error">{errors.id}</span>}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Work Area:
          <input
            type="text"
            name="workArea"
            value={formData.workArea}
            onChange={handleChange}
          />
          {errors.workArea && <span className="error">{errors.workArea}</span>}
        </label>
        <label>
          Initial Digital Wallet Balance:
          <input
            type="number"
            name="initialBalance"
            value={formData.initialBalance}
            onChange={handleChange}
          />
          {errors.initialBalance && (
            <span className="error">{errors.initialBalance}</span>
          )}
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserForm;
