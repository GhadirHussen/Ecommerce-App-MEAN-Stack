import ProductModel from "./product.Model";
import UserModel from "./user.Model";
import CartModel from "./cart.Model";
class orderDetailModel {
    
    public _id: string;
    public userId: string;
    public cartId: string;
    public firstName: string;
    public lastName: string;
    public user: UserModel;

    public cart: CartModel
    public id: string;
}


export default orderDetailModel;
