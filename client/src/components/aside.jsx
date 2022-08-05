import React from 'react'
import "../components/root.css"
import "../components/aside.css"

const Aside = () => {
  return (
    <aside className="aside-container">
      <button className="aside__button-add">
        <i className='bx bx-plus-circle'></i>
        Nuevo
      </button>
      <ul className="aside__list">
        <li className="aside__list-item"><button className="aside__list-button"><i className='bx bxl-dropbox'></i>My unit</button></li>
        <li className="aside__list-item"><button className="aside__list-button"><i className='bx bx-group'></i>Shared with me</button></li>
        <li className="aside__list-item"><button className="aside__list-button"><i className='bx bx-time'></i>Recent</button></li>
        <li className="aside__list-item"><button className="aside__list-button"><i className='bx bx-star'></i>Featured</button></li>
        <li className="aside__list-item"><button className="aside__list-button"><i className='bx bx-trash'></i>Recycle Bin</button></li>
      </ul>
      <ul className="aside__list-storage">
        <li className="aside__list-item"><button className="aside__list-button"><i className='bx bx-cloud'></i>Storage</button></li>
        <li className="aside__list-text">7.9 GB of 15 GB used</li>
        <li className="aside__list-item"><button className="aside__list-bstorage">Buy storage</button></li>
      </ul>
    </aside>
  )
}

export default Aside