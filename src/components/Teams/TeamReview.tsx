import React from "react"
import { Team, nationalityToFlag } from "../../utils";
import "../../styles/TeamReview.css"
import { useTranslation } from "react-i18next";

interface IProps {
    team : Team
}

function TeamReview({team} : IProps) {

    const {t} = useTranslation();

    try {
        var images = require(`../../images/teams/${team.constructorRef}.png`);
    } catch (error) {
        images = require("../../images/drivers/unknown.jpg");
    }

    return (
        <div className="team-review">
            <img className="team-logo" src={images} alt={team.name}></img>
            <p className="team-name">{team.name}</p>
            <p data-label={`${t("Nationality")}: `} className="team-nationality">
                <span className={`fi fi-${nationalityToFlag[team.nationality]}`}></span>
            </p>
            <p data-label={`${t("Races")}: `} className="team-races">{team.races}</p>
            <p data-label={`${t("Wins")}: `} className="team-wins">{team.wins}</p>
            <p data-label={`${t("Titles")}: `} className="team-titles">{team.titles}</p>
        </div>
    )
}

export default TeamReview