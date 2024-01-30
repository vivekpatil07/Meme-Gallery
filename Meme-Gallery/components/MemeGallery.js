import React, { useState, useEffect } from "react";
import axios from "axios";
import MemePhotoswipe from "./MemePhotoswipe";
import styles from "./MemeGallery.module.css";

const MemeGallery = () => {
  const [memes, setMemes] = useState([]);
  const [after, setAfter] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [photoSwipeOpen, setPhotoSwipeOpen] = useState(false);

  const fetchMemes = async () => {
    try {
      const response = await axios.get(
        `https://www.reddit.com/r/memes.json?after=${after || ""}`
      );

      const newMemes = response.data.data.children.map((child) => ({
        id: child.data.id,
        title: child.data.title,
        thumbnail: child.data.thumbnail,
        url: child.data.url,
      }));

      setMemes((prevMemes) => [...prevMemes, ...newMemes]);
      setAfter(response.data.data.after);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };


  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    setPhotoSwipeOpen(true);
  };

  const handleGalleryScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchMemes();
    }
  };

  const handleClosePhotoSwipe = () => {
    setPhotoSwipeOpen(false);
  };

  useEffect(() => {
    fetchMemes();

    window.addEventListener("scroll", handleGalleryScroll);

    return () => {
      window.removeEventListener("scroll", handleGalleryScroll);
    };
  }, [after]);

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        {memes.map((meme, index) => (
          <div
            key={meme.id}
            className={styles.memeCard}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={meme.thumbnail}
              alt={meme.title}
              className={styles.thumbnail}
            />
            <p className={styles.memeTitle}>{meme.title}</p>
          </div>
        ))}
      </div>

      {photoSwipeOpen && (
        <MemePhotoswipe
          memes={memes}
          selectedImage={selectedImage}
          onClose={handleClosePhotoSwipe}
        />
      )}
    </div>
  );
};

export default MemeGallery;
