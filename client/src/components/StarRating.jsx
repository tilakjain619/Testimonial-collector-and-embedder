import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
    const totalStars = 5; // Assuming a 5-star rating system
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
        stars.push(
            <FontAwesomeIcon
                key={i}
                icon={faStar}
                style={{ color: i <= rating ? '#FFD700' : 'gray' }} // Yellow for filled stars, gray for empty stars
            />
        );
    }

    return <div>{stars}</div>;
};


export default StarRating
