import Title from "../components/Title";
import { assets, dummyCarData } from "../assets/assets";
import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Cars = () => {

    const [searchParams] = useSearchParams();
    const pickupLocation = searchParams.get("pickupLocation");
    const pickupDate = searchParams.get("pickupDate");
    const returnDate = searchParams.get("returnDate");

    const { cars, axios } = useAppContext();

    const [input, setInput] = useState("");

    const isSearchData = pickupLocation && pickupDate && returnDate;

    const [filteredCars, setFilteredCars] = useState([]);

    const applyFilter = async () => {
        if (input === '') {
            setFilteredCars(cars);
            return null;
        }

        const filtered = cars.slice().filter((car) => car.brand.toLowerCase().includes(input.toLowerCase()) || car.model.toLowerCase().includes(input.toLowerCase()) || car.category.toLowerCase().includes(input.toLowerCase()) || car.transmission.toLowerCase().includes(input.toLowerCase()));
        setFilteredCars(filtered);
    }



    const searchCarAvailability = async () => {
        const { data } = await axios.post("/api/booking/check-availability", {
            location: pickupLocation,
            pickupDate,
            returnDate
        });
        console.log(data);
        if (data.success) {
            setFilteredCars(data.availableCars);
            if (data.availableCars.length === 0) {
                toast("No cars available for the given date and location");
            }
            return null;
        }
    }

    useEffect(() => {
        isSearchData && searchCarAvailability();
    }, [isSearchData]);

    useEffect(() => {
        cars.length > 0 && !isSearchData && applyFilter();
    }, [input, cars]);

    return (
        <div>
            <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
                <Title title="Available Cars" subTitle="Browser our selection of premium vehicle available for your next adventure." />

                <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
                    <img src={assets.search_icon} alt="search" className="w-4.5 h-4.5 mr-3" />
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Search by make, model, or features" className="w-full h-full outline-none text-gray-500" />
                    <img src={assets.filter_icon} alt="filter" className="w-4.5 h-4.5 ml-2" />
                </div>
            </div>
            <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10 max-w-7xl mx-auto">
                <p>Showing {filteredCars.length} Cars</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
                    {filteredCars.map((car, index) => (
                        <div key={index}>
                            <CarCard car={car} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Cars
