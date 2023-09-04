import React, { useEffect, useState } from "react"
import { API_URL, DriverStanding, Race, Result, nationalityToFlag } from "../../utils"
import "../../styles/DriverSeason.css"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  import { Line } from 'react-chartjs-2';
import Select2 from "../Customs/Select2";
import { SelectedDriver } from "./Standings";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

interface IProps {
    driver: SelectedDriver,
    otherDriverNames: SelectedDriver[],
    season: number,
    seasonRaces: Race[],
    setShowDriverSeason: React.Dispatch<React.SetStateAction<boolean>>,
    setHeaderText: React.Dispatch<React.SetStateAction<string>>,
    fromPage?: string
}

function DriverSeason({driver, otherDriverNames, season, seasonRaces, setShowDriverSeason, setHeaderText, fromPage}: IProps) {
    const[results, setResults] = useState<Result[]>([]);
    const[driverStandings, setDriverStandings] = useState<DriverStanding[]>([]);
    const[image, setImage] = useState<any>();
    const[graphData, setGraphData] = useState<string>("races");
    const[driversToCompare, setDriversToCompare] = useState<SelectedDriver[]>([]);
    const[driversToCompareResults, setDriversToCompareResults] = useState<Result[][]>([]);
    const[driversToCompareStandings, setDriversToCompareStandings] = useState<DriverStanding[][]>([]);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: getGraphTitle(graphData),
          },
        },
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            reverse: graphData !== "points",
            min: graphData !== "points" ? 1 : 0,
            max: graphData !== "points" ? 20 : undefined,
            title: {
                display: true,
                text: graphData !== "points" ? "Position" : "Points"
            }
          },
          x: {
            title: {
                display: true,
                text: "Round"
            },
          }
        }
    }

    function getGraphTitle(graphData: string): string {
      return graphData !== "points" && graphData !== "standing" ?  `Season ${graphData} results` : `Season ${graphData} evolution`
    }
      
    const data = {
      labels: seasonRaces.map(r => r.round),
      datasets: setData()
    };

    useEffect(() => {
        setHeaderText(`${season} Season`);
    }, [setHeaderText, season])

    useEffect(() => {
        fetch(API_URL+"/results/"+driver.forename+"/"+driver.surname+"/"+season)
            .then(resp => resp.json())
            .then(results => setResults(results));
        fetch(API_URL + "/standings/"+driver.id+"/"+seasonRaces.map(r => r.id))
          .then(resp => resp.json())
          .then(ds => setDriverStandings(ds))
    }, [driver, season, seasonRaces])

    useEffect(() => {
      function fetchImage() {
        let image;
        try {
            image = require(`../../images/drivers/${results[0].driver.driverRef}.png`);
        } catch (error) {
            image = require("../../images/drivers/unknown.jpg");
        }
        return image
    }
      const image = fetchImage();
      setImage(image);
      
    }, [results]);

    function getData(results: Result[], driverStandings: DriverStanding[]): (number | null)[] {
      const newResults = fillResults(results);
      const newDriverResults = fillDriverStanding(driverStandings);
      
      if (graphData === "races") return newResults.map(re => re.positionOrder !== -1 ? re.positionOrder : null);
      else if (graphData === "qualifying") return newResults.map(re => re.grid !== -1 ? re.grid : null);
      else if (graphData === "points") return newDriverResults.map(ds => ds.points !== -1 ? ds.points : null);
      return newDriverResults.map(ds => ds.position !== -1 ? ds.position : null);
    }

    function fillResults(results: Result[]): Result[] {
      const emptyResult: Result = {
        id: 0,
        raceId: 0,
        driver: {
          id: 0,
          driverRef: "",
          number: 0,
          code: 0,
          forename: "",
          surname: "",
          dob: new Date(),
          nationality: "",
          url: "",
          titles: 0,
          grandprix: 0,
          wins: 0,
          podiums: 0,
          poles: 0,
          highestGridPosition: 0,
          highestRacePosition: 0
        },
        constructor: {
          id: 0,
          constructorRef: "",
          name: "",
          nationality: "",
          url: "",
          titles: 0,
          races: 0,
          wins: 0
        },
        number: 0,
        grid: -1,
        position: 0,
        positionText: "",
        positionOrder: -1,
        points: 0,
        laps: 0,
        time: "",
        milliseconds: 0,
        fastestLap: 0,
        rank: 0,
        fastestLapTime: "",
        fastestLapSpeed: "",
        status: {
          id: 0,
          status: ""
        }
      }
      let newResults: Result[] = [...results];
      if (results.length !== 0 && results.length !== seasonRaces.length) {
        const firstResult: Result = results[0]
        for (let index = 0; index < seasonRaces.length; index++) {
          if (seasonRaces[index].id < firstResult.raceId) newResults.unshift(emptyResult);
        }
      }
      return newResults;
    }

    function fillDriverStanding(driverStanding: DriverStanding[]): DriverStanding[] {
      const emptyDriverStanding: DriverStanding = {
        driverStandingsId: 0,
        raceId: 0,
        driverId: 0,
        points: -1,
        position: -1,
        positionText: "",
        wins: 0
      }
      let newDriverStanding: DriverStanding[] = [...driverStanding];
      if (driverStanding.length !== 0 && driverStanding.length !== seasonRaces.length) {
        const firstDriverStanding: DriverStanding = driverStanding[0]
        for (let index = 0; index < seasonRaces.length; index++) {
          if (seasonRaces[index].id < firstDriverStanding.raceId) newDriverStanding.unshift(emptyDriverStanding);
        }
      }
      return newDriverStanding;
    }

    function setData() {
      let data = [{
        label: driver.forename + " " + driver.surname,
        data: getData(results, driverStandings),
        borderColor: results[0] ?  getDriverColor(results[0].constructor.name) : undefined,
        backgroundColor: results[0] ? getDriverColor(results[0].constructor.name): undefined,
      }];
      driversToCompare.forEach((driver, index) => data.push({
        label: driver.forename + " " + driver.surname,
        data: getData(driversToCompareResults[index], driversToCompareStandings[index]),
        borderColor: getDriverColor(driversToCompareResults[index][0].constructor.name),
        backgroundColor: getDriverColor(driversToCompareResults[index][0].constructor.name),
      }))
      return data;
    }

    // Create a function to get the computed color value
    function getDriverColor(teamName: string) {
      const computedStyle = getComputedStyle(document.documentElement);
      return computedStyle.getPropertyValue(`--${teamName.replaceAll(" ", "")}-color`);
    }

    function handleOnClick() {
        setShowDriverSeason(false); 
        if (fromPage) setHeaderText(fromPage);
    }

    async function handleOnChangeSelect(newDriver:  SelectedDriver) {
      await fetch(API_URL+"/results/"+newDriver.forename+"/"+newDriver.surname +"/"+season)
        .then(resp => resp.json())
        .then(re => setDriversToCompareResults([...driversToCompareResults, re]))
      await fetch(API_URL + "/standings/"+newDriver.id+"/"+seasonRaces.map(r => r.id))
        .then(resp => resp.json())
        .then(ds => setDriversToCompareStandings([...driversToCompareStandings, ds]))
      setDriversToCompare([...driversToCompare, newDriver]);
    }

    function handleUnselect(value: SelectedDriver) {
      let dtc = [...driversToCompare];
      dtc.splice(dtc.indexOf(value),1);
      setDriversToCompare([...dtc]);
      let dtcr = [...driversToCompareResults];
      dtcr.splice(dtcr.findIndex(re => re[0].driver.forename + " " + re[0].driver.surname === value.forename + " " +value.surname),1);
      setDriversToCompareResults([...dtcr]);
      let dtcs = [...driversToCompareStandings];
      dtcs.splice(dtcs.findIndex(ds => ds[0].driverId === value.id),1);
      setDriversToCompareStandings([...dtcs]);
    }

    if (results.length === 0 || driverStandings.length === 0) return (
        <div className="loading-spinner"></div>
    )

    return (
        <div className="content">
            <div className="button-container">
                <button onClick={() => handleOnClick()}>X</button>
            </div>
            <div className="driver-season-details">
                <div className="left-container">
                    <img className="driver-avatar" src={image} alt={driver.surname} />
                    <p>
                        {driver.forename + " " + driver.surname}
                        <span className={`fi fi-${nationalityToFlag[results[0].driver.nationality]}`}></span>
                    </p>
                    
                    <p className="team">{results[0].constructor.name}</p>
                </div>
                <div className="middle-container">
                    <p data-label={"Ranking: "}>{driverStandings[driverStandings.length - 1].position}</p>
                    <p data-label={"Best finish: "}>{results.reduce((acc, re) => re.positionOrder < acc.positionOrder ? re : acc).positionOrder}</p>
                    <p data-label={"Points: "}>{driverStandings[driverStandings.length-1].points}</p>
                </div>
                <div className="right-container">
                    <p data-label={"Wins: "}>{results.filter(re => re.positionOrder === 1).length}</p>
                    <p data-label={"Podiums: "}>{results.filter(re => re.positionOrder <= 3).length}</p>
                    <p data-label={"Poles: "}>{results.filter(re => re.grid === 1).length}</p>
                </div>
            </div>
            <div className="graph-container">
              <div className="radio-buttons" onChange={e => setGraphData((e.target as HTMLInputElement).value)}>
                  <div className="label-input-container">
                    <label htmlFor="races">Races</label>
                    <input type="radio" id="races" name="order" value="races" defaultChecked/>
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="qualifying">Qualifying</label>
                    <input type="radio" id="qualifying" name="order" value="qualifying"/>
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="points">Points</label>
                    <input type="radio" id="points" name="order" value="points"/>
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="standing">Standing</label>
                    <input type="radio" id="standing" name="order" value="standing"/>
                  </div>
              </div>
              <div className="line">
                  <Line data={data} options={options}></Line>
              </div>
              <div className="select-container">
                <Select2 data={otherDriverNames} label="Compare with : " onChange={handleOnChangeSelect} onUnselect={handleUnselect}/>
              </div>
            </div>
        </div>
    )
}
export default DriverSeason