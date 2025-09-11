import { NavLink, useLocation } from "react-router-dom";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";
import { useState } from "react";

const Sidebar = () => {

    const user = dummyUserData;
    const location = useLocation();
    const [image, setImage] = useState('');

    const updateImage = async()=>{
        user.image = URL.createObjectURL(image);
        setImage('');
    }

    return (
        <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">

            <div className="relative group">
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : user.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"} className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"/>
                    <input type='file' id="image" accept="image/*" hidden onChange={(e)=>setImage(e.target.files[0])}/>

                    <div className="absolute bottom-0 right-0 top-0 left-0 flex items-center justify-center hidden bg-black/10 group-hover:flex rounded-full cursor-pointer">
                        <img src={assets.edit_icon} alt="edit"/>
                    </div>
                </label>
            </div>
            {image &&(
                <button className="absolute top-0 right-0 flex p- gap-1 bg-primary/10 text-primary cursor-pointer" onClick={updateImage}>Save <img src={assets.check_icon} alt="check" width={13}/></button>
            )}
            <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

            <div className="w-full">
                {ownerMenuLinks.map((link,index)=>(
                    <NavLink className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'}`} key={index} to={link.path}>
                        <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt={link.title} className="w-5 h-5"/>
                        <span className="max-md:hidden">{link.name}</span>
                        <div className={`${link.path === location.pathname && 'bg-primary'} w-1.5 h-8 rounded-lg right-0 absolute`}></div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Sidebar