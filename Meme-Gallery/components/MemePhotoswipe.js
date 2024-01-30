import React, { useState } from "react";
import { PhotoSwipe } from "react-photoswipe";
import "react-photoswipe/lib/photoswipe.css";

const MemePhotoswipe = ({ memes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openPhotoswipe = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closePhotoswipe = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div>
        {memes.map((meme, index) => (
          <div key={meme.id} onClick={() => openPhotoswipe(index)}>
            <img src={meme.url} alt={meme.title} />
            <p>{meme.title}</p>
          </div>
        ))}
      </div>

      {isOpen && (
        <PhotoSwipe
          isOpen={isOpen}
          items={memes.map((meme) => ({
            src: meme.url,
            w: 0,
            h: 0,
            title: meme.title,
          }))}
          options={{
            index: photoIndex,
            closeOnScroll: false,
          }}
          onClose={closePhotoswipe}
        />
      )}
    </div>
  );
};

export default MemePhotoswipe;
