import React from 'react';
import "../styles/Header.css"
import logo from "../images/f1_logo.png"

function Header() {
    return (
        <header>
            <img src={logo} alt="logo" />
            <h1 id="top-title">Welcome to the Formula 1 App</h1>
        </header>
    )
}

export default Header