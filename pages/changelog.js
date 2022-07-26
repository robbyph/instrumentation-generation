import { NextSeo } from "next-seo";
import styles from "../styles/Changelog.module.scss";

const changelog = () => {
  return (
    <div>
      <NextSeo
        title="Changelog"
        description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
      />
      <h1 className={styles.headingOne} style={{ marginBottom: "1rem" }}>
        Changelog
      </h1>
      <div
        id={styles.changeList}
        className={styles.container}
        style={{ paddingTop: ".5rem" }}
      >
        <div className={styles.changeItem} style={{ paddingTop: 0 }}>
          <h4 className={styles.headingFour}>
            <strong>Beta: </strong>Version 0.82
          </h4>
          <p className={styles.itemDate}>July 26th 2022</p>
          <ul className={styles.changes}>
            <li className={styles.listItem}>
              Fixed an error that caused the 'Feedback' page not to work. If you
              sent an email before this change, please resend it!
            </li>
          </ul>
        </div>
        <div className={styles.changeItem} style={{ paddingTop: 0 }}>
          <h4 className={styles.headingFour}>
            <strong>Beta: </strong>Version 0.81
          </h4>
          <p className={styles.itemDate}>July 13th 2022</p>
          <ul className={styles.changes}>
            <li className={styles.listItem}>Overhauled Accessibility</li>
            <li className={styles.listItem}>Color Scheme Change</li>
          </ul>
        </div>
        <div className={styles.changeItem} style={{ paddingTop: 0 }}>
          <h4 className={styles.headingFour}>
            <strong>Beta: </strong>Version 0.8
          </h4>
          <p className={styles.itemDate}>February 16th 2022</p>
          <ul className={styles.changes}>
            <li className={styles.listItem}>
              A litany of bug fixes, new instruments and templates
            </li>
            <li className={styles.listItem}>Added subscription form</li>
            <li className={styles.listItem}>Added feedback form</li>
            <li className={styles.listItem}>QOL improvements</li>
            <li className={styles.listItem}>Text formatting overhaul</li>
          </ul>
        </div>
        <div className={styles.changeItem} style={{ paddingTop: 0 }}>
          <h4 className={styles.headingFour}>
            <strong>Beta: </strong>Version 0.7
          </h4>
          <p className={styles.itemDate}>November 11th 2021</p>
          <ul className={styles.changes}>
            <li className={styles.listItem}>Over 40 new instruments</li>
            <li className={styles.listItem}>Finished baseline templates</li>
            <li className={styles.listItem}>Messed with some styling</li>
            <li className={styles.listItem}>Hella bug fixes</li>
          </ul>
        </div>
        <div className={styles.changeItem} style={{ paddingTop: 0 }}>
          <h4 className={styles.headingFour}>
            <strong>Beta: </strong>Version 0.6
          </h4>
          <p className={styles.itemDate}>October 9th 2021</p>
          <ul className={styles.changes}>
            <li className={styles.listItem}>
              Added sorting to library and modals
            </li>
            <li className={styles.listItem}>
              Added filtering to library and modals
            </li>
            <li className={styles.listItem}>
              Added tag based instrument generation
            </li>
            <li className={styles.listItem}>Updated CSS</li>
          </ul>
        </div>
        <div className={styles.changeItem} style={{ paddingTop: 0 }}>
          <h4 className={styles.headingFour}>
            <strong>Beta: </strong>Version 0.5
          </h4>
          <p className={styles.itemDate}>August 6th 2021</p>
          <ul className={styles.changes}>
            <li className={styles.listItem}>Initial Application Version</li>
            <li className={styles.listItem}>Over 150 Instruments</li>
            <li className={styles.listItem}>Dozens of Templates</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default changelog;
