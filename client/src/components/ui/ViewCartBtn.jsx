import { useEffect, useState } from 'react';
import { useCart } from "../../context/CartContext";
import { Button } from "@nextui-org/react";
import { useNavigate, useLocation } from 'react-router-dom';

const ViewCartBtn = () => {
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
        navigate('/cart');
    };

    const isCartPage = location.pathname === '/cart' || location.pathname === '/checkout';

    return (
        <>
            {!isCartPage && state.items?.length > 0 &&
                <div className="max-w-940 px-spacing-sm md:px-spacing-md lg:px-spacing-lg mx-auto">
                    <Button className={`${
                        isRelative ? 'relative my-3 mx-auto' : 'fixed bottom-5'
                    }  left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-lg min-w-eighty-percent md:min-w-20`} radius="lg"
                        onClick={handleViewCartClick}>
                        View Cart ({state.items.length})
                    </Button>
                </div>
            }
        </>
    )
}

export default ViewCartBtn;