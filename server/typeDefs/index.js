import { mergeTypeDefs } from "@graphql-tools/merge"

import siteTypeDef from "./site.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([siteTypeDef]);

export default mergedTypeDefs;