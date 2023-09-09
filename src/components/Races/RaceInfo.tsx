import React, { useEffect, useState } from "react"
import { API_URL, Qualifying, Race, Result, countryToFlag, getTranslatedRaceName } from "../../utils"
import RaceResult from "./RaceResult";
import "../../styles/RaceInfo.css"
import QualifyingResult from "./QualifyingResult";
import { useTranslation } from "react-i18next";

interface IProps {
    race: Race,
    setShowRaceResult: React.Dispatch<React.SetStateAction<boolean>>,
    setHeaderText: React.Dispatch<React.SetStateAction<string>>,
    setUpdateHeaderText: React.Dispatch<React.SetStateAction<boolean>>,
    fromPage: string
}

function RaceInfo({race, setShowRaceResult, setHeaderText, setUpdateHeaderText, fromPage}: IProps) {
    const[results, setResults] = useState<Result[]>([]);
    const[qualifying, setQualifying] = useState<Qualifying[]>([]);
    const {t, i18n} = useTranslation();

    useEffect(() => {
        setUpdateHeaderText(false);
        setHeaderText(t("HeaderTextRaceInfo", {raceName: getTranslatedRaceName(race, t), season: race.year}));
        fetch(API_URL + `/results/${race.id}`)
        .then(resp => resp.json())
        .then(results => setResults(results))
        fetch(API_URL + `/qualifying/${race.id}`)
        .then(resp => resp.json())
        .then(qualifying => setQualifying(qualifying))
    }, [setHeaderText, race, t, setUpdateHeaderText])

    function getDateFormat() {
        const d = new Date(race.date);
        if (i18n.language === "fr") return d.toLocaleDateString("fr", {
            year: 'numeric',
            month: 'long', // or 'short', 'numeric', etc.
            day: 'numeric',
          });
        return d.toLocaleDateString("en", {
            year: 'numeric',
            month: 'long', // or 'short', 'numeric', etc.
            day: 'numeric',
          });
    }

    return (
        <div className="content">
            <div className="button-container">
                <button onClick={() => {setShowRaceResult(false); setUpdateHeaderText(true)}}>X</button>
            </div>
            <div className="race-details">
                <p data-label={"Circuit: "}>{race.circuit.name}</p>
                <p data-label={`${t("Location")}: `}>{race.circuit.location + ", "}
                    <span className={`fi fi-${countryToFlag[race.circuit.country]}`}></span>                
                </p>
                <p data-label={"Date: "}>{getDateFormat()}</p>
                <p data-label={"Round: "}>{race.round}</p>
            </div>
            <section className="standings-vertically">
                <RaceResult results={results}/>
                <QualifyingResult  results={qualifying}/>
            </section>
        </div>
    )
}
export default RaceInfo