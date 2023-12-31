import React, { useState } from 'react';

function RegistrationForm() {

  // State to manage form input fields (name, email, password)
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });


    // State to manage form errors
  const [formErrors, setFormErrors] = useState({
      name: '',
      email: '',
      password: '',
      serverError: '',
    });


const handleInputChange = (e) => {
  const {name, value } = e.target;
  // console.log('Input change:', name, value)

  // Update the formData state
  setFormData({
    ...formData, 
    [name]: value, 
  })

  // clears form errors when user types in field again, don't have to submit 
  setFormErrors({
    ...formErrors, 
    [name]: '',
  })
}

const handleSubmit = async (e) => {
  e.preventDefault();

  // clears any existing form errors
  setFormErrors({
    name: '',
    email: '', 
    password: '',
  });

  if(!formData.name) {
    setFormErrors({...formErrors, name: 'Name is required..' });
  }

  if(!formData.email) {
    setFormErrors({...formErrors, email: 'Email is required..' });
  }

  if(!formData.password) {
    setFormErrors({...formErrors, password: 'Password is required..'})
  }

  if (formErrors.name !== '' || formErrors.email !== '' || formErrors.password !== ''){
    return;
  }

  // console.log('Request Payload:', JSON.stringify(formData));

  const backendUrl = 'http://localhost:8080';
  try {
    const response = await fetch(`${backendUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(formData),
    }); 
    
    if (response.ok) {
      // redirect to new URL 
      window.location.href = '/login';
    } else {
      const data = await response.json();
      // this ensure there is something in data, can't be null or undefined 
      if(data && data.error) {
        setFormErrors({...formErrors, serverError: data.error});
      }
    }
  } catch (err) {
    console.error('AJAX request failed: ', err);
  }
};

    // Render the registration form JSX with input fields 
  return (
    <div>
      <form>
        <div>
          <label>Name: </label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input 
            type='text'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            />
        </div>
        <div>
          <label>Password: </label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            />
        </div>
        <div>
          <button type='submit' onClick={handleSubmit}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;

