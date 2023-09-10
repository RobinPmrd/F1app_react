import React from 'react';
import "../styles/Home.css"
import { useTranslation } from 'react-i18next';
interface IProps {
    setPage: React.Dispatch<React.SetStateAction<string>>,
    setUpdateHeaderText: React.Dispatch<React.SetStateAction<boolean>>
}
 
function Home({setPage, setUpdateHeaderText}: IProps){
    const {t} = useTranslation();

    return ( 
        <div className="home-content">
            <div data-value={"Drivers"} onClick={e => {setPage("Drivers"); setUpdateHeaderText(true)}}>
                <p>{t("Drivers")}</p>
                <img src={require("../images/drivers_wallpaper.png")} alt="missing" />
            </div>
            <div data-value={"Teams"} onClick={e => {setPage("Teams"); setUpdateHeaderText(true)}}>
                <p>{t("Teams")}</p>
                <img src={require("../images/teams_wallpaper.jpg")} alt="missing" />
            </div>
            <div data-value={"Races"} onClick={e => {setPage("Races"); setUpdateHeaderText(true)}}>
                <p>{t("Races")}</p>
                <img src={require("../images/races_wallpaper.jpg")} alt="missing" />
            </div>
            <div data-value={"Standings"} onClick={e => {setPage("Standings"); setUpdateHeaderText(true)}}>
                <p>{t("Standings")}</p>
                <img src={require("../images/standings_wallpaper.jpg")} alt="missing" />
            </div>
        </div>
     );
}
 
export default Home;