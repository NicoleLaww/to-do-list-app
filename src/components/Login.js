import React, {useState} from 'react';

function LoginForm() {


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState({
    email: '', 
    password: '',
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData, 
      [name]: value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!formData.email) {
      setFormErrors({...formErrors, email: 'Email is required..'})
    }
    if(!formData.password) {
      setFormErrors({...formErrors, password: 'Password is required..'})
    }

    if(formErrors.email || formErrors.password) {
      return;
    }

    try {
      const response = await fetch('/login', {
        method: 'POST',
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