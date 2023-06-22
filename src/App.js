import logo from './logo.svg';
import data from './data/data.json'
import './App.css';
import Tickets from "./components/Tickets";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveData} from "./actions/saveData";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Orders from "./components/Orders";

function App() {
    const dispatch = useDispatch()
    const reduxData = useSelector(state => state.reducer.data)
    const [modalOpened, setModalOpened] = useState(false)
    useEffect(() => {
        dispatch(saveData(data))
    }, [])

    const handleClose = () => {
        setModalOpened(false)
    }

    const handleOpen = () => {
        setModalOpened(true)
    }

    return (
        <div className="App">
            {/*<Header/>*/}
            <div className="content">
                <Tickets open={handleOpen}/>
                {modalOpened && <Modal close={handleClose}/>}

            </div>
        </div>
    );
}

export default App;
