import React, { useEffect, useState } from "react"
import { API_URL, Driver, DriverStanding, Race, Result, nationalityToFlag } from "../../utils"
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
import { useTranslation } from "react-i18next";
  
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
    driver: Driver,
    otherDriverNames: Driver[],
    season: number,
    seasonRaces: Race[],
    setShowDriverSeason: React.Dispatch<React.SetStateAction<boolean>>,
    setHeaderText: React.Dispatch<React.SetStateAction<string>>,
    setUpdateHeadertext: React.Dispatch<React.SetStateAction<boolean>>,
    fromPage: string
}

function DriverSeason({driver, otherDriverNames, season, seasonRaces, setShowDriverSeason, setHeaderText, setUpdateHeadertext, fromPage}: IProps) {
    const[image, setImage] = useState<any>();
    const[graphData, setGraphData] = useState<string>("races");
    const[driversResults, setDriversResults] = useState<Result[][]>([]);
    const[driversStandings, setDriversStandings] = useState<DriverStanding[][]>([]);
    const {t} = useTranslation();

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
            max: graphData === "points" ? undefined : graphData === "standing" ? otherDriverNames.length + 1 : 24,
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
      return graphData !== "points" && graphData !== "standing" ? t("GraphTitle1", {graphData: t(graphData.charAt(0).toUpperCase()+graphData.slice(1)).toLowerCase()})  : graphData === "points" ? t("GraphTitle2") : t("GraphTitle3") 
    }
      
  const data = {
      labels: seasonRaces.map(r => r.round),
      datasets: driversResults.map((result, index) => {
        return {label: result[0].driver.forename + " " + result[0].driver.surname,
        data: getData(result, driversStandings[index]),
        borderColor: getDriverColor(result[0].constructor.name),
        backgroundColor: getDriverColor(result[0].constructor.name)}
      })
  };

    useEffect(() => {
      setUpdateHeadertext(false);
      setHeaderText(t("HeaderTextDriverSeason", {season: season}));
    }, [setHeaderText, season, t, setUpdateHeadertext])

    useEffect(() => {
        fetch(API_URL+"/results/"+driver.id+"/"+season)
            .then(resp => resp.json())
            .then(results => setDriversResults([results]));
        fetch(API_URL + "/standings/"+driver.id+"/"+seasonRaces.map(r => r.id))
          .then(resp => resp.json())
          .then(ds => {
            ds.sort((ds1: any, ds2:any) => seasonRaces.find(r => r.id === ds1.raceId)!.round - seasonRaces.find(r => r.id === ds2.raceId)!.round);
            setDriversStandings([ds])})
    }, [driver, season, seasonRaces])

    useEffect(() => {
      function fetchImage() {
        let image;
        try {
            image = require(`../../images/drivers/${driversResults[0][0].driver.driverRef}.png`);
        } catch (error) {
            image = require("../../images/drivers/unknown.jpg");
        }
        return image
    }
      const image = fetchImage();
      setImage(image);
      
    }, [driversResults]);

    function getData(results: Result[], driverStandings: DriverStanding[]): (number | null)[] {
      
      const newResults: Result[] = fillData(results);
      const newDriverResults: DriverStanding[] = fillData(driverStandings);
      
      if (graphData === "races") return newResults.map(re => re.positionOrder !== -1 ? re.positionOrder : null);
      else if (graphData === "qualifying") return newResults.map(re => re.grid !== -1 ? re.grid : null);
      else if (graphData === "points") return newDriverResults.map(ds => ds.points !== -1 ? ds.points : null);
      return newDriverResults.map(ds => ds.position !== -1 ? ds.position : null);
    }

    function fillData(data: Result[] | DriverStanding[]): any {
      if (data !== undefined) {
        var newResults: (Result | DriverStanding)[] = [...data];
        if (data.length !== 0 && data.length !== seasonRaces.length) {
          var emptyResult: Result | DriverStanding;
          if ("grid" in data[0]) emptyResult= {
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
          else emptyResult = {
              driverStandingsId: 0,
              raceId: 0,
              driverId: 0,
              points: -1,
              position: -1,
              positionText: "",
              wins: 0
            }
              const firstResult: Result | DriverStanding = data[0]
              for (let index = 0; index < seasonRaces.length; index++) {
              if (seasonRaces[index].id < firstResult.raceId) newResults.unshift(emptyResult);
              }
        }
      }
      else newResults = []
      return newResults;
  }

    // Create a function to get the computed color value
    function getDriverColor(teamName: string) {
      const computedStyle = getComputedStyle(document.documentElement);
      return computedStyle.getPropertyValue(`--${teamName.replaceAll(" ", "")}-color`);
    }

    function handleOnClick() {
      setUpdateHeadertext(true);
      setShowDriverSeason(false); 
      setHeaderText(t(fromPage));
    }

    async function handleOnChangeSelect(newDriver:  Driver) {
      await fetch(API_URL+"/results/"+newDriver.id+"/"+season)
        .then(resp => resp.json())
        .then(re => setDriversResults([...driversResults, re]))
      await fetch(API_URL + "/standings/"+newDriver.id+"/"+seasonRaces.map(r => r.id))
        .then(resp => resp.json())
        .then(ds => setDriversStandings([...driversStandings, ds]))
    }

    function handleUnselect(value: Driver) {
      let dtcr = [...driversResults];
      dtcr.splice(dtcr.findIndex(re => re[0].driver.id === value.id),1);
      setDriversResults([...dtcr]);
      let dtcs = [...driversStandings];
      dtcs.splice(dtcs.findIndex(ds => ds[0].driverId === value.id),1);
      setDriversStandings([...dtcs]);
    }

    if (driversResults[0] === undefined || driversStandings[0] === undefined) return (
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
                        <span className={`fi fi-${nationalityToFlag[driversResults[0][0].driver.nationality]}`}></span>
                    </p>
                    
                    <p className="team">{driversResults[0][0].constructor.name}</p>
                </div>
                <div className="middle-container">
                    <p data-label={`${t("Ranking")}: `}>{driversStandings[0][driversStandings[0].length - 1].position}</p>
                    <p data-label={`${t("BestFinish")}: `}>{driversResults[0].reduce((acc, re) => re.positionOrder < acc.positionOrder ? re : acc).positionOrder}</p>
                    <p data-label={"Points: "}>{driversStandings[0][driversStandings[0].length-1].points}</p>
                </div>
                <div className="right-container">
                    <p data-label={`${t("Wins")}: `}>{driversResults[0].filter(re => re.positionOrder === 1).length}</p>
                    <p data-label={"Podiums: "}>{driversResults[0].filter(re => re.positionOrder <= 3).length}</p>
                    <p data-label={"Poles: "}>{driversResults[0].filter(re => re.grid === 1).length}</p>
                </div>
            </div>
            <div className="graph-container">
              <div className="radio-buttons" onChange={e => setGraphData((e.target as HTMLInputElement).value)}>
                  <div className="label-input-container">
                    <label htmlFor="races">{t("Races")}</label>
                    <input type="radio" id="races" name="order" value="races" defaultChecked/>
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="qualifying">{t("Qualifying")}</label>
                    <input type="radio" id="qualifying" name="order" value="qualifying"/>
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="points">Points</label>
                    <input type="radio" id="points" name="order" value="points"/>
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="standing">{t("Standing")}</label>
                    <input type="radio" id="standing" name="order" value="standing"/>
                  </div>
              </div>
              <div className="line">
                  <Line data={data} options={options}></Line>
              </div>
              <div className="select-container">
                <Select2 data={otherDriverNames} label={`${t("CompareWith")} :`} onChange={handleOnChangeSelect} onUnselect={handleUnselect}/>
              </div>
            </div>
        </div>
    )
}
export default DriverSeason