import React from "react"
import { Race, countryToFlag, getTranslatedRaceName } from "../../utils"
import "../../styles/RaceReview.css"
import { useTranslation } from "react-i18next"

interface IProps {
    race: Race,
    setSelectedRace?: React.Dispatch<React.SetStateAction<Race | undefined>>
    setShowRaceResult?: React.Dispatch<React.SetStateAction<boolean>>
}

function RaceReview({race, setSelectedRace, setShowRaceResult}: IProps) {
    const {t} = useTranslation();
    
    function onClickRaceReview() {
        if (setSelectedRace) setSelectedRace(race);
        if (setShowRaceResult) setShowRaceResult(true);
    }

    return (
        <div className="race-review" onClick={() => onClickRaceReview()}>
            <p className="cricuit-country">
            {race.name === "San Marino Grand Prix" ?
                <span className={`fi fi-sm`}></span> : race.name === "European Grand Prix" ?
                <span className={`fi fi-eu`}></span> :
                <span className={`fi fi-${countryToFlag[race.circuit.country]}`}></span>
            }
            </p>
            <p className="race-name">{getTranslatedRaceName(race, t)}</p>
            <p data-label="Circuit: " className="circuit-name">{race.circuit.name}</p>
            <p data-label={`${t("Year")}: `} className="race-year">{race.year}</p>
            <p data-label="Round: " className="race-round">{race.round}</p>
        </div>
    )
}
export default RaceReview