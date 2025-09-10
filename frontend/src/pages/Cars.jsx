import Title from "../components/Title";
import { assets, dummyCarData } from "../assets/assets";
import { useState } from "react";
import CarCard from "../components/CarCard";

const Cars = () => {

    const [input, setInput] = useState("");

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
                <p>Showing {dummyCarData.length} Cars</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
                    {dummyCarData.map((car, index) => (
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
