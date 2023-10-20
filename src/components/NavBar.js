import React from 'react';
import axios from 'axios';

function NavBar({userId, updateTasks, isLoggedIn, updateIsLoggedIn}) {

  async function handleLogOut() {

    try {
      localStorage.removeItem('userId');

      await axios.post('http://localhost:8080/logout');

      updateIsLoggedIn(null);

      updateTasks([]);
    

    } catch (err) {
      console.error('Logout failed:', err)
    }
  };

  return (
    <div>
      {!isLoggedIn && (
        <div>
          <h2>
            <a href='/register'>Register</a>
          </h2>
          <h2>
            <a href='/login'>Log In</a>
          </h2>
        </div>
      )}
      {isLoggedIn && (
        <div>
            <button type='submit' onClick={handleLogOut}> Log Out </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;