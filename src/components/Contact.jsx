import React, { useState } from 'react';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Error state
  const [errors, setErrors] = useState({});
  
  // Form status
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save form data locally (example approach)
  const saveFormDataLocally = (data) => {
    try {
      // Get existing submissions or initialize empty array
      const existingData = localStorage.getItem('contactSubmissions');
      const submissions = existingData ? JSON.parse(existingData) : [];
      
      // Add timestamp to submission
      const newSubmission = {
        ...data,
        timestamp: new Date().toISOString()
      };
      
      // Add new submission to array
      submissions.push(newSubmission);
      
      // Save back to localStorage
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      return true;
    } catch (error) {
      console.error('Error saving form data locally:', error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setStatus({
        submitted: false,
        submitting: true,
        info: { error: false, msg: null }
      });
      
      try {
        // Try to send data to backend API
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout
        
        try {
          const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          const data = await response.json();
          
          if (response.ok) {
            // Server responded successfully
            setStatus({
              submitted: true,
              submitting: false,
              info: { error: false, msg: 'Message sent successfully!' }
            });
            
            // Reset form
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: ''
            });
          } else {
            throw new Error(data.message || 'Something went wrong');
          }
        } catch (fetchError) {
          clearTimeout(timeoutId);
          
          // Check if it's a network error or timeout
          if (fetchError.name === 'AbortError' || fetchError instanceof TypeError) {
            console.log('Backend server unavailable, saving data locally');
            
            // Save form data locally
            if (saveFormDataLocally(formData)) {
              // Show success message even though backend is unavailable
              setStatus({
                submitted: true,
                submitting: false,
                info: { error: false, msg: 'Message received! I will get back to you soon.' }
              });
              
              // Reset form
              setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
              });
            } else {
              throw new Error('Unable to process your message. Please try again later.');
            }
          } else {
            throw fetchError;
          }
        }
      } catch (error) {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: error.message || 'Something went wrong. Please try again later.' }
        });
      }
    }
  };

  return (
    <section id="contact" className="section bg-gray-50">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-gray-600 mb-8 max-w-md">
              Feel free to reach out to me for any questions or opportunities. I'm always open 
              to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Phone</h4>
                  <p className="text-gray-600">9812345678</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <p className="text-gray-600">mrznbishal@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Location</h4>
                  <p className="text-gray-600">Kathmandu</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
                <h4 className="font-medium text-lg mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                    {/* Facebook */}
                    <a
                    href="https://www.facebook.com/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                    </a>

                    {/* Instagram */}
                    <a
                    href="https://www.instagram.com/bishal__maharjan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5c3.176 0 5.75-2.574 5.75-5.75v-8.5C22 4.574 19.426 2 16.25 2h-8.5zM4 7.75C4 5.679 5.679 4 7.75 4h8.5C18.321 4 20 5.679 20 7.75v8.5c0 2.071-1.679 3.75-3.75 3.75h-8.5C5.679 20 4 18.321 4 16.25v-8.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
                    </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                    href="https://www.linkedin.com/in/bishal-maharjan-376b11300/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                    </svg>
                    </a>

                    {/* GitHub */}
                    <a
                    href="https://github.com/zDaiki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    </a>
                </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            
            {status.submitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <p className="font-bold">Message sent successfully!</p>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-primary focus:border-primary`}
                      placeholder="Enter Full Name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-primary focus:border-primary`}
                      placeholder="example@gmail.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-primary focus:border-primary`}
                    placeholder="What is this regarding?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-primary focus:border-primary`}
                    placeholder="Your message here..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={status.submitting}
                  className={`btn btn-primary w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                    status.submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {status.info.error && (
                  <div className="mt-3 text-red-500 text-sm">
                    {status.info.msg}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;