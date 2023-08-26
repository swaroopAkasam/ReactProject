import React from 'react'
import { useState } from 'react'
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";

function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const links = [
        {
            name: "HOME",
            path: "/"
        },
        {
            name: "YOURFOOD",
            path: "/yourfood"
        },
        {
            name: "ABOUT",
            path: "/about"
        }
    ]
    function closeSidebar() {
        setShowSidebar(false)
    }
    return (
        <>
            <div className='navbar '>

                <div className='logo'><Link to='/'><span className='span1'>Food</span><span className='span2'>ForThought</span></Link></div>
                <div className='nav-links'>
                    {links.map(link => (
                        // <a href={link.path} key={link.name}>{link.name}</a>
                        <span key={link.name}><Link to={link.path}>{link.name}</Link></span>
                    ))}
                </div>
                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                </div>
            </div>
            {showSidebar && <Sidebar close={closeSidebar} links={links} />}
        </>
    )
}

export default Navbar