import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "@nextui-org/react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import { useMutation } from "@apollo/client";
import { GET_INITIAL_MESSAGE, BID_CHECK } from "../../graphql/mutations/bid.mutation";
import { useEffect,  useState } from "react";
import { PlusIcon, MinusIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const BidMenuModal = ({visible, closeModal, menu}) => {
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [amount, setAmount] = useState(menu.lowestPrice || 0);
    const [noOfAttempts, setNoOfAttempts] = useState(1);
    const [isCounterOffer, setIsCounterOffer] = useState(0);
    const [isOfferAccepted, setIsOfferAccepted] = useState(false);
    const [bidLoading, setBidLoading] = useState(false);
    const [acceptedOffer, setAcceptedOffer] = useState(0);

    const [initialMessage] = useMutation(GET_INITIAL_MESSAGE);
    const [bidCheck] = useMutation(BID_CHECK);

    const getInitialMessage = async() => {
        try {
            setLoading(true);
            const { data } = await initialMessage({
                variables: { menuName: menu.name },
            });
            setLoading(false);
            setMessages(prevMessages => [
                ...prevMessages,
                { message: data.initialMessage, role: 'ai' }
            ]);
        } catch(err) {
            toast.error('Something went wrong. Please try again later.');
            console.error('Error fetching initial message:', err);
        }
    };

    useEffect(() => {
        if (visible) {
            setMessages([]);
            setAmount(menu.lowestPrice || 0)
            getInitialMessage();
            setBidLoading(false);
            setNoOfAttempts(1);
            setIsOfferAccepted(false);
            setIsCounterOffer(0);
        }
    }, [visible, menu.name, menu.lowestPrice]);

    const updateAmount = async(type) => {
        let price = type === 'minus' ? parseFloat(amount) - 0.50 : parseFloat(amount) + 0.50;
        return setAmount(price.toFixed(2));
    }

    const placeBid = async() => {
        console.log(menu._id);
        try {
            if(amount) {
                if(amount < menu.lowestPrice) {
                    toast.error(`Price can't be lower that NZD ${menu.lowestPrice}`);
                    return;
                } else if (amount > menu.highestPrice) {
                    toast.error(`Price can't be higher that NZD ${menu.highestPrice}`);
                    return;
                }
                setBidLoading(true);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { message: `You placed a bid for NZD ${parseFloat(amount).toFixed(2)}`, role: 'user' }
                ]);
                setNoOfAttempts(noOfAttempts + 1);
                const {data} = await bidCheck({
                    variables: {
                        input: {
                            bid: parseFloat(amount),
                            attempt: noOfAttempts,
                            _id: menu._id
                        }
                    }
                });
                if(data.checkBid.response) {
                    setIsOfferAccepted(true);
                    setAcceptedOffer(data.checkBid.acceptedPrice)
                } else if (data.checkBid.counterOffer) {
                    setIsCounterOffer(data.checkBid.counterOffer)
                }

                setMessages(prevMessages => [
                    ...prevMessages,
                    { message: data.checkBid.msg, role: 'ai' }
                ]);
                setBidLoading(false);
            }
        } catch(err) {
            console.log('Error in bid', err);
            toast.error('Something went wrong. Please refresh the page.');
        }
    }

    const decline = async() => {
        try {
            setMessages(prevMessages => [
                ...prevMessages,
                { message: `You declined the offer at the price of NZD ${parseFloat(amount).toFixed(2)}`, role: 'user' }
            ]);
            setIsOfferAccepted(false);
        } catch(err) {
            console.log('Error in decline offer', err);
            toast.error('Something went wrong. Please refresh the page.');
        }
    }

    const accept = async() => {
        try {
            console.log(acceptedOffer);
            setBidLoading(true);
            await addToCart({
                menuId: menu._id,
                quantity: 1,
                salePrice: parseFloat(acceptedOffer)
            });
            closeModal();
        } catch(err) {
            setBidLoading(false);
            toast.error('Something went wrong. Please refresh the page and try again.');
            console.error('Error handling submit:', err);
        } finally {
            setBidLoading(false);
            toast.success('Added to cart');
        }
    }

    return(
        <>
            <Modal
            isOpen={visible}
            placement={window.innerWidth > 768 ? "center" : "bottom"}
            backdrop="blur"
            scrollBehavior="inside"
            radius="sm"
            onClose={closeModal}
            size="3xl"
        >
            <ModalContent>
                <>
                    <ModalHeader className="rounded-sm border-b-1 border-gray-100">
                        <div className="flex flex-col">
                            <div>{menu.name}</div>
                            <div className="flex gap-2">
                                <div className="text-gray-400 text-xs font-normal">Min: NZD {menu.lowestPrice}</div>
                                <div className="text-gray-400 text-xs font-normal">Max: NZD {menu.highestPrice}</div>
                            </div>
                        </div>
                    </ModalHeader>
                    <ModalBody className="p-0 md:flex md:flex-row md:p-spacing-md md:gap-3">
                        <div className="w-full">
                            <div className="h-eighty-vh overflow-auto mx-2 md:h-fifty-vh">
                                {!loading && messages && messages.length > 0 && messages.map((message, key) => (
                                    <div className={`flex flex-col`} key={key}>
                                        <div className={`p-4 w-2/3 bg-brand-chatbg rounded-xl my-2 ${message.role != 'ai' ? 'ml-auto bg-gray-100' : ''}`}>
                                            {message.message}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ModalBody>
                    {!bidLoading && !loading && (
                        <ModalFooter className="border-t-1 border-gray-100">
                            {isOfferAccepted || isCounterOffer ?
                                <div className="flex gap-2">
                                    <Button color="danger" variant="bordered" startContent={<XCircleIcon color="danger" className="size-5" />} onPress={decline}>
                                        Decline
                                    </Button>
                                    <Button color="success" variant="bordered" startContent={<CheckCircleIcon color="success" className="size-5" />} onPress={accept}>
                                        Accept
                                    </Button>
                                </div>
                            :
                                <div className="flex">
                                    <div className="bg-black h-8 min-w-8 max-w-8 font-normal text-sm text-center cursor-pointer text-white rounded-l-lg flex items-center justify-center" 
                                            onClick={() => updateAmount('minus')}>
                                        <MinusIcon color="white" className="size-4 text-white"/>
                                    </div>
                                    <input className="bid-input bg-transparent h-8 w-14 border-1 border-gray-200 flex items-center justify-center text-gray-500 text-sm focus:outline-none focus:border-gray-200 text-center" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                    <div className="bg-black h-8 max-w-8 min-w-8 font-normal text-sm text-center cursor-pointer text-white rounded-r-lg flex items-center justify-center" 
                                            onClick={() => updateAmount('plus')}>
                                        <PlusIcon color="white" className="size-4 text-white"/>
                                    </div>
                                    <Button className='bg-black ml-2 h-8 font-normal text-sm text-center cursor-pointer text-white' radius={'sm'} disabled={loading ? true : false} onPress={placeBid}>
                                        {loading ? <Spinner /> : `Place Bid`}
                                    </Button>
                                </div>
                            }
                        </ModalFooter>
                    )}
                </>
            </ModalContent>
        </Modal>
        </>
    );
}

BidMenuModal.propTypes = {
    menu: PropTypes.any,
    visible: PropTypes.bool,
    closeModal: PropTypes.func
};

export default BidMenuModal;