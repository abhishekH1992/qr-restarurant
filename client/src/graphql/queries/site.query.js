import { gql } from "@apollo/client";

export const GET_SITE = gql`
    query GetSite {
        site {
            name
            email
            logo
            banner
        }
    }
`;

export const GET_PAYMENT_API = gql`
    query GetSite {
        site {
            stripePublishKey
            stripeSecretKey
        }
    }
`;