import { useState } from "react";
import { assets, menuLinks } from "../assets/assets"
import { Link, useLocation, useNavigate } from "react-router-dom"
const Navbar = ({setShowLogin}) => {
    
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    return (
        <div className={`flex items-center justify-between px-6 py-4 md:px-16 lg:px-24 xl:px-32 text-gray-600 border-b border-borderColor relative transition-all duration-300 ${location.pathname === '/' && "bg-light"}`}>
            <Link to={'/'} >
                <img src={assets.logo} alt="logo" className="h-8" />
            </Link>

            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-1 border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === '/' ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>{menuLinks.map((link, index) => (
                <Link key={index} to={link.path} className="m-4">{link.name}</Link>
            ))}

                <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor rounded-full px-3 max-w-56">
                    <input type="text" className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500' placeholder="Search Products" />
                    <img src={assets.search_icon} alt="search" />
                </div>

                <div className="flex gap-6 max-sm:flex-col items-start sm:items-center">
                    <button className="cursor-pointer" onClick={() => navigate('/owner')}>Dashboard</button>
                    <button onClick={() => setShowLogin(true)} className="cursor-pointer px-8 bg-primary text-white py-2 hover:bg-primary-dull transition-all duration-300 rounded-lg">Login</button>
                </div>
            </div>

            <button className="cursor-pointer sm:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
                <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
            </button>

        </div>
    )
}

export default Navbar
