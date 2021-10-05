import React from "react";
import "./Card.css"

function Card(props) {
  const game = props.game;
  return (
    <a href={`https://rawg.io/games/${game.slug}`} target="_blank" rel="noreferrer">
      <div className="card">
        <img src={game.background_image} alt={game.slug} />
        <h2>{game.name}</h2>
      </div>
    </a>
  );
}

export default Card;