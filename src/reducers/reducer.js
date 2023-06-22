
const InitialState = {
    data : null,
    ticket : [],
    seat : '',
    clientName : '',
    clientSurname : '',
}

export const reducer = (state = InitialState, action) =>{
    switch (action.type){
        case "SAVE_DATA":
            return {...state, data : action.payload}
        case "SEAT_CHECK":
            return {...state, seat: action.payload}
        case "SET_CLIENTNAME":
            return {...state, seat: action.payload}
        case "SAVE_TICKET":
            return {...state, ticket : action.payload}
        default:
            return state
    }
}