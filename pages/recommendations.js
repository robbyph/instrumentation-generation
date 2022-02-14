import { NextSeo } from 'next-seo'
import styles from '../styles/Instructions.module.scss'
import Link from 'next/dist/client/link'
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const recommendations = () => {
    return (
        <>
            <NextSeo 
                title="About" 
                description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
            />
            <h1 className={styles.headingOne}>Free/Affordable Plugin Recommendations</h1>
            <div className={styles.container}>
                <p>There's nothing wrong with using free plugins. Free plugins have been used to make the Stardew Valley OST, the Undertale OST and plenty more. All that matters is getting started. Free doesen't mean low quality either, i use plenty of these plugins in my everyday workflow!</p>
                <ul className={styles.list}>
                    <li style={{listStyleType: 'none'}}><strong>General</strong></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://labs.spitfireaudio.com/">Spitfire Labs</a> - Free</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.adsrsounds.com/product/software/air-music-tech-xpand2-all-in-one-workstation/">Xpand!2</a> - $14.99</li>
                    <li><a target="_blank" rel="noopener noreferrer" href='https://www.plogue.com/products/sforzando.html'>Sforzando</a> is a free soundfont player. Lots of soundfonts are hosted <a href="https://musical-artifacts.com/artifacts?tags=soundfont">here</a>.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.dskmusic.com/">DSK</a> offers dozens of free instruments.</li>
                    <li style={{listStyleType: 'none'}}><strong>Orchestral/Ensemble</strong></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.kvraudio.com/product/fantasi-by-safwan-matni">Fantasi</a> - Free</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.spitfireaudio.com/shop/a-z/bbc-symphony-orchestra-discover">BBC Symphony Orchestra Discover</a> - Free with a wait (or $49 for instant)</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.orchestraltools.com/store/collections/45">Orchestral Tools Layers</a> - Free</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://projectsam.com/libraries/the-free-orchestra/">Project SAM The Free Orchestra</a> - Free</li>
                    <li style={{listStyleType: 'none'}}><strong>Contemporary Instruments</strong></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://plugins4free.com/plugin/2848/">Keyzone Classic</a> - A free sample based Piano VST</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.powerdrumkit.com/">MTPowerDrumKit2</a> - Free</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.stltones.com/products/stl-ignite-emissary-plug-in-bundle">STL Emissary</a> - Free</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.kvraudio.com/product/synth1-by-daichi-laboratory-ichiro-toda">Synth 1</a> - Free</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://decomposer.de/sitala/">Sitala</a> - Just a really solid drum plugin</li>
                </ul>
                <p style={{marginTop: '1rem'}}>P.S. Don't forget to check and see what, if any, free instruments come with your Digital Audio Workstation! They are usually pretty high quality!</p>
                <p style={{marginTop: '1rem'}}>P.P.S. Be cautious not to get too caught up in collecting plugins. Just get what you need and make some music.</p>
            </div>
            <h1 className={styles.headingOne}>Paid Plugin Recommendations</h1>
            <div className={styles.container}>
                <p>At some point as a composer, you're (probably, not always) going to want to get high quality paid plugins. These are my current favorites.</p>
                <p><strong>Disclaimer! </strong><em>I am not being paid to promote these plugins or anything like that, just my personal recommendations (unless you're one of the plugin developers, then please pay me!)</em></p>
                <ul className={styles.list}>
                   
                    <li style={{listStyleType: 'none'}}><strong>Orchestral/Ensemble</strong></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.kvraudio.com/product/fantasi-by-safwan-matni">BBC Symphony Orchestra Pro</a> - The Ultimate Orchestral Suite. It's the most detailed part of spitfire's offerings IMO. Has instrument sections and soloists, as well as dozens of microphone positions. You can really get any sound with this. The only thing it doesen't have are sections, such as wind, string and brass, because this is is used for crafting an intricate arrangement.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://spitfireaudio.zendesk.com/hc/en-us/articles/360014642554-What-are-the-differences-between-the-Albion-Libraries-">Spitfire Albion Series</a> - If you would prefer something more suitable for orchestral sketching, versus arrangement, this is spitifre's easier to use offering, allowing you to play the orchestra as sections rather than individual families and instruments. Each Albion library has it's own vibe though, so check out the differneces to see what suits you best.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://cinesamples.com/product/cineperc">CinePerc</a> - An incredibly comprehensive percussion library</li>


                    <li style={{listStyleType: 'none'}}><strong>Contemporary Instruments</strong></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://plugins4free.com/plugin/2848/">Piano Teq</a> - A high quality keyboard instrument plugin which includes a variety of pianos, harpsichords, celestes, electric pianos and more.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.spectrasonics.net/products/omnisphere/">Omnisphere 2</a> - My favorite Synth plugin of all time, and in my opinion, the most versatile</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://heavyocity.com/product/damage-2/">Damage 2</a> - The gold standard for hybrid percussion sounds</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://line6.com/helix/helixnative.html">Helix Native</a> - Helix is my favorite guitar/bass amp modeling software. I use the Helix Floor when i play live and Helix Native to record. High quality and versatile.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.pluginboutique.com/product/4-Synth/1158-VirtualCZ">Virtual CZ</a> - Perfect for replicating that old school ROMpler style synth sound.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://impactsoundworks.com/product/super-audio-cart/">Super Audio Cart</a> - Chiptune synth sounds ripped straight from old school video games.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.e-phonic.com/drumatic.html#/">Drumatic 4</a> - A really dope 10 channel drum machine with a wide range of sounds.</li>


                    <li style={{listStyleType: 'none'}}><strong>Traditional Instruments</strong></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.bestservice.com/ethno_world_6_complete.html">Ethno World 6</a> - An incredibly comprehensive plugin featuring voices and instruments from around the globe!</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.bestservice.com/era_ii_medieval_legends.html">ERA II Medieval Legends</a> - By far the most comprehensive library for medieval european instruments.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.native-instruments.com/en/products/komplete/spotlight-collection/spotlight-collection/">Native Instruments Spotlight Collection</a> - A collection of instruments from <OverlayTrigger
                        overlay={(props) => (
                            <Tooltip {...props}>
                                Cuba, India, East Asia, Middle East, West Africa and Baliense Gamelan
                            </Tooltip>
                            )}
                            placement="top"
                        ><span className={styles.spanToolTip}>6 different musical cultures</span></OverlayTrigger> around the globe.</li>

                    <li style={{listStyleType: 'none'}}><strong>Vocals</strong></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.strezov-sampling.com/products/view/WOTAN-Male-Choir.html">Wotan Male Choir</a> - Versatile and powerful choir plugin with Male Tenors and Basses. Think LOTR style choirs. Counterpart of Freyja.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.strezov-sampling.com/products/view/FREYJA-Female-Choir.html">Freyja Female Choir</a> - Versatile and emotive choir plugin with Female Altos and Sopranos. Think LOTR style choirs. Counterpart of Wotan.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.strezov-sampling.com/products/view/arva.html">Arva Children Choir</a> - A children choir library with boys and girls. Also, Think LOTR style choirs.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.strezov-sampling.com/products/view/sc-ultimate.html">Storm Choir</a> - A powerful and haunting chamber choir. Think Dark Souls or Halo style choirs.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.strezov-sampling.com/products/view/rhodope2.html">Tropar</a> - An authentic Orthodox choir. Perfect for your latin chants.</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.strezov-sampling.com/products/view/rhodope2.html">Rhodope 2</a> - Ethnic Bulgarian Choir</li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.fluffyaudio.com/shop/dominus-choir-pro/">Dominus Choir</a> - A unique choir plugin that allows you to build phrases, having complete control over what the choir is actually saying.</li>
                    <li style={{listStyleType: 'none'}}><em>Strezov also has a much, much cheaper <a href="https://www.strezov-sampling.com/products/view/choir-essentials.html">Choir Essentials Plugin</a> that takes selections from many of these for beginners who don't need the options overload or don't have the funds.</em></li>
                    <br />    
                    <p><em>Note: Many of these plugins may require <a target="_blank" rel="noopener noreferrer" href="https://www.native-instruments.com/en/products/komplete/samplers/kontakt-6/">Kontakt</a> to play them.</em></p>
                </ul>
            </div>
        </>
    )
}

export default recommendations
