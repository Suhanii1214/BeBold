import poster1 from '../../../assets/posterImages/p1.png'
import poster2 from '../../../assets/posterImages/p2.png'
import poster3 from '../../../assets/posterImages/p3.png'
import "./Banner.scss";
import PosterCarousel from './PosterCarousel';

const Banner = () => {

    const posterImages = [poster1, poster2, poster3]

    return <div className='banner-slider'>
        <PosterCarousel images={posterImages} interval={3000}/>
    </div>;
};

export default Banner;
