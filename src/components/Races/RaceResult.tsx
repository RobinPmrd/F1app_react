import React from "react"
import { Result, nationalityToFlag } from "../../utils"

interface IProps {
    results: Result[]
}

function RaceResult({results}: IProps) {

    return (
        <table className="standing-table race" id="race">
            <caption>Race</caption>
            <thead>
                <tr className="table-content">
                    <th></th>
                    <th>Time</th>
                    <th>Laps</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
            {results.map(row => (
                <tr key={row.id} className={`table-content ${row.constructor.name.replace(/ /g,'')}`}>
                    <td>
                        <span className="position">{row.positionOrder}</span>
                        <span className="driver-name">{row.driver.forename}</span>
                        <span className="driver-surname">{row.driver.surname}</span>
                        <span className={`fi fi-${nationalityToFlag[row.driver.nationality]}`}></span>
                        <span className="team">{row.constructor.name}</span>
                    </td>
                    <td>
                        <span className="points">{row.time != null ? `${row.time}` : row.status.status}</span>
                        <i className="fas fa-chevron-right"></i>
                    </td>
                    <td><span className="points">{row.laps}</span></td>
                    <td><span className="points">{row.points}</span></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default RaceResult