import React, { useEffect, useState } from "react"
import { API_URL, Qualifying, Race, Result } from "../../utils"
import RaceResult from "./RaceResult";
import "../../styles/RaceInfo.css"
import QualifyingResult from "./QualifyingResult";

interface IProps {
    race: Race,
    setShowRaceResult: React.Dispatch<React.SetStateAction<boolean>>,
    setHeaderText: React.Dispatch<React.SetStateAction<string>>
}

function RaceInfo({race, setShowRaceResult, setHeaderText}: IProps) {
    const[results, setResults] = useState<Result[]>([]);
    const[qualifying, setQualifying] = useState<Qualifying[]>([]);

    useEffect(() => {
        setHeaderText(`${race.year} ${race.name}`);
        fetch(API_URL + `/results/${race.id}`)
        .then(resp => resp.json())
        .then(results => setResults(results))
        fetch(API_URL + `/qualifying/${race.id}`)
        .then(resp => resp.json())
        .then(qualifying => setQualifying(qualifying))
    }, [setHeaderText,race])

    return (
        <div className="content">
            <div className="button-container">
                <button onClick={() => {setShowRaceResult(false); setHeaderText("Races")}}>X</button>
            </div>
            <div className="race-details">
                <p className="circuit">{race.circuit.name}</p>
                <p className="location">{race.circuit.location + ", " + race.circuit.country}</p>
                <p className="date">{race.date.toString()}</p>
                <p className="round">{race.round}</p>
            </div>
            <section className="standings">
                <RaceResult results={results}/>
                <QualifyingResult  results={qualifying}/>
            </section>
        </div>
    )
}
export default RaceInfo