import React from "react";
import { DriverStandingRow, nationalityToFlag } from "../../utils";

interface IProps {
    driverStanding: DriverStandingRow[]
}

function DriverStanding({driverStanding}: IProps) {

    return (
        <table className="standing-table champ">
            <caption>Drivers</caption>
            <tbody>
            {driverStanding.map(row => (
                <tr key={row.position} className={`table-content ${row.team.replace(/ /g,'')}`}>
                    <td>
                        <span className="position">{row.position}</span>
                        <span className="driver-name">{row.forename}</span>
                        <span className="driver-surname">{row.surname}</span>
                        <span className={`fi fi-${nationalityToFlag[row.nationality]}`}></span>
                        <span className="team">{row.team}</span>
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
export default DriverStanding