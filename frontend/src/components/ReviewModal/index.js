import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';
// import { getSpotReviews } from '../../store/comment';
import { getSpotBySpotId } from '../../store/spot';
// import './review.css';

function ReviewFormModal({spot, reviews}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  // const reviews = useSelector((state) => state.reviews);
  // console.log("reviews",reviews)

  const [showModal, setShowModal] = useState(false);
  
  // const reviews = useSelector(state=>state.reviews)
  
  // console.log("reviewformModal",spot)
  // console.log("reviews from useSelector",reviews)
//   useEffect(() => {
//     dispatch(getSpotBySpotId(spot.id));
//     dispatch(getSpotReviews(spot.id));
// }, [dispatch, spot.id]);

  // useEffect(()=> {
  //   setShowModal(false);
   
  // },[reviews]);
  const clickReviewBt = ()=>{
    !user ? alert("please login") : setShowModal(true)
  }

  return (
    <div >
      <button className="clickReviewBt" onClick={clickReviewBt}>
      <i class="fa-solid fa-pen-to-square"> </i> &nbsp; Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm spot={spot} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default ReviewFormModal;