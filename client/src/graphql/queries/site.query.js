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