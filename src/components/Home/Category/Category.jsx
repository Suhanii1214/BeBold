import {useNavigate} from 'react-router-dom'
import "./Category.scss";
const Category = ({categories}) => {

    const navigate = useNavigate()

    return <div className='shop-by-category'>
        <div className='heading'>Category</div>
        <div className='categories'>
            {categories?.data?.map((item) => (
                <div 
                    className='category'
                    key={item.id}
                    onClick={() => navigate(`/category/${item.id}`)}
                >
                {item.attributes.categoryImage?.data?.[0]?.attributes?.url && (
                    <img src={process.env.REACT_APP_DEV_URL + item.attributes.categoryImage.data[0].attributes.url} alt='image' />
                )}
                </div>
            ))}
        </div>
    </div>;
};

export default Category;
