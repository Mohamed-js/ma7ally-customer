import React from 'react';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
const Navbar = () => {
  const history = useHistory();
  const params = useParams();
  const user = JSON.parse(sessionStorage.getItem('Ma7ally-token'));

  const Logout = () => {
    sessionStorage.removeItem('Ma7ally-token');
    history.push('/login');
  };

  if (!user) {
    // history.push('/');

    return (
      <nav className="flex-row justify-between bg-gradient p-4">
        <Link className="btn bg-secondary p-2" to="/signup">
          Sign Up
        </Link>
        <Link className="btn bg-transparent secondary p-2" to="/login">
          Login
        </Link>
      </nav>
    );
  }

  if (user) {
    return (
      <nav className="flex-row justify-between w-100 align-center bg-gradient p-4 fixed">
        <Link to={`/${params.storename}`}>
          <h1 className="btn tertiary p-1 nav-logo">
            {params.storename.toUpperCase()}
          </h1>
        </Link>

        <button onClick={Logout} className="btn bg-transparent secondary p-2">
          Logout
        </button>
      </nav>
    );
  }
};

export default Navbar;
