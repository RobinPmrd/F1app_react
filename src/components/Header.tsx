import React from 'react';
import "../styles/Header.css"
import logo from "../images/drivers/f1_logo.png"

interface IProps {
    headerText: string
} 

function Header({headerText}: IProps) {
    return (
        <header>
            <img src={logo} alt="logo" />
            <h1 id="top-title">{headerText}</h1>
        </header>
    )
}

export default Header