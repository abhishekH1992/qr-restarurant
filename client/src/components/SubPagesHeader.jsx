import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const SubPagesHeader = ({ name }) => {
    return (
        <div className="shadow-xl">
            <div className="px-spacing-sm md:px-spacing-md lg:px-spacing-lg mx-auto py-4 flex justify-content items-center ">
                <div className="w-ten-percent">
                    <Link to="/">
                        <ArrowLeftIcon className="size-6"/>
                    </Link>
                </div>
                <div className="text-md w-eighty-percent text-center text-md">
                    {name}
                </div>
            </div>
        </div>
    )
}

export default SubPagesHeader;