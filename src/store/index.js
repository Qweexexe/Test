import {combineReducers, createStore} from "redux";
import {reducer} from "../reducers/reducer";
import {orderReducer} from "../reducers/ordersReducer";



const rootReducer = combineReducers({
    reducer : reducer,
    orders : orderReducer
})
export const store = createStore(rootReducer)

