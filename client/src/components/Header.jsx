import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useState } from "react";
import { useSite } from "../context/SiteContext";

const Header = () => {
    const { site, selectedTable } = useSite();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Menu',
            link: '/the-basics' // TODO - Change this accordingly
        },
        {
            name: 'Cart',
            link: '/cart'
        },
        {
            name: 'Orders',
            link: '/orders'
        },
        {
            name: 'Call Uber',
            link: 'tel:0800468237'
        },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={toggleMenu} className="bg-brand-color px-spacing-sm md:px-spacing-md lg:px-spacing-lg" maxWidth="2xl" position="static">
            <NavbarContent className="max-width-full">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
                <NavbarBrand>
                    <Link to='/'>
                        <img
                            src={site?.site?.logo}
                            className='h-75'
                            alt=''
                        />
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            {selectedTable && selectedTable._id && (
                <NavbarContent className="flex gap-4" justify="center">
                    <NavbarItem>
                        <div className="text-md ml-auto text-white text-xs">
                            Your Table No.
                            <div className="text-xs">{selectedTable.name}</div>
                        </div>
                    </NavbarItem>
                </NavbarContent>
            )}
            <NavbarMenu onClick={toggleMenu} align="center">
                <div className="mt-auto mb-auto">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${index}`} className="my-4">
                            <Link
                                className="w-full"
                                to={item.link}
                                size="lg"
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </Navbar>
    );
}

export default Header;