import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
        <div className='flex flex-wrap justify-between gap-8 pb-6 border-borderColor border-b'>
            <div className=''>
                <img src={assets.logo} alt="logo" className='h-8 md:h-9' />
                <p className='mt-3 max-w-80'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                </p>
                <div className='flex items-center gap-3 mt-6'>
                    <a href="#">
                        <img src={assets.facebook_logo} className="h-5 w-5" alt="facebook"/>
                    </a>
                    <a href="#">
                        <img src={assets.twitter_logo} className="h-5 w-5" alt="twitter"/>
                    </a>
                    <a href="#">
                        <img src={assets.instagram_logo} className="h-5 w-5" alt="instagram"/>
                    </a>
                    <a href="#">
                        <img src={assets.gmail_logo} className="h-5 w-5" alt="gmail"/>
                    </a>
                </div>
            </div>

            <div>
                <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                <ul className='mt-3 flex flex-col gap-1.5'>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Browse Cars</a></li>
                    <li><a href="#">List Your Car</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
            </div>
            <div>
                <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                <ul className='mt-3 flex flex-col gap-1.5'>
                    <li><a href="#">Help Center</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
            </div>
            <div>
                <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                <ul className='mt-3 flex flex-col gap-1.5'>
                    <li>123 Luxury Drive</li>
                    <li>Mumbai, Maharashtra 400001</li>
                    <li>+91 882737288</li>
                    <li>info@carrental.com</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
            <p>© {new Date().getFullYear()} <a href="https://carrental.com">CarRental</a>. All rights reserved.</p>
            <ul className='flex items-center gap-3'>
                <li> 
                    <a href="#">Privacy</a>
                </li>
                <li>|</li>
                <li>
                    <a href="#">Terms</a>
                </li>
                <li>|</li>
                <li> 
                    <a href="#">Cookies</a>
                </li>
            </ul>
        </div>
    </div>
    )
}

export default Footer