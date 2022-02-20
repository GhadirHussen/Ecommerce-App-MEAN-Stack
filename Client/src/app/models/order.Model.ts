import ProductModel from "./product.Model";
import UserModel from "./user.Model";
import CartModel from "./cart.Model";


class OrderModel {

    public _id: string;
    public cartId : string;
    public userId: string;
    public firstName: string;
    public lastName: string;
    public cardNumber: string;
    public month: string;
    public year: string;
    public cvv: string 
    public shippingDate: string;
    public user: UserModel[];
    public cart: any;
    public totalPrice: number;
    public id: string;
}
        

export default OrderModel;