import { useEffect, useState } from "react";
import { format } from 'date-fns';
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const ManageBookings = () =>{

    const [bookings, setBookings] = useState([]);
    const {currency,axios} = useAppContext();

    const fetchOwnerBookings = async()=>{
        try {
            const {data} = await axios.get("/api/booking/owner");
            if(data.success){
                setBookings(data.bookings)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const changeBookingStatus = async(bookingId,status)=>{
        try {
            const {data} = await axios.post("/api/booking/change-status",{
                bookingId,
                status
            })
            if(data.success){
                toast.success(data.message)
                fetchOwnerBookings()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchOwnerBookings()
    },[])
    return (
        <div className="px-4 pt-10 md:px-10 w-full">
            <Title title="Manage Bookings" subtitle="Manage your bookings"/>

            <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
                
                <table className="w-full border-collapse text-left">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Car</th>
                            <th className="p-3 font-medium max-md:hidden">Date Range</th>
                            <th className="p-3 font-medium">Total</th>
                            <th className="p-3 font-medium max-md:hidden">Payment</th>
                            <th className="p-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-3 text-center">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking,index)=>(
                            <tr key={index} className="border-t border-borderColor">
                                <td className="p-3 flex items-center gap-3">
                                    <img 
                                        src={booking.car?.image || '/placeholder-car.jpg'} 
                                        alt={booking.car ? `${booking.car.brand} ${booking.car.model}` : 'Car'} 
                                        className="w-12 h-12 object-cover rounded-md aspect-square"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-car.jpg';
                                        }}
                                    />
                                    <p className="font-medium max-md:hidden">{booking.car.brand} {booking.car.model}</p>
                                </td>

                                <td className="p-3 max-md:hidden">
                                    {format(new Date(booking.pickupDate), 'MMM d, yyyy')} to {format(new Date(booking.returnDate), 'MMM d, yyyy')}
                                </td>
                                <td className="p-3">{currency}{booking.price}</td>
                                <td className="p-3 max-md:hidden">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">offline</span>
                                </td>

                                <td>
                                    {booking.status === 'pending' ? (
                                        <select onChange={e=>changeBookingStatus(booking._id,e.target.value)} value={booking.status} className="border border-borderColor rounded-md px-2 py-1.5 mt-1 text-gray-500 outline-none">
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>{booking.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageBookings