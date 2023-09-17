import { useEffect } from "react";
import "../../styles/LoadingSpinner.css"
import {API_URL, Driver, alphabeticOrder} from "../../utils"
import { useState } from "react";
import DriverReview from "./DriverReview";
import DriverForm from './DriversForm';

function Drivers() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [wantedDrivers, setWantedDrivers] = useState<Driver[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    function fetchDrivers() {
        fetch(API_URL + "/drivers")
            .then(resp => resp.json())
            .then((data: Driver[]) => {
                setDrivers(data);
                setWantedDrivers(data.filter(d => d.seasons?.includes("2023")).sort((a,b) => alphabeticOrder(a.surname, b.surname)));
                setIsLoading(false)
            });
    }

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <div className="content">
            <DriverForm drivers={drivers} setWantedDrivers={setWantedDrivers} />
            { isLoading ? (
                <div className="loading-spinner">
                    {/* Add your loading spinner component or animation here */}
                </div>
            ) :
                <section className="reviews">
                    {wantedDrivers.map((driver, index) => 
                        <DriverReview key={driver.id} driver={driver} />
                    )}
                </section>
            }
            </div>
    )
}

export default Drivers