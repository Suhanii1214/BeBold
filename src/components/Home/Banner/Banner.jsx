import poster1 from '../../../assets/posterImages/p1.png'
import poster2 from '../../../assets/posterImages/p2.png'
import poster3 from '../../../assets/posterImages/p3.png'
import "./Banner.scss";

const Banner = () => {

    const posterImages = [poster1]

    return <div className='banner-slider'>
        {posterImages.map((item, index)=> {
            return <div key={index}>
                <img src={item} alt='poster'/>
            </div>
        })}
    </div>;
};

export default Banner;
