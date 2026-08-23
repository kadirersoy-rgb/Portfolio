import styles from "./About.module.css";
import {DecorativeImage} from "./DecorativeImage";

export const About = () => {
  return (
    <section id="about" className={styles.about}>

      <div className={styles.aboutContent}>

        {/* Photo */}
        <div className={styles.aboutImage}>

          <DecorativeImage
            src="/images/test.png"
            alt="Kadir Ersoy"
          />

        </div>

        {/* Informations */}
        <div className={styles.aboutInfo}>

          {/* Titre */}
          <h2 className={styles.aboutTitle}>
            About <span>me.</span>
          </h2>


          {/* Onglets */}
          <div className={styles.aboutTabs}>

            <button className={styles.activeTab}>
              Présentation
            </button>

            <button>
              Langues
            </button>

            <button>
              Soft skills
            </button>

            <button>
              Intérêts
            </button>

          </div>


          {/* Contenu */}
          <div className={styles.aboutTabContent}>

            <h3>Qui suis-je ?</h3>

            <p>
              Contenu de présentation...
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};