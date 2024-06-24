import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, CheckboxGroup, Checkbox, RadioGroup, Radio } from "@nextui-org/react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import LoadingButton from "../ui/Button";
import { getItemFinalPrice } from "../../utils/cart.helper";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import PropTypes from 'prop-types';

const MenuModal = ({ menu, visible, closeModal }) => {
    const { addToCart } = useCart();
    const [selectedOptions, setSelectedOptions] = useState({
        variant: {
            id: null,
            item: [],
        },
        addons: [],
        menuPrice: null,
    });

    const [finalPrice, setFinalPrice] = useState(0);
    const [quantity] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (menu.menuVariant?.length) {
            setSelectedOptions((prevOptions) => ({
                ...prevOptions,
                variant: {
                    id: menu.menuVariant[0]._id,
                    item: menu.menuVariant[0]
                }
            }));
            return () => {
                setSelectedOptions({
                    variant: {
                        id: null,
                        item: [],
                    },
                    addons: [],
                    menuPrice: null,
                });
            };
        } else {
            setSelectedOptions((prevOptions) => ({
                ...prevOptions,
                menuPrice: menu ? menu.fixedPrice : 0
            }));
            return () => {
                setSelectedOptions({
                    variant: {
                        id: null,
                        item: [],
                    },
                    addons: [],
                    menuPrice: null,
                });
            };
        }
    }, [menu]);
    useEffect(() => {
        if (selectedOptions.variant || selectedOptions.addons) {
            let data = selectedOptions.variant.item?.price ? getItemFinalPrice(selectedOptions.variant.item?.price, selectedOptions.addons) : getItemFinalPrice(selectedOptions.menuPrice, selectedOptions.addons);
            if(data) setFinalPrice(data);
        }
      }, [selectedOptions.variant, selectedOptions.addons, selectedOptions.menuPrice]);

    const handleVariantChange = (event) => {
        let item = menu.menuVariant.find((variant) => variant._id === event.target.value);
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            variant: {
                id: event.target.value,
                item: item
            }
        }));
    };

    const handleAddonChange = (values) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            addons: [...values],
        }));
        let data = selectedOptions.variant.item?.price ? getItemFinalPrice(selectedOptions.variant.item?.price, values) : getItemFinalPrice(selectedOptions.menuPrice, values);
        if(data) setFinalPrice(data);
    };

    const handleSubmit = async() => {
        try {
            setLoading(true);
            let ids = [];
            if(selectedOptions.addons.length) {
                ids = selectedOptions.addons.map(item => item._id);
            }
            await addToCart(
                {
                    menuId: menu._id,
                    variantId: selectedOptions.variant.id,
                    quantity: quantity,
                    salePrice: selectedOptions.variant.item?.price ? selectedOptions.variant.item.price : menu.fixedPrice
                },
                ids
            );
        } catch(err) {
            setLoading(false);
            toast.error('Something went wrong. Please refresh the page and try again.');
            console.error('Error handling submit:', err);
        } finally {
            setLoading(false);
            closeModal();
            toast.success('Added to cart');
            setSelectedOptions({
                variant: {
                    id: null,
                    item: [],
                },
                addons: [],
            });
            setFinalPrice(0);
        }
    };

    return (
        <Modal
            isOpen={visible}
            placement={window.innerWidth > 768 ? "center" : "bottom"}
            backdrop="blur"
            scrollBehavior="inside"
            radius="sm"
            onClose={closeModal}
            size="5xl"
        >
            <ModalContent>
                <>
                    <ModalHeader className="rounded-sm">{menu.name}</ModalHeader>
                    <ModalBody className="p-0 md:flex md:flex-row md:p-spacing-md md:gap-3">
                        <div>
                            <img
                                src={menu.image}
                                className="h-200 w-full object-cover object-center rounded-b-lg md:rounded-lg"
                            />
                        </div>
                        <div className="w-full">
                            {menu.menuVariant?.length > 0 && (
                                <>
                                <div className="text-modal-section-title-xs sm:modal-section-title-sm px-spacing-sm md:px-spacing-md lg:px-spacing-lg py-4 border-b-1 border-gray-200 uppercase text-gray-500">
                                    Select Variant
                                </div>
                                <RadioGroup
                                    onChange={handleVariantChange}
                                    value={selectedOptions.variant.id}
                                    color="secondary"
                                    className="variant-radio-grid px-spacing-sm md:px-spacing-md lg:px-spacing-lg py-4"
                                >
                                    {menu.menuVariant.map((variant) => (
                                    <label className="flex" key={variant._id}>
                                        <Radio value={variant._id}>
                                        {variant.name}
                                        </Radio>
                                        <div className="ml-auto text-modal-section-title-xs text-foreground-400">
                                        {`NZD ` + variant.price.toFixed(2)}
                                        </div>
                                    </label>
                                    ))}
                                </RadioGroup>
                                </>
                            )}
                            {menu.menuAddOns?.length > 0 && (
                                <>
                                <div className={`text-modal-section-title-xs sm:modal-section-title-sm px-spacing-sm md:px-spacing-md lg:px-spacing-lg py-4 border-b-1 border-gray-200 uppercase text-gray-500 ${menu.menuVariant?.length > 0 ? `pt-8 pb-4` : ''}`}>
                                    Select Addons
                                </div>
                                <CheckboxGroup
                                    onChange={handleAddonChange}
                                    value={selectedOptions.addons.item}
                                    color="secondary"
                                    className="variant-radio-grid px-spacing-sm md:px-spacing-md lg:px-spacing-lg py-4"
                                >
                                    {menu.menuAddOns.map((addOn) => (
                                    <label className="flex" key={addOn._id}>
                                        <Checkbox value={addOn}>
                                        {addOn.name}
                                        </Checkbox>
                                        <div className="ml-auto text-modal-section-title-xs text-foreground-400">
                                        {`NZD ` + addOn.price.toFixed(2)}
                                        </div>
                                    </label>
                                    ))}
                                </CheckboxGroup>
                                </>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter className="p-0 md:p-2">
                        <LoadingButton onPress={handleSubmit} loading={loading} className="w-full bg-black text-white rounded-none md:rounded-lg">
                            Add to cart <ChevronDoubleRightIcon className="size-4"/> {finalPrice ? `NZD `+finalPrice : ``}
                        </LoadingButton>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};
MenuModal.propTypes = {
    menu: PropTypes.any,
    visible: PropTypes.bool,
    closeModal: PropTypes.func
};

export default MenuModal;
