import ProductModel from "./product.Model";
import UserModel from "./user.Model";

class CartModel {

    public _id?: string;
    public id?: string;
    public user: UserModel;
    public cartItems: {
        _id?: string,
        product?: ProductModel;
        quantity?: number,
        totalPrice?: number
    }[]=[];
    public finalPrice: number;
    public active: boolean = true
}


export default CartModel;
