import { NextSeo } from "next-seo";
import styles from "../styles/Instructions.module.scss";
import Link from "next/dist/client/link";

const instructions = () => {
  return (
    <>
      <NextSeo
        title="About"
        description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
      />
      <h1 className={styles.headingOne}>What is Instrumentation Generation?</h1>
      <div className={styles.container}>
        <p>
          Instrumentation Generation is a tool for composers—the first tool in a
          planned compositional toolkit. Instrumentation Generation allows you
          to generate random groups of instruments, with varying parameters and
          templates to mix things up. Instrumentation Generation will generate
          you a list, and then you, the composer, are challenged to create some
          new piece of music, just using the given random instruments.
        </p>
        <p>
          Not a composer? That's okay too! The tool is still fun to play with,
          and when that get's old, you can make your way to the Instrument
          Library and learn about new instruments through their descriptions,
          youtube links and wikipedia references.
        </p>
        <p>
          The generator contains over 200 instruments and over 25 templates to
          start with!
        </p>
        <p>
          If you would like to support the project, please check out the
          "support" section, and consider donating or purchasing the instrument
          icons for commercial and personal use! And if you come across an error
          of any kind, please let me know via the 'Feedback' page!
        </p>
      </div>
      <h1 className={styles.headingOne}>
        Where am i supposed to get all these instruments?
      </h1>
      <div className={styles.container}>
        <p>
          If you're sitting here worried about the fact that you might not have
          your clavicord nor crumhorn nor your sitar nor sheng still laying
          around, then let me tell you not to worry!
        </p>
        <p>
          When recording, or atleast sketching, with these instruments, you are
          more likely than not going to be using a virtual instrument (.vst,
          .vst3) within a digital audio workstation (DAW). There are a number of
          free and cheap ones (some that contain lots of instruments) that i
          will reccomend to you to get started!
        </p>
        <ul className={styles.list}>
          <li style={{ listStyleType: "none" }}>
            <strong>General</strong>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://labs.spitfireaudio.com/"
            >
              Spitfire Labs
            </a>{" "}
            - A collection of free high quality instruments. I especially
            reccomend the lap steel, tape orchestra and atmospheres, but they
            are all fantastic.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.adsrsounds.com/product/software/air-music-tech-xpand2-all-in-one-workstation/"
            >
              Xpand!2
            </a>{" "}
            - Another large collection of virtual instruments. Not super
            realistic or anything, but has quite a lot of charm.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.plogue.com/products/sforzando.html"
            >
              Sforzando
            </a>{" "}
            is a free soundfont player. Lots of soundfonts are hosted{" "}
            <a href="https://musical-artifacts.com/artifacts?tags=soundfont">
              here
            </a>
            .
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.dskmusic.com/"
            >
              DSK
            </a>{" "}
            offers dozens of free instruments.
          </li>
          <li style={{ listStyleType: "none" }}>
            <strong>Orchestral/Ensemble</strong>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.kvraudio.com/product/fantasi-by-safwan-matni"
            >
              Fantasi
            </a>{" "}
            - A small collection of free orchestal like virtual instruments.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.spitfireaudio.com/shop/a-z/bbc-symphony-orchestra-discover"
            >
              BBC Symphony Orchestra Discover
            </a>{" "}
            - Free with a wait (or $49 for instant), the free version of what is
            in my opinion, the best orchestral plugin out there.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.orchestraltools.com/store/collections/45"
            >
              Orchestral Tools Layers
            </a>{" "}
            - A really simple instrument that makes it easy for even beginners
            to add orchestral elements to their compositions.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://projectsam.com/libraries/the-free-orchestra/"
            >
              Project SAM The Free Orchestra
            </a>{" "}
            - An incredibly high quality of cinemaic music sounds.
          </li>
          <li style={{ listStyleType: "none" }}>
            <strong>Contemporary Instruments</strong>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://vital.audio/"
            >
              Vital
            </a>{" "}
            - My main workhorse synth. I use it for 95% of my synth needs. Don't
            let the price full you, it's inredibly powerful.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://plugins4free.com/plugin/2848/"
            >
              Keyzone Classic
            </a>{" "}
            - A free sample based Piano VST
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.powerdrumkit.com/"
            >
              MTPowerDrumKit2
            </a>{" "}
            - Free drum kit plugin
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.stltones.com/products/stl-ignite-emissary-plug-in-bundle"
            >
              STL Emissary
            </a>{" "}
            - A super high quality guitar amp and cab simulator.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.kvraudio.com/product/synth1-by-daichi-laboratory-ichiro-toda"
            >
              Synth 1
            </a>{" "}
            - A very powerful synth for being free, with tons of community made
            preset packages.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://asb2m10.github.io/dexed/"
            >
              dexed
            </a>{" "}
            - An FM soft synth modelled after the Yamaha DX7.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://decomposer.de/sitala/"
            >
              Sitala
            </a>{" "}
            - Just a really solid drum machine plugin
          </li>
        </ul>
        <p style={{ marginTop: "1rem" }}>
          P.S. Don't forget to check and see what, if any, free instruments come
          with your Digital Audio Workstation! They are usually pretty high
          quality!
        </p>
        <p style={{ marginTop: "1rem" }}>
          P.S.S. Be cautious not to get too caught up in collecting plugins.
          Just get what you need and make some music.
        </p>
        <p style={{ marginTOp: "1rem" }}>
          Check out <a href="https://www.afreestudio.com/">'A Free Studio'</a>{" "}
          for a really cool guide on budget music production and the software
          you'll need!
        </p>
        <p style={{ marginTop: "1rem" }}>
          If you're looking to invest in paid plugins, check the{" "}
          <Link href="/recommendations">Recommended Plugin List</Link> for a
          full list of my suggested plugins!
        </p>
      </div>
      <h1 className={styles.headingOne}>Brief Instructions</h1>
      <div className={styles.container}>
        <h5 style={{ textDecoration: "underline" }}>Parameters</h5>
        <p>
          <strong>Start with a template:</strong> Clicking on the 'Templates'
          button, brings up a window that will allow you to peruse a couple
          dozen templates that you can start with and modify the instrumentation
          of.
        </p>
        <p>
          <strong>Generate a new list of instruments: </strong> Generating a new
          list will replace your current instrumentation with an entirely new
          list. It asks for a range, but if you want a specific size, you can
          just put the same number in both fields.
        </p>
        <p>
          <strong>Add a random group of new instruments: </strong>Adding a new
          group of instruments will generate as many random instruments as you
          ask for and add them to your list!
        </p>
        <p>
          <strong>Choose an instrument to add to the list: </strong> Choose one
          specific instrument to add to your instrumentation list.
        </p>
        <p>
          <strong>No Duplicates: </strong>If you dont want multiple of each
          instrumnet to be able to be generated, check 'No Duplicates' and it
          will make sure every instrument that is generated for your list is not
          a duplicate. This does not retroactively apply to instruments already
          in your list.
        </p>
        <p>
          <strong>Clear List: </strong>Clicking 'Clear List' will remove all
          instruments from your list, starting you over fresh
        </p>
        <h5 style={{ textDecoration: "underline" }}>Instrument Cards</h5>
        <p>
          <strong>Lock: </strong>Locking your instrument prevents it from being
          deleted in all fashions.
        </p>
        <p>
          <strong>Shuffle: </strong>The shuffle button will replace just that
          instrument with a random instrument.
        </p>
        <p>
          <strong>Delete: </strong>The delete button removes your instruments
          from the list.
        </p>
        <p>
          <strong>Replace: </strong>The replace button allows you to pick an
          instrument to replace it with.
        </p>
      </div>
      <h1 className={styles.headingOne}>Tutorial Video</h1>
      <div className={styles.container}>
        <p>Coming Soon!</p>
      </div>
    </>
  );
};

export default instructions;
