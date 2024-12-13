import React from "react";

const SingleRecipe = ({ image, title }) => {
  return (
    <div className="rounded-md shadow-md w-full">
      <div>
        <img className="rounded-md w-full" src={image} alt={title} />
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold">{title}</p>
      </div>
    </div>
  );
};

export default SingleRecipe;
