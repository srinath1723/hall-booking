const express = require("express");
const app = express();
app.use(express.json());

const rooms = [];
const bookings = [];

// Helper function to generate unique IDs
const generateId = (array) => {
  if (array.length === 0) return 1;
  return array[array.length - 1].id + 1;
};

// Route to create a room
app.post("/rooms", (req, res) => {
  const id = generateId(rooms);
  const { name, seats, amenities, pricePerHour } = req.body;

  const room = { id, name, seats, amenities, pricePerHour };
  rooms.push(room);

  res.send({
    status: "success",
    data: room,
  });
});

// Route to book a room
app.post("/booking", (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;

  // Check if the room exists
  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    return res.status(404).send({
      status: "fail",
      message: "Room not found",
    });
  }

  // Check if the room is already booked for the given date and time
  const isBooked = bookings.some(
    (booking) =>
      booking.roomId === roomId &&
      booking.date === date &&
      booking.startTime === startTime &&
      booking.endTime === endTime
  );
  if (isBooked) {
    return res.send({
      status: "fail",
      message: "Room already booked for the specified time",
    });
  }

  const id = generateId(bookings);
  const bookingDate = new Date().toISOString().split("T")[0];
  const booking = {
    id,
    customerName,
    date,
    startTime,
    endTime,
    roomId,
    bookingDate,
    status: "booked",
  };
  bookings.push(booking);

  res.send({
    status: "success",
    data: booking,
  });
});

// Route to list all rooms with booked data
app.get("/bookedRooms", (req, res) => {
  const bookedRooms = bookings.map((booking) => {
    const room = rooms.find((room) => room.id === booking.roomId);
    return {
      roomName: room.name,
      status: booking.status,
      customerName: booking.customerName,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });

  res.send(bookedRooms);
});

// Route to list all customers with booked data
app.get("/customerData", (req, res) => {
  const customerData = bookings.map((booking) => {
    const room = rooms.find((room) => room.id === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room.name,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });

  res.send(customerData);
});

// Route to list the number of times a customer has booked a room
app.get("/rooms/:customer", (req, res) => {
  const customerName = req.params.customer;
  const customerBookings = bookings.filter(
    (booking) => booking.customerName === customerName
  ).map((booking) => {
    const room = rooms.find((room) => room.id === booking.roomId);
    return {
      roomName: room.name,
      customerName: booking.customerName,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingId: booking.id,
      bookingDate: booking.bookingDate,
      status: booking.status,
    };
  });

  if (customerBookings.length === 0) {
    return res.send({
      message: `No bookings made by ${customerName}`,
      count: 0,
    });
  }

  res.send({
    status: "success",
    count: customerBookings.length,
    data: customerBookings,
  });
});

app.listen(3005, () => {
  console.log(`Server is running on http://localhost:3005`);
});
