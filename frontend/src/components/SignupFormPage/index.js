// import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
// import SignupFormPage from './SignupFormPage';

// function SignupFormModal() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div className='session'>
//       <button className="beforelogbt" onClick={() => setShowModal(true)}>Sign up</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <SignupFormPage />
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default SignupFormModal;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupFormPage.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ username, firstName, lastName, email, password }))
      // return dispatch(sessionActions.signup({ username,  email, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} className='signform'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className="email">
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="username">
        User name
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        </label>
      <label className="firstname">
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        </label>
      <label className="lastname">
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </label>
      <label className="password">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="confirmname">
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <div id="button">
      <button type="submit" className="signbt">Sign Up</button>
      <button id="cancel" onClick={()=>{history.push('/')}}>Cancel</button>
      </div>
    </form>
  );
}

export default SignupFormPage;