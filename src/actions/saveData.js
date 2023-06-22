



export const saveData = (data) =>{
    return {type:"SAVE_DATA", payload: data}
}

export const seatCheck = (seatNumber) => {
  return {
    type: "SEAT_CHECK",
    payload: seatNumber
  };
};

export const setClient = (clientName) => {
  return {
    type: "SET_CLIENT",
    payload: clientName
  };
};