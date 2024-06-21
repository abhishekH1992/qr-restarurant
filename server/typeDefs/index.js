import { mergeTypeDefs } from "@graphql-tools/merge"

import siteTypeDef from "./site.typeDef.js";
import tableTypeDef from "./table.typeDef.js";
import categoryTypeTypeDef from "./categoryType.typeDef.js";
import categoryTypeDef from "./category.typeDef.js";
import subCategoryTypeDef from "./subCategory.typeDef.js";
import menuTypeDef from "./menu.typeDef.js";
import menuAddonsTypeDef from "./menuAddons.typeDef.js";
import menuVariantTypeDef from "./menuVariant.typeDef.js";
import cartTypeDef from "./cart.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([siteTypeDef, tableTypeDef, categoryTypeTypeDef, categoryTypeDef, subCategoryTypeDef, menuTypeDef, menuAddonsTypeDef, menuVariantTypeDef, cartTypeDef]);

export default mergedTypeDefs;