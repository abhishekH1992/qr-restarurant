export const getItemFinalPrice = (variant, addons) => {
    let total = 0;
    total = typeof variant !== 'undefined'  ? variant : 0;
    typeof addons !== 'undefined' && addons.length && addons.forEach((item) => {
        total = total + item.price;
    });
    if(total == null ) {
        total = 0;
    }
    return total.toFixed(2);
}

export const getPrice = (menu) => {
    if(menu.menuVariant.length) {
        return 'NZD '+menu.menuVariant[0].price.toFixed(2); 
    }
    return 'NZD '+menu.fixedPrice.toFixed(2);
}