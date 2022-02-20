export class CartState {
}
export var CartActionType;
(function (CartActionType) {
    CartActionType["GetCart"] = "GetCart";
    CartActionType["addProductToCart"] = "addProductToCart";
    CartActionType["RemoveProductFromCart"] = "RemoveProductFromCart";
    CartActionType["UpdateProductFromCart"] = "UpdateProductFromCart";
    CartActionType["ClearCart"] = "ClearCart";
})(CartActionType || (CartActionType = {}));
export function getCart(carts) {
    return { type: CartActionType.GetCart, payload: carts };
}
export function addProductToCart(cart) {
    return { type: CartActionType.addProductToCart, payload: cart };
}
export function removeProductFromCart(cartId, productId) {
    return { type: CartActionType.RemoveProductFromCart, payload: { cartId, productId } };
}
export function updateProductFromCart(cartId, productId) {
    return { type: CartActionType.UpdateProductFromCart, payload: { cartId, productId } };
}
export function clearCart(cartId) {
    return { type: CartActionType.ClearCart, payload: cartId };
}
export function cartsReducer(initialState = new CartState(), action) {
    const newState = Object.assign({}, initialState);
    switch (action.type) {
        case CartActionType.GetCart:
            newState.carts = action.payload;
            break;
        case CartActionType.addProductToCart:
            newState.carts = action.payload;
            break;
        case CartActionType.UpdateProductFromCart:
            const index = newState.carts.cartItems.findIndex(p => p.product._id === action.payload.productId);
            newState.carts.cartItems[index] = action.payload;
            break;
        case CartActionType.RemoveProductFromCart:
            const indexCart = newState.carts._id === action.payload.cartId;
            const indexProduct = newState.carts.cartItems.findIndex(p => p.product._id === action.payload.productId);
            newState.carts.cartItems.splice(indexProduct, 1);
            break;
        case CartActionType.ClearCart: {
            newState.carts._id === action.payload.cartId;
            newState.carts.cartItems = [];
            break;
        }
    }
    return newState;
}
//# sourceMappingURL=Cart.js.map