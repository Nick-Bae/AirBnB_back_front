import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect, useParams } from 'react-router-dom';
import { deleteImage } from '../../store/image';
import { getSpotBySpotId } from '../../store/spot';
import './Delete.css'
// import { createImage } from '../../store/image';

const DeleteImage = ({spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const spot = useSelector(state => state.spot[spotId]);
    // console.log("spot spot spot", spot)
    console.log("imageId",id)
    console.log("spotId",spotId)

    const handleSubmit = (e) => {

        // window.alert("Are you sure to delte the image?")
        // const imageId = spot?.image[0].id
        // console.log("imageId",imageId)
        e.preventDefault();
        dispatch(deleteImage(id))
        // history.push(`/spots/${spot?.id}}`);
        history.goBack();
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        // history.push(`/spots/${id}`);
        history.goBack();
    };

    // useEffect(() => {
    //     dispatch(getSpotBySpotId(spot?.id))
    // }, [dispatch]);

    return (
        <div>

            <p id="imageDeleteTitle">Are you sure to delete the image?</p>
            <div id="new-image">
                <button id="imageDelete" type="button" onClick={handleSubmit}>Delete</button>
                <button id="imageDeleteCancel" type="button" onClick={handleCancelClick}>Cancel</button>

            </div>
        </div>
    )
}

export default DeleteImage