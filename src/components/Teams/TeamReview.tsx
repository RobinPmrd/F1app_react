import React from "react"
import { Team, nationalityToFlag } from "../../utils";
import "../../styles/TeamReview.css"

interface IProps {
    team : Team
}

function TeamReview({team} : IProps) {

    try {
        var images = require(`../../images/teams/${team.constructorRef}.png`);
    } catch (error) {
        images = require("../../images/drivers/unknown.jpg");
    }

    return (
        <div className="team-review">
            <img className="team-logo" src={images} alt={team.name}></img>
            <p className="team-name">{team.name}</p>
            <p className="team-nationality">
                <span className={`fi fi-${nationalityToFlag[team.nationality]}`}></span>
            </p>
            <p className="team-races">{team.races}</p>
            <p className="team-wins">{team.wins}</p>
            <p className="team-titles">{team.titles}</p>
        </div>
    )
}

export default TeamReview