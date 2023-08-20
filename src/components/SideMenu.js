import "../styles/SideMenu.css"

function SideMenu({setPage}) {
    return (
        <nav className="side-menu">
            <ul className="menu-list" onClick={(e) => setPage(e.target.textContent)}>
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