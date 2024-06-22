import { useEffect, useState } from 'react';
import { useCart } from "../../context/CartContext";
import { Button } from "@nextui-org/react";
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';


const StickyBtn = ({ btnTxt, classNames, hideFromLinks, redirectLink}) => {
    const { state } = useCart();
    const [isRelative, setIsRelative] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const handleScroll = () => {
            const contentHeight = document.getElementById('content').offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
            if (scrollY + windowHeight >= contentHeight) {
                setIsRelative(true);
            } else {
                setIsRelative(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleViewCartClick = () => {
        navigate(redirectLink);
    };
    const isCartPage = hideFromLinks.includes(location.pathname);

    return (
        <>
            {!isCartPage && state.items?.length > 0 &&
                <div className="max-w-940 px-spacing-sm md:px-spacing-md lg:px-spacing-lg mx-auto">
                    <Button className={`${
                        isRelative ? 'relative my-3 mx-auto' : 'fixed bottom-5'
                    }  ${classNames}`} radius="lg"
                        onClick={handleViewCartClick}>
                        {btnTxt}
                    </Button>
                </div>
            }
        </>
    )
}

StickyBtn.propTypes = {
    classNames: PropTypes.string,
    btnTxt: PropTypes.string,
    hideFromLinks: PropTypes.array,
    redirectLink: PropTypes.string,
};

export default StickyBtn;