import {useDispatch, useSelector} from "react-redux";
import '../Styles/style.css';
import {useEffect, useState} from "react";
import Orders from "./Orders";

function Tickets({open}) {
    const reduxData = useSelector(state => state.reducer.data);
    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [minDepartureTime, setMinDepartureTime] = useState('');
    const [maxArrivalTime, setMaxArrivalTime] = useState('');
    const [orderOpen, setOrderOpen] = useState(false)
    const [orderClosed, setOrderClosed] = useState()

    const [filteredData, setFilteredData] = useState(reduxData);
    const dispatch = useDispatch()

    useEffect(() => {
        setFilteredData(reduxData);
    }, [reduxData]);

    const handleChangeFrom = (e, value) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchFrom(inputValue);
        const filteredData = reduxData.filter(item => item.from.toLowerCase().includes(inputValue));
        setFilteredData(filteredData);
    };

    const handleChangeTo = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchTo(inputValue);
        const filteredData = reduxData.filter(item => item.to.toLowerCase().includes(inputValue));
        setFilteredData(filteredData);
    };

    const handleDateSearch = (e) => {
        const inputValue = e.target.value;
        setSearchDate(inputValue);
        const filteredData = reduxData.filter(item => item.departure.includes(inputValue));
        setFilteredData(filteredData);
    };

    const handleMinDepartureTimeSearch = (e) => {
        const inputValue = e.target.value;
        setMinDepartureTime(inputValue);
        if (inputValue === '') {
            setFilteredData(reduxData);
        } else {
            filterDataByTime(inputValue, maxArrivalTime, 'departure');
        }
    };

    const handleMaxArrivalTimeSearch = (e) => {
        const inputValue = e.target.value;
        setMaxArrivalTime(inputValue);
        if (inputValue === '') {
            setFilteredData(reduxData);
        } else {
            filterDataByTime(minDepartureTime, inputValue, 'arrival');
        }
    };


    const filterDataByTime = (minTime, maxTime, timeType) => {
        const filteredData = reduxData.filter(item => {
            const itemTime = new Date(item[timeType]).getHours();
            return itemTime === parseInt(minTime) || itemTime === parseInt(maxTime);
        });
        setFilteredData(filteredData);
    };

    const handleBookTicket = (ticket) => {
        dispatch({type: "SAVE_TICKET", payload: ticket})
    };

    const handleOrderOpen = () => {
        setOrderOpen(true)
    }
    const handleOrderClose = () => {
        setOrderOpen(false)
    }
    return (
        <>
            <div className="search">
                <div className="search_city">
                    <input type="text" placeholder="Prague..." onChange={handleChangeFrom}/>
                    <input type="text" placeholder="London..."onChange={handleChangeTo}/>
                </div>
                <div className="search_time_hour">
                    <input type="time" placeholder="Departure.." onChange={handleMinDepartureTimeSearch}/>
                    <input type="time" placeholder="Arrive.." onChange={handleMaxArrivalTimeSearch}/>
                </div>
                <div className="search_time">
                    <input type="date"  onChange={handleDateSearch}/>
                </div>
                {orderOpen && <Orders close={handleOrderClose}/>}
                <button className="myorders" onClick={handleOrderOpen}>My Orders</button>
            </div>
            <div className="tickets">
                {filteredData && filteredData.length > 0 ? (
                    filteredData.map(data_el => (
                        <div className="ticket" key={data_el.id}>
                            <li>{data_el.from}</li>
                            <li>{data_el.to}</li>
                            <li>{data_el.departure}</li>
                            <li>{data_el.arrival}</li>
                            <li>${data_el.price}</li>
                            <button className="button_book" onClick={() => {
                                handleBookTicket(data_el)
                                open()
                            }}>Book
                            </button>
                        </div>
                    ))
                ) : (
                    <div>
                        We're sorry but we haven't found anything, try to change your search requests.
                    </div>
                )}
            </div>

        </>
    );
}

export default Tickets;
