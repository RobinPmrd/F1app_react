import React from 'react';
import "../../styles/DriverReview.css"
import { Driver, nationalityToFlag } from "../../utils";
import { useTranslation } from 'react-i18next';

interface IProps {
    driver : Driver,
}

function DriverReview({driver} : IProps) {
    const {t} = useTranslation();

    try {
        var images = require(`../../images/drivers/${driver.driverRef}.png`);
    } catch (error) {
        images = require("../../images/drivers/unknown.jpg");
    }
    const age = () => {
        let dob = new Date(driver.dob);
        let currentDate = new Date();
        let age = currentDate.getFullYear() - dob.getFullYear();
        age = dob.getMonth() >= currentDate.getMonth() && dob.getDay() > currentDate.getDay() ? age - 1 : age;
        return age;
    }


    return (
        <div className="driver-review">
            <img className="driver-avatar" src={images} alt={driver.surname}></img>
            <p className="driver-name">{`${driver.forename} ${driver.surname}`}</p>
            <p data-label={`${t("Nationality")}: `} className="driver-nationality">
                <span className={`fi fi-${nationalityToFlag[driver.nationality]}`}></span>
            </p>
            <p data-label={`${t("Age")}: `} className="driver-age">{age()}</p>
            <p data-label={`${t("Races")}: `} className="driver-races">{driver.grandprix}</p>
            <p data-label={`${t("Wins")}: `} className="driver-wins">{driver.wins}</p>
            <p data-label={`${t("Titles")}: `} className="driver-titles">{driver.titles}</p>
            <p className='link'><a href={driver.url} target="_blank" rel="noreferrer">{t("GetMore")}</a></p>
        </div>
    )
}

export default DriverReview