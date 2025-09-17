import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { assets, dummyCarData } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {

    const {cars,currency, pickupDate, returnDate, axios, setPickupDate, setReturnDate} = useAppContext();

    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setCar(cars.find((car) => car._id === id))
        }, 2000)
    }, [cars,id]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("/api/booking/create", {
                car:car._id,
                pickupDate,
                returnDate,
            })
            console.log(data.message);
            if(data.success){
                toast.success(data.message)
                navigate("/my-bookings")
            }else{
                console.log(data.message);
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return car ? (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
            <button onClick={() => {
                navigate(-1)
            }} className="flex  items-center gap-2 mb-6 text-gray-500 cursor-pointer">
                <img src={assets.arrow_icon} alt="arrow" className="rotate-180 opacity-55" />
                Back to all cars
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2">
                    <img src={car.image} alt="car" className="w-full h-auto object-cover md:max-h-100 rounded-xl mb-6 shadow-md" />
                    <div>
                        <div>
                            <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
                            <p className="text-gray-500 text-lg">{car.category} • {car.year}</p>
                        </div>
                        <hr className="border border-borderColor my-6" />

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">{[
                            { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                            { icon: assets.fuel_icon, text: `${car.fuel_type}` },
                            { icon: assets.car_icon, text: `${car.transmission}` },
                            { icon: assets.location_icon, text: `${car.location}` },
                        ].map(({ icon, text }) => (
                            <div key={text} className="flex items-center flex-col items-center bg-light p-4 rounded-lg">
                                <img src={icon} alt="icon" className="h-5 mb-2" />
                                {text}
                            </div>
                        ))}
                        </div>

                        <div>
                            <h1 className="text-xl font-medium mb-3">Description</h1>
                            <p className="text-gray-500">{car.description}</p>
                        </div>

                        <div className="mt-6">
                            <h1 className="text-xl font-medium mb-3">Features</h1>
                            <ul className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                                {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item)=>(
                                    <li key={item} className="flex items-center gap-2">
                                        <img src={assets.check_icon} alt="check" className="h-4 mr-2"/>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500">
                        <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">{currency}{car.pricePerDay}<span className="text-base font-normal text-gray-400">per day</span></p>

                        <hr className="border border-borderColor my-6"/>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="pickup-date">Pickup Date</label>
                            <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} type="date" required id="pickup-date" min={new Date().toISOString().split("T")[0]} className=" border border-borderColor rounded-lg px-3 py-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="return-date">Return Date</label>
                            <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" required id="return-date" className=" border border-borderColor rounded-lg px-3 py-2" />
                        </div>

                        <button className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer">Book Now</button>

                        <p className="text-center text-sm">No Credit card required to reverse</p>
                </form>
            </div>
        </div>
    ) : (
        <Loader/>
    )
}

export default CarDetails
