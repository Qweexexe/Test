import '../Styles/style.css'
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import {useState} from "react";

function Modal({close}) {
    const ticket_info = useSelector(state => state.reducer.ticket)
    const seats = useSelector(state => state.reducer.seat)
    const clientNameRedux = useSelector(state => state.reducer.clientName)
    const clientSnameRedux = useSelector(state => state.reducer.clientSurname)
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()
    const [clientName, setClientName] = useState('')
    const [clientSname, setClientSname] = useState('')


    const actionBook = (seat) => {
        if (clientName && clientSname && seat) {
            dispatch({type: "SET_CLIENTNAME", payload: clientName})
            close()
            Swal.fire({
                icon: 'success',
                title: 'YAhoooo',
                text: 'Your travel was booked, you can check your book on the page "MY ORDERS"',
            })
            console.log(ticket_info)
            console.log(seats)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Enter name and surname',
                text: 'Or you haven\'t chose the seat'
            })
        }

    }
    const checkSeat = (seat) => {
        if (seat.available) {
            dispatch({type: "SEAT_CHECK", payload: seat.number})
            addToOreders(ticket_info, seats, clientNameRedux, clientSnameRedux)
            Swal.fire({
                icon: 'success',
                title: `Chose ${seat.number}`,
            })
            console.log(orders)
        } else {
            Swal.fire({
                    icon: 'error',
                    title: 'This seat is already booked',
                }
            )
        }
    }

    const addToOreders = (ticket_info, seats, clientNameRedux, clientSnameRedux) => {
        dispatch({type: "ADD_ORDER", payload: [ticket_info, seats, clientNameRedux, clientSnameRedux]})
        console.log(orders)
    }

    const handleName = (e) => {
        setClientName(e.target.value)
    }

    const handleSurname = (e) => {
        setClientSname(e.target.value)
    }

    return (
        <div className="modal">
            <div className="modal_info">
                <h1>{ticket_info.from}</h1>
                <h1>{ticket_info.to}</h1>
                <h1>{ticket_info.departure}</h1>
                <h1>{ticket_info.arrival}</h1>
                <h1>$ {ticket_info.price}</h1>
                <div className="moda_seats">
                    {ticket_info && Object.values(ticket_info.seats).map(seat => (
                        <div className={`seat_info ${seat.available ? 'available' : 'unavailable'}`} key={seat.id}
                             onClick={() => checkSeat(seat)}>{seat.number}</div>))}
                </div>
            </div>
            <div className="modal_inputs">
                <input type="text" placeholder="Your Name..." onChange={handleName}/>
                <input type="text" placeholder="Your Surname.." onChange={handleSurname}/>
            </div>
            <div className="modal_book" onClick={actionBook}>
                Book
            </div>
            <div className="modal_close" onClick={close}>x</div>
        </div>
    )
}

export default Modal