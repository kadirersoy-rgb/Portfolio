import styles from "./DecorativeImage.module.css";

export const DecorativeImage = ({ src, alt }) => {
  return (
    <div className={styles.decorativeImage}>

      {/* Cadres décoratifs */}
      <div className={styles.frame1}></div>
      <div className={styles.frame2}></div>

      {/* Photo */}
      <div className={styles.imageContainer}>
        <img src={src} alt={alt} />
      </div>

    </div>
  );
};