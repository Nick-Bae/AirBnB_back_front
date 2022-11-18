import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CommentFormPage from '../sidebar/CommentFormPage';

function SignupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='session'>
      <button className="signupBt" onClick={() => setShowModal(true)
      }>  Sign up  </button>
      <>&nbsp;</>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentFormPage setShowModal={setShowModal}/>
        </Modal>
       )} 
    </div>
  );
}

export default SignupModal;