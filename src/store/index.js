import {combineReducers, createStore} from "redux";
import {reducer} from "../reducers/reducer";
import {orderReducer} from "../reducers/ordersReducer";
import Swal from "sweetalert2";


const rootReducer = combineReducers({
    reducer : reducer,
    orders : orderReducer
})
export const store = createStore(rootReducer)

