const express = require('express');
const flightRoute = new express.Router();

const { validateSession, validateAdminSession } = require('../middleware/auth');

const { bookTicket,
    searchFlightBasedOnQuery,
    searchFlightBasedOnDates,
    getMyBookings,
    addFlight,
    removeFlight,
    removeFlights,
    viewAllBookingsAtADate,
    viewAllBookingsOnDates,
    getFlightDetails } = require('../controllers');

flightRoute.post('/book/:id', validateSession, bookTicket);
flightRoute.get('/search', validateSession, searchFlightBasedOnQuery);
flightRoute.get('/search/dates', validateSession, searchFlightBasedOnDates);
flightRoute.get('/mybookings', validateSession, getMyBookings);
flightRoute.post('/add', validateAdminSession, addFlight);
flightRoute.delete('/remove/:_id', validateAdminSession, removeFlight);
flightRoute.delete('/remove/given', validateAdminSession, removeFlights);
flightRoute.post('/view/date', validateAdminSession, viewAllBookingsAtADate);
flightRoute.post('/view/dates', validateAdminSession, viewAllBookingsOnDates);
flightRoute.get('/view/:_id', getFlightDetails);

module.exports = flightRoute;

