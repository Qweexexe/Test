function FlightSearch() {
    return (
        <div className="fligh_wrapper">
            <div className="flight_search_city">
                <input type="text"/>
                <input type="text"/>
            </div>
            <div className="flight_search_date">
                <input type="date"/>
                <input type="time"/>
            </div>
        </div>
    )
}

export default FlightSearch