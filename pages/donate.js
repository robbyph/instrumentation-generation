import { NextSeo } from 'next-seo'
import styles from '../styles/Donate.module.scss'
import { Row, Col, Carousel, CarouselItem } from 'react-bootstrap'
import instrumentData from '../components/data/instruments.json'


const donate = () => {
    var instruments = [];
    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      var newInstruments = [...instrumentData]
      instruments = shuffle(newInstruments)
      
    return (
        <div>
             <NextSeo 
                title="Support" 
                description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
            />
            <Row>
            <Col>
            <h1 className={styles.headingOne}>Share</h1>
            <div className={styles.container}>
                <h5 style={{textAlign: 'center'}}>Share the project with your friends!</h5>
                    <ul className={styles.social}>
                        <li className={styles.facebook}><a href="https://www.facebook.com/sharer.php?u=http://instrumentationgeneration.com" target="_blank" rel="nofollow external noopener"></a></li>
                        <li className={styles.twitter}><a href="https://twitter.com/intent/tweet?url=http://instrumentationgeneration.com&amp;text=Instrumentation Generation" target="_blank" rel="nofollow external noopener"></a></li>
                        <li className={styles.pinterest}><a href="https://pinterest.com/pin/create/bookmarklet/?url=http://instrumentationgeneration.com&amp;description=Instrumentation Generation" target="_blank" rel="nofollow external noopener"></a></li>
                        <li className={styles.linkedin}><a href="https://www.linkedin.com/shareArticle?url=http://instrumentationgeneration.com&amp;title=Instrumentation Generation" target="_blank" rel="nofollow external noopener"></a></li>
                        <li className={styles.reddit}><a href="https://reddit.com/submit?url=http://instrumentationgeneration.com&amp;title=Instrumentation Generation" target="_blank" rel="nofollow external noopener"></a></li>
                        <li className={styles.stumbleupon}><a href="http://www.stumbleupon.com/submit?url=http://instrumentationgeneration.com&amp;title=Instrumentation Generation" target="_blank" rel="nofollow external noopener"></a></li>
                        <li className={styles.tumblr}><a href="https://www.tumblr.com/widgets/share/tool?canonicalUrl=http://instrumentationgeneration.com&amp;title=Instrumentation Generation" target="_blank" rel="nofollow external noopener"></a></li>
                        <li className={styles.digg}><a href="http://digg.com/submit?url=http://instrumentationgeneration.com&amp;title=Instrumentation Generation" target="_blank" rel="nofollow external noopener"></a></li>
                    </ul>
            </div>
            </Col>

            <Col>
            <h1 className={styles.headingOne}>Purchase Instrument Icons</h1>  
            <div className={styles.container}>
                <h5 style={{textAlign: 'center'}}>Enjoying the website? Want to support my work? Want to help make sure the site stays ad-free? Please consider purchasing the Instrument Icon Pack.</h5> 
                <h6 style={{textAlign: 'center'}}>Whats Included:</h6>
                <ul>
                    <li>Over 150 high quality silhouette style instrument icons in PNG format</li>
                    <li>License for personal commercial use with attribution</li>
                </ul>
                <h6 style={{textAlign: 'center', textDecoration: 'underline'}}>Stripe Checkout Coming Soon!</h6>
                <Carousel controls={false} interval={2700}>
                        {instruments.map((instrument, i) =>(
                            <Carousel.Item key={i}><img className={"d-block w-100"} src={'../' + instrument.image} alt={instrument.name} style={{padding:'1rem', maxHeight: '10rem', height:'100%', objectFit: 'contain'}}/></Carousel.Item>
                        ))}
                </Carousel>
            </div>
            </Col>

            <Col>
        
            <h1 className={styles.headingOne}>Donate</h1>   
            <div className={styles.container}>
            <h5 style={{textAlign: 'center'}}>If you like the website and find it useful, i also have the option of donating via Kofi!</h5> 
            <h6 style={{textAlign: 'center', textDecoration: 'underline'}}>Kofi integration Coming Soon!</h6>
            </div>
            </Col>
            </Row>
        </div>
    )
}

export default donate
