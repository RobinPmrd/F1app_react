import React, { useEffect, useState } from "react";
import { API_URL, Driver, DriverStandingRow, Race, Team, TeamStandingRow } from "../../utils";
import DriverStanding from "./DriverStanding";
import StandingForm from "./StandingForm";
import "../../styles/Standings.css"
import TeamStanding from "./TeamStanding";
import RaceInfo from "../Races/RaceInfo";
import DriverSeason from "./DriverSeason";
import TeamSeason from "./TeamSeason";
import { useTranslation } from "react-i18next";


interface IProps {
    setHeaderText: React.Dispatch<React.SetStateAction<string>>,
    setUpdateHeaderText: React.Dispatch<React.SetStateAction<boolean>>
}

function Standings({setHeaderText, setUpdateHeaderText}: IProps) {
    const [driverStanding, setDriverStanding] = useState<DriverStandingRow[]>([]);
    const [teamStanding, setTeamStanding] = useState<TeamStandingRow[]>([]);
    const [showRaceResult, setShowRaceResult] = useState<boolean>(false);
    const [showDriverSeason, setShowDriverSeason] = useState<boolean>(false);
    const [showTeamSeason, setShowTeamSeason] = useState<boolean>(false);
    const [selectedSeason, setSelectedSeason] = useState<number>(2023);
    const [selectedRace, setSelectedRace] = useState<Race>();
    const [seasonRaces, setSeasonRaces] = useState<Race[]>([]);
    const [selectedDriver, setselectedDriver] = useState<Driver>();
    const [selectedTeam, setSelectedTeam] = useState<Team>();
    const [selectedTeamDrivers, setSelectedTeamDrivers] = useState<Driver[]>([]);
    const {t} = useTranslation();


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
        fetch(API_URL+"/standings/drivers/"+selectedSeason+(selectedRace === undefined ? "": "/"+selectedRace.id))
            .then(resp => resp.json())
            .then(ds => setDriverStanding(ds))
        fetch(API_URL+"/standings/constructors/"+selectedSeason+(selectedRace=== undefined ? "":"/"+selectedRace.id))
            .then(resp => resp.json())
            .then(ts => setTeamStanding(ts))
    }, [selectedRace, selectedSeason])

    useEffect(() => {
      if (selectedTeam) {
        const teamDrivers = driverStanding.filter(ds => ds.team === selectedTeam?.name).map(ds => ds.driver) 
        setSelectedTeamDrivers(teamDrivers); 
        setShowTeamSeason(true);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTeam])



    function getOtherDrivers(): Driver[] {
        return driverStanding.filter(ds => ds.driver.id !== selectedDriver?.id).map(ds => ds.driver);
    }

    function getOtherTeams(): Team[] {
        return teamStanding.filter(ts => ts.constructor.name !== selectedTeam?.name).map(ts => ts.constructor);
    }

    return (
        <div className="content">
            {showRaceResult ?
            <RaceInfo race={selectedRace!} setShowRaceResult={setShowRaceResult} setHeaderText={setHeaderText} fromPage="Standings" setUpdateHeaderText={setUpdateHeaderText}/>
            : showDriverSeason ?
            <DriverSeason driver={selectedDriver!} season={selectedSeason} seasonRaces={seasonRaces.sort((r1, r2) => r1.round - r2.round)} setHeaderText={setHeaderText} setUpdateHeadertext={setUpdateHeaderText} setShowDriverSeason={setShowDriverSeason} otherDriverNames={getOtherDrivers()} fromPage="Standings"/>
            : showTeamSeason ?
            <TeamSeason team={selectedTeam!} teamDrivers={selectedTeamDrivers} season={selectedSeason} seasonRaces={seasonRaces.sort((r1, r2) => r1.round - r2.round)} setHeaderText={setHeaderText} setUpdateHeadertext={setUpdateHeaderText} setShowTeamSeason={setShowTeamSeason} otherTeamNames={getOtherTeams()} fromPage="Standings"/> :
            <div>
                <StandingForm setSelectedRace={setSelectedRace} setSelectedSeason={setSelectedSeason} selectedRace={selectedRace} selectedSeason={selectedSeason} seasonRaces={seasonRaces}/>
            {selectedRace &&
                <div className="but-container">
                    <button className="view-race" onClick={() => setShowRaceResult(true)}>{t("ViewRaceDetails")}</button>
                </div>
            }
                <div className="standings-horizontally">
                    <DriverStanding driverStanding={driverStanding} setSelectedDriver={setselectedDriver} setShowDriverSeason={setShowDriverSeason}/>
                    <TeamStanding teamStanding={teamStanding} setSelectedTeam={setSelectedTeam}/>
                </div>
            </div>
            }
        </div>
    )
}
export default Standings