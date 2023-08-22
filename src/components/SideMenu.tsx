import React from 'react';
import "../styles/SideMenu.css"

interface IProps {
    setPage : React.Dispatch<React.SetStateAction<string>>,
    setHeaderText : React.Dispatch<React.SetStateAction<string>>
}

function SideMenu({setPage, setHeaderText} : IProps) {
    return (
        <nav className="side-menu">
            <ul className="menu-list" onClick={(e) => {
                setPage((e.target as HTMLLIElement).textContent!);
                setHeaderText((e.target as HTMLLIElement).textContent!);
            }}>
                <li>Home</li>
                <li>Drivers</li>
                <li>Teams</li>
                <li>Races</li>
                <li>Standings</li>
                <li>News</li>
            </ul>
        </nav>
    )
}

export default SideMenu