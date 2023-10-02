import React, {useState} from 'react';

function LoginForm() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState({
    email: '', 
    password: '',
    serverError: '',
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    // console.log('Input Change:', name, value);
    setFormData({
      ...formData, 
      [name]: value,
    });
  }

  const handleSubmit = async(e) => {
    // stops page from reloading after submitting 
    e.preventDefault();

    if(!formData.email) {
      setFormErrors({...formErrors, email: 'Email is required..'});
    }

    if(!formData.password) {
      setFormErrors({...formErrors, password: 'Password is required..'});
    }

    if(formErrors.email || formErrors.password) {
      return;
    }

    const backendUrl = 'http://localhost:8080';
    
    try {
      // console.log('Request Payload:', JSON.stringify(formData));
      const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // have to stringigy when sending data from client to server 
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        const data = await response.json();
        if(data && data.error) {
          setFormErrors({...formErrors, serverError: data.error});
        }
      }
    } catch (err) {
      console.error('AJAX request failed: ', err)
    }
  }

  return (
    <div>
      <form>  
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
          <button type='submit' onClick={handleSubmit}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;