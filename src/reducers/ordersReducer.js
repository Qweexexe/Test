const InitialState = {
    orders:[]
}

export const orderReducer = (state = InitialState, action) => {
    switch (action.type) {
        case "ADD_ORDER":
            console.log(state.orders)
            return {...state, orders: [...state.orders, action.payload]}
        default:
            return state

    }
}