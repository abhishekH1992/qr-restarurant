import { gql } from "@apollo/client";

const GET_ENABLE_CATEGORY = gql`
    query GetEnableCategory($isEnable: Boolean) {
        category(isEnable: $isEnable)  {
            _id
            name
            image
            slug
            subCategory {
                _id
                name
                image
                menu {
                    _id
                    name
                    description
                    image
                    fixedPrice
                    menuAddOns {
                        _id
                        name
                        price
                    }
                    menuVariant {
                        _id
                        name
                        price
                    }
                }
            }
        }
    }
`;

export default GET_ENABLE_CATEGORY;