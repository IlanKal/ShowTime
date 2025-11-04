import React, { useState } from "react";
import './Form.css';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <h2 className="feature-title">
        Want us to add more features to the site?<br/>
        Feature requests go here ⬇️ (we collect them like Pokémon)
      </h2>

      <div className="feature-request">
        <form className="feature-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              id="name" 
              type="text" 
              placeholder="Enter your name" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="example@email.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="What would you like to see on the site?"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Send (we promise to totally ignore it 😅)
          </button>
        </form>
      </div>

      <blockquote className="quote">
        “I am the one who knocks.”
        <span className="source">— Breaking Bad</span>
      </blockquote>
    </div>
  );
};

export default Form;
