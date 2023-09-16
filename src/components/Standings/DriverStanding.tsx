import React from "react";
import { Driver, DriverStandingRow, nationalityToFlag } from "../../utils";
import { useTranslation } from "react-i18next";

interface IProps {
    driverStanding: DriverStandingRow[],
    setSelectedDriver: React.Dispatch<React.SetStateAction<Driver | undefined>>,
    setShowDriverSeason: React.Dispatch<React.SetStateAction<boolean>>,
}

function DriverStanding({driverStanding, setSelectedDriver, setShowDriverSeason}: IProps) {

    const {t} = useTranslation();

    function handleOnClick(row: DriverStandingRow) {
        setSelectedDriver(row.driver);
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
                        <span className="driver-name">{row.driver.forename}</span>
                        <span className="driver-surname">{row.driver.surname.replace("\\", "")}</span>
                        <span className={`fi fi-${nationalityToFlag[row.driver.nationality]}`}></span>
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