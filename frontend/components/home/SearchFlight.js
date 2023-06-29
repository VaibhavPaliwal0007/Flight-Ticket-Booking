import { useState, useSelector, useDispatch } from "react";
import { setFlights } from "@/state";

export default function SearchFlight() {
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [date, setDate] = useState("");
    const flights = useSelector(state => state.flights);
    const dispatch = useDispatch();

    const submitHandler = async () => {
        try {
            const response = await fetch(`${process.env.SERVER_URL}/search`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ from: fromTime, to: toTime, date }),

            })

            const data = await response.json();
            dispatch(setFlights(data));
        }
        catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="flex justify-end">
            <div>
                <label for="from">Departure Time:
                    <input type="text" onChange={(e) => setFromTime(e.target.value)} required />
                </label>

                <label for="to">Arrival Time:
                    <input type="text" onChange={(e) => setToTime(e.target.value)} required />
                </label>

                <label for="date">Date:
                    <input type="date" onChange={(e) => setDate(e.target.value)} required />
                </label>

            </div>
            <button onClick={submitHandler}>Search</button>

            <div>
                {flights.map(flight => (
                    <Card flight={flight} key={flight._id} />
                ))}
            </div>

        </div>)

};