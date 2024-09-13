import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGRmZjIxNzljYTA1NzZhZWVjZDBmMGJiMzRjMTViZiIsInN1YiI6IjY2NmQyZjliMTJkNTk2ZGM3YWI4YzhmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BQjIvgssyuq01HBzj4I7ucL3oFkGO2KH3n3qTRYtqIk'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);
    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on THE ENTERTAINMENT HUB"}</h2>
      <div className='cards-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <div className='card' key={index}>
            <Link to={`/player/${card.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
              <p>{card.original_title}</p>
            </Link>
            <div className='card-actions'>
              <button className='add-to-cart-button'>Add to Cart</button>
              <button className='rating-button'>
                ⭐ {card.vote_average.toFixed(1)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
