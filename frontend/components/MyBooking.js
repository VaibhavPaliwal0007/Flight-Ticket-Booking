import React from 'react';
import { useSelector } from 'react-redux';

const MyBooking = async () => {
  const token = useSelector(state => state.auth.token);
  const [bookings, setBookings] = useState([]);

  try {
    const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}/bookings`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    const data = await response.json();
    setBookings(data.bookings);
  }
  catch (err) {
    alert(err.message);
  }


  return (
    <div>
      {/* {bookings.map(booking => (
        <Card flight={booking} />))
      } */}
    </div>
  )
}

export default MyBooking