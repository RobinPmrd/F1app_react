import React, { useEffect, useState } from "react"
import { API_URL, Driver, DriverTeamMate, Race, Team, nationalityToFlag } from "../../utils"
import { useTranslation } from "react-i18next";
import RaceReview from "../Races/RaceReview";
import "../../styles/DriverCareer.css"
import RaceInfo from "../Races/RaceInfo";
import TeamBasics from "../Teams/TeamBasics";
import DriverBasics from "./DriverBasics";

interface IProps {
    driver: Driver,
    setShowDriverCareer: React.Dispatch<React.SetStateAction<boolean>>,
    setHeaderText: React.Dispatch<React.SetStateAction<string>>,
    setUpdateHeaderText: React.Dispatch<React.SetStateAction<boolean>>,
    fromPage: string
}

function DriverCareer({driver, setShowDriverCareer, setHeaderText, setUpdateHeaderText, fromPage}: IProps) {
    const[image, setImage] = useState<any>();
    const[wonRaces, setWonRaces] = useState<Race[]>([]);
    const[selectedRace, setSelectedRace] = useState<Race>();
    const[showRace, setShowRace] = useState<boolean>(false);
    const[showWonRaces, setShowWonRaces] = useState<boolean>(false);
    const[careerTeams, setCareerTeams] = useState<Team[]>([]);
    const[showCareerTeams, setShowCareerTeams] = useState<boolean>(false);
    const[teamMates, setTeamMates] = useState<DriverTeamMate[]>([]);
    const[showTeamMates, setShowTeamMates] = useState<boolean>(false);
    const {t} = useTranslation();

    const default_race: Race = {
        circuit: {
            alt: 2,
            circuitRef: "paul_ricard",
            country: "France",
            id: 2,
            lat: 56,
            lng: 45,
            location: "Le Castellet",
            name: "Circuit du Paul Ricard",
            races: 12,
            url: "",
        },
        date: new Date("2021/06/21"),
        id: 1112,
        name: "French Grand Prix",
        round: 12,
        time: "",
        url: "",
        year: 2021
    }


    useEffect(() => {
      setUpdateHeaderText(false);
      setHeaderText(t("CareerOverview"));
    }, [setHeaderText, t, setUpdateHeaderText])

    useEffect(() => {
        fetch(API_URL + "/races/driver/" + driver.id)
            .then(resp => resp.json())
            .then((races: Race[]) => setWonRaces(races.sort((a,b) => a.year - b.year)))
            .catch(() => setWonRaces([default_race]));
        fetch(API_URL + "/constructors/" + driver.id)
            .then(resp => resp.json())
            .then(teams => setCareerTeams(teams))
            .catch(() => setCareerTeams([]));
        fetch(API_URL + "/drivers/teammates/" + driver.id)
            .then(resp => resp.json())
            .then(drivers => setTeamMates(drivers))
            .catch(() => setTeamMates([]));
    }, [driver.id])

    useEffect(() => {
      function fetchImage() {
        let image;
        try {
            image = require(`../../images/drivers/${driver.driverRef}.png`);
        } catch (error) {
            image = require("../../images/drivers/unknown.jpg");
        }
        return image
    }
      const image = fetchImage();
      setImage(image);
      
    }, [driver]);

    function handleOnClick() {
      setUpdateHeaderText(true);
      setShowDriverCareer(false); 
      setHeaderText(t(fromPage));
    }

    return (
        !showRace ? 
        <div className="content">
            <div className="button-container">
                <button onClick={() => handleOnClick()}>X</button>
            </div>
            <div className="driver-season-details">
                <div className="left-container">
                    <img className="driver-avatar" src={image} alt={driver.surname} />
                    <p>
                        {driver.forename + " " + driver.surname}
                        <span className={`fi fi-${nationalityToFlag[driver.nationality]}`}></span>
                    </p>
                </div>
                <div className="middle-container">
                    <p data-label={`${t("Titles")}: `}>{driver.titles}</p>
                    <p data-label={`${t("Wins")}: `}>{driver.wins}</p>
                    <p data-label={`${t("BestRaceFinish")}: `}>{driver.highestRacePosition}</p>
                </div>
                <div className="right-container">
                    <p data-label={"Podiums: "}>{driver.podiums}</p>
                    <p data-label={"Poles: "}>{driver.poles}</p>
                    <p data-label={`${t("BestQualifying")}: `}>{driver.highestGridPosition}</p>
                </div>
            </div>
            <div className="won-races-container">
                <button className="won-races-button" onClick={() => setShowWonRaces(!showWonRaces)}>
                    {t("WonRaces")+ (showWonRaces ? "  -" : "  +")}
                </button>
                {showWonRaces &&
                <div className="wonRaces-container">
                    {
                        wonRaces.map(r => <RaceReview key={r.id} race={r} setSelectedRace={setSelectedRace} setShowRaceResult={setShowRace}/>)
                    }
                </div>}
            </div>
            <div className="won-races-container">
                <button className="won-races-button" onClick={() => setShowCareerTeams(!showCareerTeams)}>
                    {t("Teams")+ (showCareerTeams ? "  -" : "  +")}
                </button>
                {showCareerTeams &&
                <div className="wonRaces-container">
                    {
                        careerTeams.map((t,index) => <TeamBasics key={t.id+" "+index} team={t}/>)
                    }
                </div>}
            </div>
            <div className="won-races-container">
                <button className="won-races-button" onClick={() => setShowTeamMates(!showTeamMates)}>
                    {t("TeamMates")+ (showTeamMates ? "  -" : "  +")}
                </button>
                {showTeamMates &&
                <div className="wonRaces-container">
                    {
                        teamMates.map((t,index) => <DriverBasics key={t.driver.id+" "+index} teamMate={t}/>)
                    }
                </div>}
            </div>
        </div>: 
        <RaceInfo race={selectedRace!} setShowRaceResult={setShowRace} setHeaderText={setHeaderText} setUpdateHeaderText={setUpdateHeaderText} fromPage={t("CareerOverview")}/>
    )
}
export default DriverCareer