import { chat } from "../utils/bid.helper.js";
import Menu from "../models/menu.model.js";

const bidResolver = {
    Mutation: {
        initialMessage: async(_, {menuName}) => {
            try {
                let requestData = {
                    model: 'gpt-4',
                    messages: [
                        {
                            'content': 'Write in funny way to bid and buy for '+menuName+' in single line',
                            'role': 'assistant',
                        }
                    ]
                };
                const response = await chat(requestData);
                return response;
            } catch(err) {
                console.log('Error in getting bid initial message', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        checkBid: async(_, {input}) => {
            try {
                const menu = await Menu.findById(input._id);
                let requestData;
                let isAccept = false;
                let counterOffer;
                let price;
                if(menu && menu.currentPrice) {
                    if(parseFloat(menu.currentPrice) <= parseFloat(input.bid)) {
                        requestData = {
                            model: 'gpt-4',
                            messages: [
                                {
                                    'content': 'Write a funny message in single line to accept the offered price for '+menu.name+'. Language - No Offensive. No of Attempt to bid - '+input.attempt+'. Ask to accept the deal.',
                                    'role': 'assistant',
                                }
                            ]
                        };
                        isAccept = true;
                        price = parseFloat(input.bid);
                    } else {
                        if(input.attempt % 3 === 0) {
                            requestData = {
                                model: 'gpt-4',
                                messages: [
                                    {
                                        'content': 'Write a funny message in single line to reject the offered price for '+menu.name+' and counter offer at NZD '+menu.currentPrice+'. Language - No Offensive. No of Attempt to bid - '+input.attempt+'. Ask to accept the deal.',
                                        'role': 'assistant',
                                    }
                                ]
                            };
                            isAccept = true;
                            counterOffer= menu.currentPrice;
                            price = counterOffer;
                        } else {
                            requestData = {
                                model: 'gpt-4',
                                messages: [
                                    {
                                        'content': 'Write a funny message in single line to reject the offered price for '+menu.name+'. Language - No Offensive. No of Attempt to bid - '+input.attempt+'. Encourage to offer for more.',
                                        'role': 'assistant',
                                    }
                                ]
                            };
                            isAccept = false;
                        }
                    }
                    const response = await chat(requestData);
                    console.log(price);
                    return  {
                        response: isAccept,
                        msg: response,
                        counterOffer: counterOffer,
                        acceptedPrice: price,
                    }
                }

            } catch(err) {
                console.log('Error in placing bid', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    },
}

export default bidResolver;