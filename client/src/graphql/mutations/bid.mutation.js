import { gql } from "@apollo/client";

export const GET_INITIAL_MESSAGE = gql`
    mutation initialMessage($menuName: String!) {
        initialMessage(menuName: $menuName)
    }
`;

export const BID_CHECK = gql`
    mutation checkBid($input: PlacedBid!) {
        checkBid(input: $input) {
            response
            msg
            counterOffer
            acceptedPrice
        }
    }
`;