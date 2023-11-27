// Sort.js
import React, { useContext } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import './Sort.scss';
import Select from 'react-select';
import { Context } from '../../../utils/context';

const Sort = ({ options, selectedOption, onChange, name, products }) => {
  const { gridView, setGridView, setListView } = useContext(Context);

  return (
    <div className='sort-section'>
      <div className='button-section'>
        <span className={gridView ? 'active layout-buttons' : 'layout-buttons'} onClick={setGridView}>
          <BsFillGridFill />
        </span>
        <span className={!gridView ? 'active layout-buttons' : 'layout-buttons'} onClick={setListView}>
          <BsList />
        </span>
      </div>
      {products && (
        {/* <div className='product-data'>{`${products.length} Products Available`}</div> */}
      )}
      <div className='sorting-bar'>
        <Select
          className='input-field'
          options={options}
          name={name}
          value={selectedOption}
          onChange={onChange}
          isClearable
          placeholder='Sort By..'
        />
      </div>
    </div>
  );
};

export default Sort;
