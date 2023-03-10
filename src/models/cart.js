let cart = null;

module.exports = class Cart {

    static save(product) {

        if (cart === null) {
            cart = { products: [], totalPrice: 0 };
        }

        const existingProductIndex = cart.products.findIndex(p => p.id == product.id); // to check product is existing in cart
        if (existingProductIndex >= 0) { 
            const exsitingProduct = cart.products[existingProductIndex];
            exsitingProduct.qty += 1;
        } else {
            product.qty = 1;
            product.time = new Date()
            cart.products.push(product);
        }

        cart.totalPrice += Number(product.price);
    }

    static getCart() {
        return cart;
    }

    static deleteProductInCart(productId) {
        const isExisting = cart.products.findIndex(p => p.id == productId);
        if (isExisting >= 0) {
            const deletedProduct = cart.products[isExisting];
            cart.totalPrice -= deletedProduct.price * deletedProduct.qty;
            cart.products.splice(isExisting, 1);
        }
    }
}