import styles from "./Hero.module.css";
import BlurText from "./BlurText";

export const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContent}>

        {/* Identité */}
        <div className={styles.identity}>
          <p>Hello, I'm</p>

          <BlurText
            as="h1"
            text="Kadir Ersoy"
            animateBy="words"
            direction="top"
            delay={150}
            className={styles.identityTitle}
          />
        </div>

        {/* Photo */}
        <div className={styles.heroImage}>
          <img src="/images/test.png" alt="Kadir Ersoy" />
        </div>

        {/*Hero right content */}
        <div className={styles.rightContent}>

          {/* Formation */}
          <div className={styles.education}>
            <h2>Computer Engineering Student</h2>
            <span>at ESIEE Paris</span>
          </div>

          {/* Poste */}
          <div className={styles.job}>
            <h2>Software Engineer</h2>
            <span>at Brasserie Champigneulles</span>
          </div>

        </div>
      </div>
    </section>
  );
};