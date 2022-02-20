import OrderModel from '../models/order.Model';

export class OrderState {
   
//    public order: OrderModel;
public order: OrderModel[] = [];


}

export enum OrderActionTypes {
    CreateOrder = "CreateOrder",
    GetOrderByUser = "GetOrderByUser",
    GetAllOrders = "GetAllOrders"
}

export interface OderAction {
    type: OrderActionTypes,
    payload: any
}

export function CreateNewOrder(order: OrderModel): OderAction {
    return { type: OrderActionTypes.CreateOrder, payload: order};
}

export function GetOrderByUser(order: OrderModel[]): OderAction {
    return { type: OrderActionTypes.GetOrderByUser, payload: order};
}

export function GetAllOrders(orders: OrderModel[]): OderAction {
    return { type: OrderActionTypes.GetAllOrders, payload: orders};
}


export function orderReducer(initialState: OrderState = new OrderState(), action: OderAction):OrderState {
    const newState = { ...initialState };

    switch (action.type) {
  
        case OrderActionTypes.CreateOrder:
            newState.order = action.payload;
            break;

        case OrderActionTypes.GetOrderByUser:
            newState.order = action.payload
            break;
        case OrderActionTypes.GetAllOrders:
            newState.order = action.payload
            break;
    }
    return newState;
}


