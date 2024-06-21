import { mergeResolvers } from "@graphql-tools/merge";

import siteResolver from "./site.resolver.js";
import tableResolver from "./table.resolver.js";
import categoryTypeResolver from "./categoryType.resolver.js";
import categoryResolver from "./category.resolver.js";
import subCategoryResolver from "./subCategory.resolver.js";
import menuResolver from "./menu.resolver.js";
import menuAddonsResolver from "./menuAddons.resolver.js";
import menuVariantResolver from "./menuVariant.resolver.js";
import cartResolver from "./cart.resolver.js";

const mergedResolvers = mergeResolvers([siteResolver, tableResolver, categoryTypeResolver, categoryResolver, subCategoryResolver, menuResolver, menuAddonsResolver, menuVariantResolver, cartResolver]);

export default mergedResolvers;