const tables = require("../tables");

const booking = async (req, res) => {
  const { formattedDate, selectedStation, selectedVehicle } = req.body;

  try {
    const insertId = await tables.booking_list.create(
      formattedDate,
      selectedVehicle,
      selectedStation
    );
    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ error: "Une erreur s'est produite lors de la réservation." });
  }
};

const browse = async (req, res) => {
  try {
    const bookAvailable = await tables.booking_list.getAll();
    res.json(bookAvailable);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getBookingUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const allBookingForUser = await tables.booking_list.getBookingForUser(
      userId
    );
    res.status(201).json(allBookingForUser);
  } catch (err) {
    res.sendStatus(500);
  }
};

const deleteReservation = async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  try {
    const deleteResult = await tables.booking_list.delete(bookId);
    res.status(201).json({ deleteResult });
  } catch (err) {
    res.sendStatus(500);
  }
};

const getAllBookedDate = async (req, res) => {
  const stationId = req.params.id;
  const { selectedDate } = req.body;
  try {
    const result = await tables.booking_list.getNotBookedDateByStationId(
      stationId,
      selectedDate
    );
    res.status(201).json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  getBookingUser,
  deleteReservation,
  booking,
  getAllBookedDate,
};
