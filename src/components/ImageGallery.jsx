import React from "react";
import useFirestore from "../hooks/useFirestore";

const ImageGallery = () => {
  const { docs, isLoading } = useFirestore("images");
  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
      {docs.map((item) => {
        return (
          <div
            key={item.imageUrl}
            className="card card-compact w-50 bg-base-100 shadow-xl "
          >
            <figure>
              <img src={item.imageUrl} alt="Shoes" />
            </figure>
            <div className="card-body">
              <p>Upload by:{item.userEmail}</p>
              <p>Created by: {item.createdAt.toString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGallery;
