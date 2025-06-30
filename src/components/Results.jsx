import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);

  return (
    <div>
      <h2>
        <strong>{name}</strong>, your element is: {element}
      </h2>

      {artwork ? (
        <div className="artwork">
          <h3>{artwork.title}</h3>
          <img
            src={artwork.primaryImage}
            alt={artwork.title}
            style={{ maxWidth: "400px", height: "auto" }}
          />
          <p>{artwork.artistDisplayName}</p>
          <p>{artwork.objectDate}</p>
        </div>
      ) : (
        <p>Loading artwork or no image found. 😔</p>
      )}
    </div>
  );
}
