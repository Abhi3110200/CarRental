import { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";

const AddCar = () => {

    const [image, setImage] = useState(null);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: 0,
        pricePerDay: 0,
        description: '',
        category: '',
        seating_capacity: 0,
        fuel_type: '',
        transmission: '',
        location: '',
    })

    const currency = import.meta.env.VITE_CURRENCY;

    const onSubmitHanlder = async (e) => {
        e.preventDefault();
    }
    return (
        <div className="px-4 py-10 md:px-10 flex-1">
            <Title title="Add New Car" subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications." />
            <form onSubmit={onSubmitHanlder} className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">
                <div className="flex items-center gap-2 w-full">
                    <label htmlFor="car-image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="upload" className="h-14 rounded cursor-pointer" />
                        <input type="file" id="car-image" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    </label>
                    <p className="text-sm text-gray-500">Upload a picture of your car</p>
                </div>

                <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col w-full">
                        <label>Brand</label>
                        <input type="text" required placeholder="e.g. Toyota, BMW, Mercedes, Audi..." className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.brand} onChange={(e) => setCar({ ...car, brand: e.target.value })} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label>Model</label>
                        <input type="text" required placeholder="e.g. X5, E-Class, S-Class..." className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col w-full">
                        <label>Year</label>
                        <input type="number" required placeholder="e.g. 2022" className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.year} onChange={(e) => setCar({ ...car, year: e.target.value })} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label>Daily Price ({currency})</label>
                        <input type="number" required placeholder="e.g. 100" className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.pricePerDay} onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label>Category</label>
                        <select required className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.category} onChange={(e) => setCar({ ...car, category: e.target.value })}>
                            <option value="">Select Category</option>
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Convertible">Convertible</option>
                            <option value="Wagon">Wagon</option>
                            <option value=" Coupe"> Coupe</option>
                        </select>
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col w-full">
                        <label>Transmission</label>
                        <select required className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.transmission} onChange={(e) => setCar({ ...car, transmission: e.target.value })}>
                            <option value="">Select Transmission</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                            <option value="Semi-Automatic">Semi-Automatic</option>
                        </select>
                    </div>
                <div className="flex flex-col w-full">
                        <label>Fuel Type</label>
                        <select required className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.fuel_type} onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}>
                            <option value="">Select Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full">
                        <label>Seating Capacity</label>
                        <input type="number" required placeholder="e.g. 5" className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.seating_capacity} onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })} />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label>Location</label>
                    <select required className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.location} onChange={(e) => setCar({ ...car, location: e.target.value })}>
                        <option value="">Select Location</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Houston">Houston</option>
                        <option value="Phoenix">Phoenix</option>
                        <option value="Philadelphia">Philadelphia</option>
                        <option value="San Antonio">San Antonio</option>
                    </select>
                </div>

                <div className="flex flex-col w-full">
                    <label>Description</label>
                    <textarea required rows={5} placeholder="e.g. Description" className="mt-1 py-2 px-3 border border-borderColor rounded-md outline-none" value={car.description} onChange={(e) => setCar({ ...car, description: e.target.value })}></textarea>
                </div>

                <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-lg font-medium w-max cursor-pointer">
                    <img src={assets.tick_icon} alt="submit" />
                    List Your Car
                </button>
            </form>
        </div>
    )
}

export default AddCar
