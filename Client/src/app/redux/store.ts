import { createStore ,combineReducers } from 'redux';
import { productsReducer } from './Products';
import { categoriesReducer } from './Categories';
import { authReducer } from './Auth';
import { composeWithDevTools } from 'redux-devtools-extension'; 
import { cartsReducer } from './Cart';
import { orderReducer } from '../redux/Order';


const reducers = combineReducers({
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    carts: cartsReducer,
    order: orderReducer
});

const store = 
createStore(reducers, composeWithDevTools());

export default store; 