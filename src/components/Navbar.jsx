import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem('Ma7ally-token'));

  const Logout = () => {
    sessionStorage.removeItem('Ma7ally-token');
    // history.push('/');
  };

  if (!user) {
    // history.push('/');

    return (
      <nav className="flex-row justify-between bg-gradient p-5">
        <Link className="btn bg-secondary p-2" to="/join-us">
          Join Us
        </Link>
        <Link className="btn bg-transparent secondary p-2" to="/login">
          Login
        </Link>
      </nav>
    );
  }

  if (user) {
    return (
      <nav className="flex-row justify-between align-center bg-gradient p-4">
        <Link to="/dashboard">
          <h1 className="btn tertiary p-1 pt-2 pb-0 nav-logo">Ma7ally</h1>
          <h6 className="tertiary p-1 pt-0">Online</h6>
        </Link>

        <button onClick={Logout} className="btn bg-transparent secondary p-2">
          Logout
        </button>
      </nav>
    );
  }
};

export default Navbar;
