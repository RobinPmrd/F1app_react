import React from "react"
import { Qualifying, nationalityToFlag } from "../../utils"
import { useTranslation } from "react-i18next"

interface IProps {
    results: Qualifying[]
}

function QualifyingResult({results}: IProps) {
    const {t} = useTranslation();

    return (
        <table className="standing-table race" id="race">
            <caption>{t("Qualifying")}</caption>
            <thead>
                <tr className="table-content">
                    <th></th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                </tr>
            </thead>
            <tbody>
            {results.map(row => (
                <tr key={row.id} className={`table-content ${row.constructor.name.replace(/ /g,'')}`}>
                    <td className="left">
                        <span className="position">{row.position}</span>
                        <span className="driver-name">{row.driver.forename}</span>
                        <span className="driver-surname">{row.driver.surname}</span>
                        <span className={`fi fi-${nationalityToFlag[row.driver.nationality]}`}></span>
                        <span className="team">{row.constructor.name}</span>
                    </td>
                    <td>
                        <span className="points">{row.q1}</span>
                        <i className="fas fa-chevron-right"></i>
                    </td>
                    <td><span className="points">{row.q2}</span></td>
                    <td><span className="points">{row.q3}</span></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default QualifyingResult