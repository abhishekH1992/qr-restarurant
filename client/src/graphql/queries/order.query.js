import { gql } from "@apollo/client";

export const GET_ORDER_BY_ID = gql`
    query getOrderById($id: ID!) {
        getOrderById(id: $id) {
            _id
            tableId
            note
            orderNumber
            items {
                _id
                quantity
                salePrice
                menu {
                    _id
                    name
                    description
                    image
                    fixedPrice
                }
                variant {
                    _id
                    name
                    price
                }
                addon {
                    _id
                    name
                    price
                }
            }
        }
    }
`;

export const GET_ORDER_BY_IDS = gql`
    query getOrdersByIds($ids: [ID!]!) {
        getOrdersByIds(ids: $ids) {
            _id
            tableId
            note
            orderNumber
            items {
                _id
                quantity
                salePrice
                menu {
                    _id
                    name
                    description
                    image
                    fixedPrice
                }
                variant {
                    _id
                    name
                    price
                }
                addon {
                    _id
                    name
                    price
                }
            }
        }
    }
`;