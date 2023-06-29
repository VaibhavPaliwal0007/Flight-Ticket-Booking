const {
    signup,
    login,
    logout,
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
    viewAllBookingsOnDates
} = require("./flight");

module.exports = {
    signup,
    login,
    logout,
    bookTicket,
    searchFlightBasedOnQuery,
    searchFlightBasedOnDates,
    getMyBookings,
    addFlight,
    removeFlight,
    removeFlights,
    viewAllBookingsAtADate,
    viewAllBookingsOnDates
};