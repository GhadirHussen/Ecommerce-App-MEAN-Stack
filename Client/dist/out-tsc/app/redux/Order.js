export class OrderState {
    constructor() {
        //    public order: OrderModel;
        this.order = [];
    }
}
export var OrderActionTypes;
(function (OrderActionTypes) {
    OrderActionTypes["CreateOrder"] = "CreateOrder";
    OrderActionTypes["GetOrderByUser"] = "GetOrderByUser";
    OrderActionTypes["GetAllOrders"] = "GetAllOrders";
})(OrderActionTypes || (OrderActionTypes = {}));
export function CreateNewOrder(order) {
    return { type: OrderActionTypes.CreateOrder, payload: order };
}
export function GetOrderByUser(order) {
    return { type: OrderActionTypes.GetOrderByUser, payload: order };
}
export function GetAllOrders(orders) {
    return { type: OrderActionTypes.GetAllOrders, payload: orders };
}
export function orderReducer(initialState = new OrderState(), action) {
    const newState = Object.assign({}, initialState);
    switch (action.type) {
        case OrderActionTypes.CreateOrder:
            newState.order = action.payload;
            break;
        case OrderActionTypes.GetOrderByUser:
            newState.order = action.payload;
            break;
        case OrderActionTypes.GetAllOrders:
            newState.order = action.payload;
            break;
    }
    return newState;
}
//# sourceMappingURL=Order.js.map