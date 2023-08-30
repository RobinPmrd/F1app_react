import React from "react";
import {TeamStandingRow, nationalityToFlag } from "../../utils";

interface IProps {
    teamStanding: TeamStandingRow[]
}

function TeamStanding({teamStanding}: IProps) {

    return (
        <table className="standing-table champ">
            <caption>Constructors</caption>
            <tbody>
            {teamStanding.map(row => (
                <tr key={row.position} className={`table-content ${row.name.replace(/ /g,'')}`}>
                    <td>
                        <span className="position">{row.position}</span>
                        <span className="driver-name">{row.name}</span>
                        <span className={`fi fi-${nationalityToFlag[row.nationality]}`}></span>
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