import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContent}>

        <div className={styles.identity}>
          <p>Hello, I'm</p>

          <h1>
            <span>Kadir</span>
            <span>Ersoy</span>
          </h1>
        </div>


        <div className={styles.education}>
          <h2>Computer Engineering Student</h2>

          <span>at ESIEE Paris</span>
        </div>


        <div className={styles.job}>
          <h2>Software Engineer</h2>

          <span>at Brasserie Champigneulles</span>
        </div>


        <div className={styles.heroImage}>
          {/* Ta photo arrivera ici */}
        </div>

      </div>
    </section>
  );
};