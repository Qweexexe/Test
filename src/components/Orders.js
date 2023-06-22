import {useSelector} from "react-redux";

function Orders({close}) {
    const orderList = useSelector((state) => state.orders.orders);
    return (
        <div className="orders">
            <button className="order_close" onClick={close}>X</button>
            {orderList.length > 0 &&
                orderList.map((el) => el.map(el_el => el_el && (
                        <div className="order_list">
                            <h4>{el_el.from}</h4>
                            <h4>{el_el.to}</h4>
                            <h4>{el_el.departure}</h4>
                            <h4>{el_el.arrival}</h4>
                            <h4>{el_el.price}</h4>
                        </div>
                    ))
                )}
        </div>
    );
}


export default Orders