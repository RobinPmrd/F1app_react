import React, { useEffect, useState } from "react";
import RacesForm from "./RacesForm";
import { API_URL, Race } from "../../utils";
import RaceReview from "./RaceReview";
import RaceInfo from "./RaceInfo";

interface IProps {
    setHeaderText: React.Dispatch<React.SetStateAction<string>>
}

function Races({setHeaderText}: IProps) {
    const [races, setRaces] = useState<Race[]>([]);
    const [wantedRaces, setWantedRaces] = useState<Race[]>([]);
    const [showRaceResult, setShowRaceResult] = useState<boolean>(false);
    const [selectedRace, setSelectedRace] = useState<Race>();

    useEffect(() => {
        fetch(API_URL + "/races")
        .then(resp => resp.json())
        .then((races: Race[]) => {
            setRaces(races);
            setWantedRaces(races.filter(r => r.year === 2023));
        });
    }, [])


    return (
        <div className="content">
            {!showRaceResult ?
            <div>
                <RacesForm races={races} wantedRaces={wantedRaces} setWantedRaces={setWantedRaces}/>
                <section className="reviews">
                    {wantedRaces.map(race => (
                            <RaceReview key={race.id} race={race} setSelectedRace={setSelectedRace!} setShowRaceResult={setShowRaceResult}/>
                    ))}
                </section>
            </div> :
                <RaceInfo race={selectedRace!} setShowRaceResult={setShowRaceResult} setHeaderText={setHeaderText} fromPage="Races"/>
            }
        </div>
    )
}

export default Races