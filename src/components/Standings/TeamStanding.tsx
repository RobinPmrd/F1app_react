import React from "react";
import {Team, TeamStandingRow, nationalityToFlag } from "../../utils";
import { useTranslation } from "react-i18next";

interface IProps {
    teamStanding: TeamStandingRow[],
    setSelectedTeam: React.Dispatch<React.SetStateAction<Team | undefined>>,
}

function TeamStanding({teamStanding, setSelectedTeam,}: IProps) {

    const {t} = useTranslation();

    function handleOnClick(row: TeamStandingRow) {
        setSelectedTeam(row.constructor);
    }

    return (
        <table className="standing-table champ">
            <caption>{t("Constructors")}</caption>
            <tbody>
            {teamStanding.map(row => (
                <tr key={row.position} className={`table-content ${row.constructor.name.replace(/ /g,'')}`} onClick={() => handleOnClick(row)} >
                    <td>
                        <span className="position">{row.position}</span>
                        <span className="driver-name">{row.constructor.name}</span>
                        <span className={`fi fi-${nationalityToFlag[row.constructor.nationality]}`}></span>
                    </td>
                    <td>
                        <span className="points">{row.points} PTS</span>
                        <i className="fas fa-chevron-right"></i>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default TeamStanding