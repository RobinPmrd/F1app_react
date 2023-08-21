import React from 'react';
import "../styles/DriverReview.css"
import { Driver, nationalityToFlag } from "../utils";

interface IProps {
    driver : Driver,
}

function DriverReview({driver} : IProps) {
    try {
        var images = require(`../images/${driver.driverRef}.png`);
    } catch (error) {
        images = require("../images/unknown.jpg");
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
            <p className="driver-nationality">
                <span className={`fi fi-${nationalityToFlag[driver.nationality]}`}></span>
            </p>
            <p className="driver-age">{age()}</p>
            <p className="driver-titles">{driver.titles}</p>
            <p className="driver-races">{driver.grandprix}</p>
        </div>
    )
}

export default DriverReview