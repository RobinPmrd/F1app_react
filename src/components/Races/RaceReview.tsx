import React from "react"
import { Race, countryToFlag } from "../../utils"
import "../../styles/RaceReview.css"

interface IProps {
    race: Race,
    setSelectedRace: React.Dispatch<React.SetStateAction<Race | undefined>>
    setShowRaceResult: React.Dispatch<React.SetStateAction<boolean>>
}

function RaceReview({race, setSelectedRace, setShowRaceResult}: IProps) {
    function onClickRaceReview() {
        setSelectedRace(race);
        setShowRaceResult(true);
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
            <p className="race-name">{race.name}</p>
            <p className="circuit-name">{race.circuit.name}</p>
            <p className="race-year">{race.year}</p>
            <p className="race-round">{race.round}</p>
        </div>
    )
}
export default RaceReview