import { useEffect } from "react";
import "../../styles/LoadingSpinner.css"
import {API_URL, Driver, alphabeticOrder} from "../../utils"
import { useState } from "react";
import DriverReview from "./DriverReview";
import DriverForm from './DriversForm';
import DriverCareer from "./DriverCareer";

interface IProps {
    setHeaderText: React.Dispatch<React.SetStateAction<string>>,
    setUpdateHeaderText: React.Dispatch<React.SetStateAction<boolean>>,
}

function Drivers({setHeaderText, setUpdateHeaderText}: IProps) {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [wantedDrivers, setWantedDrivers] = useState<Driver[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showDriverCareer, setShowDriverCareer] = useState<boolean>(false);
    const [selectedDriver, setSelectedDriver] = useState<Driver>();

    function fetchDrivers() {
        fetch(API_URL + "/drivers")
            .then(resp => resp.json())
            .then((data: Driver[]) => {
                setDrivers(data);
                setWantedDrivers(data.filter(d => d.seasons?.includes("2023")).sort((a,b) => alphabeticOrder(a.surname, b.surname)));
                setIsLoading(false)
            })
            .catch((e) => {
                console.log(e);
                
                setDrivers([{
                    code: 14,
                    dob: new Date("1981/04/03"),
                    driverRef: "alonso",
                    forename: "Fernando",
                    surname: "Alonso",
                    grandprix: 381,
                    highestGridPosition: 1,
                    highestRacePosition: 1,
                    id: 4,
                    nationality: "Spanish",
                    number: 14,
                    podiums: 99,
                    poles: 23,
                    titles: 2,
                    url: "",
                    wins: 32,
                }])
                setWantedDrivers([{
                    code: 14,
                    dob: new Date("1981/04/03"),
                    driverRef: "alonso",
                    forename: "Fernando",
                    surname: "Alonso",
                    grandprix: 381,
                    highestGridPosition: 1,
                    highestRacePosition: 1,
                    id: 4,
                    nationality: "Spanish",
                    number: 14,
                    podiums: 99,
                    poles: 23,
                    titles: 2,
                    url: "",
                    wins: 32,
                }])
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchDrivers();
        return () => localStorage.clear();
    }, []);

    function handleOnClickDriverReview(driver: Driver): void {
        setSelectedDriver(driver);
        setShowDriverCareer(true);
    }

    return (
        <div className="content">
            {!showDriverCareer ?
            <div>
                <DriverForm drivers={drivers} setWantedDrivers={setWantedDrivers} />
            { isLoading ? (
                <div className="loading-spinner">
                    {/* Add your loading spinner component or animation here */}
                </div>
            ) :
                <section className="reviews">
                    {wantedDrivers.map((driver, index) => 
                        <DriverReview key={driver.id} driver={driver} onClick={handleOnClickDriverReview}/>
                    )}
                </section>
            }
            </div>
             : 
            <DriverCareer driver={selectedDriver!} setShowDriverCareer={setShowDriverCareer} setHeaderText={setHeaderText} setUpdateHeaderText={setUpdateHeaderText} fromPage="Drivers"/>
            }
        </div>
    )
}

export default Drivers