import { useRef } from "react";
import Modal from "./Modal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRole } from "@/state";
import Link from 'next/link';

export default function AdminDashboard() {

    // const [admin , setAdmin] = 

    const role = useSelector(state => state.auth.role);
    console.log(role);

    // if(!role)

    const flightName = useRef(""),
        flightDestination = useRef(""),
        flightSource = useRef(""),
        flightDate = useRef("");

    const addFlight = () => {
        const newFlight = {
            flightName,
            flightDestination,
            flightSource,
            flightDate,
        };

        flights.push(newFlight);
    };

    const removeFlight = (flightToBeRemoved) => {
        flights = flights.filter(flight => flight._id !== flightToBeRemoved._id)
    };

    const [openModal, setModalOpen] = useState(false);

    return (
        <>
            {
                !role &&
                <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                    <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                        <div className="relative">
                            <div className="absolute">
                                <div className="">
                                    <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                        You need admin access
                                    </h1>
                                    <p className="my-2 text-gray-800">
                                        Sorry about that! Please visit our homepage to get where you need to go.
                                    </p>
                                    <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                                        <Link href="/">Take me there!</Link>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="404" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Illustration" />
                    </div>
                </div>
            }
            {
                role &&
                <>
                    <button>Add Flight</button>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Flight name

                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        From
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        To
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Arrival
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Departure
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Seats Available
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17
                                    </th>
                                    <td className="px-6 py-4">
                                        Silver
                                    </td>
                                    <td className="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td className="px-6 py-4">
                                        $2999
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => {
                                                setModalOpen(true);
                                            }}
                                        >Edit</a>
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Microsoft Surface Pro
                                    </th>
                                    <td className="px-6 py-4">
                                        White
                                    </td>
                                    <td className="px-6 py-4">
                                        Laptop PC
                                    </td>
                                    <td className="px-6 py-4">
                                        $1999
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => {
                                                setModalOpen(true);
                                            }}
                                        >Edit</a>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">
                                        Black
                                    </td>
                                    <td className="px-6 py-4">
                                        Accessories
                                    </td>
                                    <td className="px-6 py-4">
                                        $99
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => {
                                                setModalOpen(true);
                                            }}
                                        >Edit</a>
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Google Pixel Phone
                                    </th>
                                    <td className="px-6 py-4">
                                        Gray
                                    </td>
                                    <td className="px-6 py-4">
                                        Phone
                                    </td>
                                    <td className="px-6 py-4">
                                        $799
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => {
                                                setModalOpen(true);
                                            }}
                                        >Edit</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple Watch 5
                                    </th>
                                    <td className="px-6 py-4">
                                        Red
                                    </td>
                                    <td className="px-6 py-4">
                                        Wearables
                                    </td>
                                    <td className="px-6 py-4">
                                        $999
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => {
                                                setModalOpen(true);
                                            }}
                                        >Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {openModal && <Modal closeModal={setModalOpen} />}
                </>
            }
        </>
    );
}

