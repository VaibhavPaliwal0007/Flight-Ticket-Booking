const {
    signup,
    login,
    logout,
    loginAdmin
} = require("./authentication");

const {
    bookTicket,
    searchFlightBasedOnQuery,
    searchFlightBasedOnDates,
    getMyBookings,
    addFlight,
    removeFlight,
    removeFlights,
    viewAllBookingsAtADate,
    viewAllBookingsOnDates,
    getFlightDetails
} = require("./flight");

module.exports = {
    signup,
    login,
    loginAdmin,
    logout,
    bookTicket,
    searchFlightBasedOnQuery,
    searchFlightBasedOnDates,
    getMyBookings,
    addFlight,
    removeFlight,
    removeFlights,
    viewAllBookingsAtADate,
    viewAllBookingsOnDates,
    getFlightDetails
};