
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';

const RemoveMenuModal = ({cartItems, visible, closeModal, menu}) => {
    const { deleteCartItem } = useCart();
    const getItemFinalPrice = (item) => {
        let addonTotal = item.addon && item.addon.reduce((accumulator, add) => {
            return accumulator + add.price;
        }, 0);

        return (item.variant.price + addonTotal).toFixed(2);
    }

    const deleteItem = async(id) => {
        try {
            await deleteCartItem(id);
        } catch(err) {
            toast.error('Something went wrong. Please refresh the page and try again.');
            console.error('Error handling submit:', err);
        } finally {
            closeModal();
            toast.success('Cart updated');
        }
    }

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
                        <div className="w-full">
                            {cartItems?.length > 0 && (
                                <>
                                    {cartItems.map((item) => (
                                        <div className="flex flex-col sm:flex-row gap-2 p-2 py-4 border-b-1 border-gray-200" key={item._id}>
                                            {item.menu && (
                                                <img
                                                    src={item.menu.image}
                                                    alt={item.menu.name}
                                                    className="h-200 sm:h-75 object-cover object-center rounded-md md:rounded-lg"
                                                />
                                            )}
                                            <div className="text-sm w-full">
                                                {item.variant && (
                                                    <div className="text-gray-400 mb-2">{item.variant.name} (NZD {item.variant.price.toFixed(2)})</div>
                                                )}
                                                {item.addon && item.addon.map((add) => (
                                                    <div className="text-gray-400" key={add._id}>{add.name} (NZD {add.price.toFixed(2)})</div>
                                                ))}
                                                <div className="price-text font-semibold justify-between items-center mt-4 hidden sm:flex lg:hidden">
                                                    NZD {getItemFinalPrice(item)}
                                                    <TrashIcon className="size-6" onClick={() => deleteItem(item._id)}/>
                                                </div>
                                            </div>
                                            <div className="price-text font-semibold flex lg:flex-col justify-between items-center sm:hidden lg:flex lg:w-fifteen-percent">
                                                NZD {getItemFinalPrice(item)}
                                                <TrashIcon className="size-6 cursor-pointer" onClick={() => deleteItem(item._id)}/>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    );
}

RemoveMenuModal.propTypes = {
    cartItems: PropTypes.array,
    menu: PropTypes.any,
    visible: PropTypes.bool,
    closeModal: PropTypes.func
};

export default RemoveMenuModal;