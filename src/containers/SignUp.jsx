import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useParams, Link } from 'react-router-dom';
import { signup } from '../Helpers';

const SignUp = () => {
  const history = useHistory();
  const params = useParams();
  const [credits, setCredits] = useState();
  const [failure, setFailure] = useState();

  const handleClick = () => {
    const btn = document.getElementById('signup');
    btn.disabled = true;
    btn.style.backgroundColor = '#4caf50';
    btn.style.color = '#370640';
    btn.value = 'Wait...';
  };

  const handleChange = (e) => {
    setCredits({ ...credits, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFailure();
    handleClick();
    const respond = await signup(credits);
    if (!respond.authentication_token) {
      setFailure(respond);
    }
    if (respond.authentication_token) {
      sessionStorage.setItem(
        'Ma7ally-token',
        JSON.stringify(respond.authentication_token)
      );
      history.go(-2);
    }
  };

  if (failure) {
    const btn = document.getElementById('signup');
    btn.disabled = false;
    btn.style.backgroundColor = '#ff9800';
  }
  return (
    <div className="m-auto max-width">
      <h1 className="text-center m-5">Sign Up</h1>

      <div className="flex-col center">
        {failure &&
          failure[0] &&
          failure.map((fail) => (
            <span key={fail} className="alert-bad">
              {fail}
            </span>
          ))}
      </div>
      <br />
      <form onSubmit={handleSubmit} className="flex-col p-3">
        <input
          onChange={handleChange}
          type="text"
          className="name input"
          name="username"
          placeholder="Full name"
          minLength="4"
          required
        />

        <input
          onChange={handleChange}
          type="email"
          className="name input"
          name="email"
          placeholder="Your email"
          minLength="4"
          required
        />

        <input
          onChange={handleChange}
          type="password"
          className="password input"
          name="password"
          minLength="6"
          placeholder="Password"
          required
        />

        <input
          type="submit"
          id="signup"
          className="submit btn active login p-2 bg-secondary"
          value="SIGN UP"
        />
      </form>

      <Link to={`/${params.storename}/login`} className="p-3">
        Already have an account? Click here...
      </Link>
    </div>
  );
};

export default SignUp;
