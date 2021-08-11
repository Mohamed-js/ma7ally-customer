import React, { useState } from 'react';
import '../styles/navbar.css';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import {
  faBars,
  faChevronUp,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const history = useHistory();
  const params = useParams();
  const [menu, setMenu] = useState();
  const user = JSON.parse(sessionStorage.getItem('Ma7ally-token'));

  const Logout = () => {
    sessionStorage.removeItem('Ma7ally-token');
    history.push('/login');
  };

  const handleSideBar = () => {
    if (menu === 'open-menu') {
      setMenu('close-menu');
    } else {
      setMenu('open-menu');
    }
  };

  return (
    <div className="side-bar">
      <nav
        id="nav"
        className={`flex-col justify-between w-100 align-center bg-gradient fixed ${menu}`}>
        <div className="flex-row justify-between w-100 align-center bg-gradient p-4 fixed">
          <Link to={`/${params.storename}`}>
            <h1 className="btn tertiary p-1 nav-logo">
              {params.storename.toUpperCase()}
            </h1>
          </Link>
          <h1 onClick={handleSideBar}>
            {menu === 'open-menu' || (
              <FontAwesomeIcon
                onClick={handleSideBar}
                icon={faBars}
                className="secondary"
              />
            )}
            {menu === 'open-menu' && (
              <FontAwesomeIcon
                onClick={handleSideBar}
                icon={faChevronUp}
                className="secondary"
              />
            )}
          </h1>
        </div>
        <div className="links">
          {!user && (
            <div className="inner-links">
              <Link
                className="btn bg-transparent secondary p-2 mt-2"
                to="/signup">
                Sign Up
              </Link>
              <Link
                className="btn bg-transparent secondary p-2 mt-2"
                to="/login">
                Login
              </Link>
            </div>
          )}

          {user && (
            <div className="inner-links">
              <h1 className="mt-2">
                <Link
                  className="btn bg-transparent secondary"
                  to={`/${params.storename}/cart`}>
                  <FontAwesomeIcon icon={faShoppingCart} /> Shopping Cart
                </Link>
              </h1>
              <button
                onClick={Logout}
                className="btn bg-transparent secondary p-2 mt-2">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );

  // if (user) {
  //   return (
  //     <nav className="flex-row justify-between w-100 align-center bg-gradient p-4 fixed">
  //       <Link to={`/${params.storename}`}>
  //         <h1 className="btn tertiary p-1 nav-logo">
  //           {params.storename.toUpperCase()}
  //         </h1>
  //       </Link>

  //
  //     </nav>
  //   );
  // }
};

export default Navbar;
