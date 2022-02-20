import CartModel from "../models/cart.Model";


export class CartState {
   public carts: CartModel;
}

export enum CartActionType {
    GetCart = "GetCart",
    addProductToCart = "addProductToCart",
    RemoveProductFromCart = "RemoveProductFromCart",
    UpdateProductFromCart = "UpdateProductFromCart",
    ClearCart = "ClearCart"
}

export interface CartAction {
    type: CartActionType,
    payload: any
}



export function getCart(carts: CartModel): CartAction {
    return { type: CartActionType.GetCart, payload: carts };
}

export function addProductToCart(cart: any): CartAction {
    return { type: CartActionType.addProductToCart, payload: cart};
}

export function removeProductFromCart(cartId: string, productId: string): CartAction {
    return { type: CartActionType.RemoveProductFromCart, payload: {cartId, productId}};
}

export function updateProductFromCart(cartId: string ,productId: string): CartAction {
    return { type: CartActionType.UpdateProductFromCart, payload: { cartId,productId } };
}

export function clearCart(cartId: string): CartAction {
    return { type: CartActionType.ClearCart, payload: cartId};
}


export function cartsReducer(initialState: CartState = new CartState(), action: CartAction): CartState{

    const newState = { ...initialState };

    switch (action.type) {
        case CartActionType.GetCart:
            newState.carts = action.payload;
            break;

        case CartActionType.addProductToCart: 

         newState.carts = action.payload;
        break
          
        case CartActionType.UpdateProductFromCart:  
            const index = newState.carts.cartItems.findIndex(p => p.product._id === action.payload.productId)
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