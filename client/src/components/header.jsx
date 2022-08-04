import React from 'react'
import "../components/root.css"
import "../components/header.css"

const Header = () => {
  return (
    <header className="header-container">
      <div className="header__logo">
        <img src="../src/assets/logo.png" alt="HyperUpload" />
      </div>
      <div className="header__search-container">
        <button className="header-container__lup">
          <i className='bx bx-search-alt' ></i>
        </button>
        <input className="header-container__input" type="text" placeholder="Search in HyperUpload" className="header__search">
        
        </input>
        <button className="header-container__filter">
          <i className='bx bx-filter'></i>
        </button>
      </div>
      <div className="header__user">
        <img src="../src/assets/user.png" alt="Img User"/>
      </div>
    </header>
  )
}

export default Header