import React from "react"
import { Team } from "../../utils";
import "../../styles/TeamBasics.css"

interface IProps {
    team : Team
}

function TeamBasics({team} : IProps) {

    try {
        var images = require(`../../images/teams/${team.constructorRef}.png`);
    } catch (error) {
        images = require("../../images/drivers/unknown.jpg");
    }

    return (
        <div className="team-review">
            <img className="team-logo" src={images} alt={team.name}></img>
            <p className="team-name-basics">
                {team.name}
            </p>
            <p className="period">{team.driverSeasonPeriod}</p>
        </div>
    )
}

export default TeamBasics