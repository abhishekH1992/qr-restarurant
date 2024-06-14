import { mergeResolvers } from "@graphql-tools/merge";

import siteResolver from "./site.resolver.js";

const mergedResolvers = mergeResolvers([siteResolver]);

export default mergedResolvers;