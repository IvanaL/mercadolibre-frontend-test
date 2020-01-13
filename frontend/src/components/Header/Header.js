import React, { useState } from 'react';
import './Header.scss';
import searchimg from '../../assets/images/ic_Search@2x.png';
import { Link } from 'react-router-dom';

const Header = props => {
  
  const [search, setSearch] = useState('')

  const submitHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (!search) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('error');
    } else {
      console.log(props.history)
        props.history.push(`/items?search=${search}`);
        form.classList.remove('error');
    }

  }

  return (
    <div className="Header">
      <div className="container">
        <div className="logo"><Link className="logoLink" to="/">LOGO</Link></div>
        <div className="searchBox">
          <form onSubmit={(e) => submitHandler(e)} noValidate>
            <div className="form-control addon">
                <input type="text" onChange={e => setSearch(e.target.value)} value={search} className="custom-control" placeholder="Nunca dejes de buscar..."/>
                <button type="submit"><img src={searchimg} alt="search icon" /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Header;
