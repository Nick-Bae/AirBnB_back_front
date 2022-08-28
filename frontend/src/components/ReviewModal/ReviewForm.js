import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSpotReviews } from '../../store/comment';
import { createReview } from '../../store/comment';
import { useSelector } from 'react-redux';
import { deleteReview } from '../../store/comment';
import './review.css'

export const ReviewForm = ({spot}) => {
    // console.log("????",id)
    const history = useHistory();
    const dispatch = useDispatch();
    const spotReviewsObj = useSelector(state => state.review)
    const spotReviews = Object.values(spotReviewsObj);
    const currSpot = spot.id;
    const spotReview = spotReviews.filter(spot => (spot.spotId === parseInt(currSpot)))
    const [update, setUpdate] = useState(false);
    const currentUser = useSelector(state => state.session.user)

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    // const [errors, setErrors] = useState([]);
    // let message = '';

    useEffect(() => {
        const errors = [];
        if (!review.length) errors.push('Please enter your review');
        if (!stars.length) errors.push('Please enter your stars');
        if (stars < 0 || stars > 6) errors.push('Please enter between 0~5')
        setValidationErrors(errors);
    }, [review, stars])

    // ============ create new review======================
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentUser) return alert("Please log in")

        const isReview=spotReview.find(review=> review.userId === currentUser.id)
         if (isReview) return alert ("You've already left a review on this spot")
        setHasSubmitted(true);
        setUpdate(true);
        if (validationErrors.length) return alert(`Cannot Submit`);

        const report = { review, stars, currSpot };

        // console.log('report????',report)
        // function onChange(){
        //     const newCount = count + 1;
        //     setCount(newCount);
        //     getData(newCount); 
            
        //   }

        dispatch(createReview(report))
        // .catch(async (res) => {
        //     const data = await res.json()
        //     if (data && data.message) {
        //         const issue = Object.values(data.message)
        //          message = (issue.join(''))
        //     }
        // })
        // setUpdate(true)
        // const createRe = await dispatch(createReview(report));
        // history.push(`/spots/${currSpot}`);

     
    };

    useEffect(() => {
        console.log("useeffect ",currSpot)
        dispatch(getSpotReviews(currSpot));
    }, [ update]);
    
  
    if (!spotReview) return null

    return (
        <section>
            {/* <h2>Errors</h2> */}
            {hasSubmitted && validationErrors.length > 0 && (
                <div id="errormessage">
                    The following errors were found:
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} >
                <div id="review">
                    <label>
                        Review
                        <input
                            type="text"
                            placeholder='please leave a review'
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        />
                    </label>
                    <label>
                        stars
                        <input
                            type="number"
                            min="0" max="5"
                            placeholder='0'
                            value={stars}
                            onChange={e => setStars(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit"> Submit </button>
            </form>

            
        </section>
    );
}


// ================== delete Review ==================
// const deleteReview =  (e) => {
//     // e.preventDefault();
//     console.log('befor ')
//     const id = e.target.getAttribute("value")

//     // const id = obj
//     // const id  = e.getAttribute('value')
//     console.log('button Id', id)
//      dispatch(deleteReview(parseInt(id)))
//     setRemove(true)


//     // history.push(`/spots/${currSpot}`);
//     // {<Redirect to="/" />}
//     //   setRemove(true)
//     // dispatch(getAllSpots());
//     // history.push('/')
//     //   window.location.reload(true);
// };


export default ReviewForm