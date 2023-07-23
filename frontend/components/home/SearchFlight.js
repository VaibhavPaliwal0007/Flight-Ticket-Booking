import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFlights } from "@/state";
import Card from "./Card";
import Link from "next/link";

export default function SearchFlight() {
    let src = useRef();
    let dest = useRef();
    let dateRef = useRef();
    const flights = useSelector(state => state.auth.flights);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            let [from, to, date] = [src.current.value, dest.current.value, dateRef.current.value];

            // convert in this format
            //2023-06-30T22:25:01.867+00:00

            date = new Date(dateRef.current.value);
            date = date.toISOString();

            console.log(from, to, date);

            if (!from && !to && !date) {
                alert("Please enter the details");
                return;
            }
            if (!validateDate(date)) {
                alert('Invalid city name or date')
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/flight/search?from=${from}&to=${to}&date=${date}&start=0&limit=10`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            dispatch(setFlights(data));
        }
        catch (err) {
            console.log(err);
            alert(err.message);
        }
    }

    useEffect(()=>{
        console.log(flights);
    } , [flights]);

    const validateDate = (selectedDate) => {
        // Check if the selected date is not in the past
        const currentDate = new Date().toISOString().split('T')[0];
        return selectedDate >= currentDate;
      };

    // const validateCity = (cityName) => {
    // // Add your validation logic here
    // // This is just a basic example
    // return cityName.trim() !== '';
    // };

    if (!token) {
        return (
            <div className="text-center flex flex-col justify-center items-center h-80">
                <h1 className="text-2xl font-bold">Please Login to search flights</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 h-30 rounded ">
                    <Link href="/signin">Login</Link>
                </button>
            </div>
        )
    }

    return (
        <>
            
            <form onSubmit={submitHandler} className="mx-auto mt-10 w-10/12 flex justify-around bg-sky-950 p-5 rounded-lg grid grid-cols-2 sm:grid-cols-4">
                <label className="block mb-4 text-white w-4/5">
                    From City:
                    <input
                    type="text"
                    ref={src}
                    className="block w-full mt-1 p-2 border-1 border-black-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                    />
                </label>
                <label className="block mb-4 text-white w-4/5">
                    To City:
                    <input
                    type="text"
                    ref={dest}
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                    />
                </label>
                <label className="block mb-4 text-white w-4/5">
                    Date:
                    <input
                    type="date"
                    ref={dateRef}
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                    />
                </label>
                {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
                    <button
                    type="submit"
                    className="bg-blue-200 hover:bg-blue-400 font-bold px-4 py-1 rounded text-black h-2/5 my-auto w-1/2 justify-self-center">
                        Search
                    </button>
                
            </form>
            <div className="grid sm:grid-cols-3 gap-2 w-10/12 m-auto grid-cols-1">
                {flights?.length > 0 && flights.map(flight => (
                    <Card
                        key={flight._id}
                        flight={flight}
                    />
                ))}
            </div>
            
        </>
    )

};