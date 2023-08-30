import React, { useEffect, useState } from "react";
import { API_URL, DriverStandingRow, Race, TeamStandingRow } from "../../utils";
import DriverStanding from "./DriverStanding";
import StandingForm from "./StandingForm";
import "../../styles/Standings.css"
import TeamStanding from "./TeamStanding";
import RaceInfo from "../Races/RaceInfo";

interface IProps {
    setHeaderText: React.Dispatch<React.SetStateAction<string>>
}

function Standings({setHeaderText}: IProps) {
    const [driverStanding, setDriverStanding] = useState<DriverStandingRow[]>([]);
    const [teamStanding, setTeamStanding] = useState<TeamStandingRow[]>([]);
    const [showRaceResult, setShowRaceResult] = useState<boolean>(false);
    const [selectedSeason, setSelectedSeason] = useState<number>(2023);
    const [selectedRace, setSelectedRace] = useState<Race>();
    const [seasonRaces, setSeasonRaces] = useState<Race[]>([]);

    useEffect(() => {
        fetch(API_URL+"/standings/drivers/2023")
        .then(resp => resp.json())
        .then(ds => setDriverStanding(ds));
        fetch(API_URL+"/standings/constructors/2023")
        .then(resp => resp.json())
        .then(ts => setTeamStanding(ts));
    }, [])

    useEffect(() => {
        setSelectedRace(undefined);
        fetch(API_URL+"/races/"+selectedSeason)
            .then(resp => resp.json())
            .then(races => setSeasonRaces(races));
    }, [selectedSeason]);

    useEffect(() => {
        fetch(API_URL+"/standings/drivers/"+selectedSeason+(selectedRace === undefined ? "": "/"+selectedRace.name))
            .then(resp => resp.json())
            .then(ds => setDriverStanding(ds))
        fetch(API_URL+"/standings/constructors/"+selectedSeason+(selectedRace=== undefined ? "":"/"+selectedRace.name))
            .then(resp => resp.json())
            .then(ts => setTeamStanding(ts))
    }, [selectedRace, selectedSeason])

    return (
        <div className="content">
            {!showRaceResult ?
            <div>
                <StandingForm setSelectedRace={setSelectedRace} setSelectedSeason={setSelectedSeason} selectedRace={selectedRace} selectedSeason={selectedSeason} seasonRaces={seasonRaces}/>
                {
                    selectedRace &&
                    <div className="but-container">
                    <button className="view-race" onClick={() => setShowRaceResult(true)}>View Race</button>
                    </div>
                }
                <div className="standings-horizontally">
                    <DriverStanding driverStanding={driverStanding}/>
                    <TeamStanding teamStanding={teamStanding}/>
                </div>
            </div> :
            <RaceInfo race={selectedRace!} setShowRaceResult={setShowRaceResult} setHeaderText={setHeaderText}/>
            }
        </div>
    )
}
export default Standings