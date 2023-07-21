const {
    signup,
    login,
    logout,
    loginAdmin,
    loginByToken
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
    loginByToken,
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