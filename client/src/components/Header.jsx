import { Link } from "react-router-dom";
const Header = ({ logo }) => {
    return (
        <div className="bg-brand-color px-spacing-sm md:px-spacing-md lg:px-spacing-lg">
            <div className="mx-auto flex justify-content items-center ">
                <div>
                    <Link to='/'>
                        <img
                            src={logo}
                            className='h-75'
                            alt=''
                        />
                    </Link>
                </div>
                <div className="text-md ml-auto text-white text-xs">
                    Your Table No.
                    <div className="text-xs">1</div>
                </div>
            </div>
        </div>
    );
}
export default Header;