import React from 'react';
import { Link } from "react-router-dom";


function Sidebar({ links, close }) {
  return (
    <div className='sidebar' onClick={close}>
      {links.map(link => (
        <div className='sidebar-link' key={link.name}><Link to={link.path}>{link.name}</Link></div>

      ))}
    </div>
  )
}

export default Sidebar