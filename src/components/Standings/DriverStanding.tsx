import React from "react";
import { DriverStandingRow, nationalityToFlag } from "../../utils";
import { SelectedDriver } from "./Standings";
import { useTranslation } from "react-i18next";

interface IProps {
    driverStanding: DriverStandingRow[],
    setSelectedDriver: React.Dispatch<React.SetStateAction<SelectedDriver | undefined>>,
    setShowDriverSeason: React.Dispatch<React.SetStateAction<boolean>>,
}

function DriverStanding({driverStanding, setSelectedDriver, setShowDriverSeason}: IProps) {

    const {t} = useTranslation();

    function handleOnClick(row: DriverStandingRow) {
        setSelectedDriver({
            id: row.driverId,
            forename: row.forename,
            surname: row.surname
        });
        setShowDriverSeason(true);
    }

    return (
        <table className="standing-table champ">
            <caption>{t("Drivers")}</caption>
            <tbody>
            {driverStanding.map(row => (
                <tr key={row.position} className={`table-content ${row.team.replace(/ /g,'')}`} onClick={() => handleOnClick(row)}>
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