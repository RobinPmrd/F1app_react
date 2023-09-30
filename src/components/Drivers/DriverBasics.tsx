import React from 'react';
import { DriverTeamMate, nationalityToFlag } from "../../utils";
import { useTranslation } from 'react-i18next';

interface IProps {
    teamMate : DriverTeamMate,
    
    onClick?: (teamMate: DriverTeamMate) => void
}

function DriverBasics({teamMate, onClick} : IProps) {
    const {t} = useTranslation();
    const driver = teamMate.driver;
    const period: string = teamMate.max === teamMate.min ? teamMate.max.toString() : `${teamMate.min}-${teamMate.max}`;

    try {
        var images = require(`../../images/drivers/${driver.driverRef}.png`);
    } catch (error) {
        images = require("../../images/drivers/unknown.jpg");
    }

    return (
        <div className="driver-review" onClick={onClick && (() => onClick(teamMate))}>
            <img className="driver-avatar" src={images} alt={driver.surname}></img>
            <p className="team-name-basics">
                {`${driver.forename} ${driver.surname}`}
                <span className={`fi fi-${nationalityToFlag[driver.nationality]}`}></span>
            </p>
            <p className='period'>{period}</p>
        </div>
    )
}

export default DriverBasics