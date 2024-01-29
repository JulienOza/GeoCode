import React, { useState } from "react";
import Calendar from "react-calendar";
import "./ChargepointCalendar.scss";
import { format } from "date-fns";
import useStore from "../../store/AuthProvider";

function ChargepointCalendar() {
  const booking = { date: "2024-01-10 12:00" };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const { setOpenBooking } = useStore();

  const user = {
    id: 1,
    name: "Naomi Watts",
    vehicle: ["Renault Megane ETECH"],
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const generateTimeSlots = () => {
    const startTime = new Date(selectedDate);
    startTime.setHours(1, 0, 0);

    const endTime = new Date(selectedDate);
    endTime.setHours(23, 30, 0);

    const timeSlots = [];
    const currentTime = new Date(startTime);

    while (currentTime <= endTime) {
      const formattedDate = format(currentTime, "yyyy-MM-dd HH:mm", {
        timeZone: "Europe/Paris",
      });
      if (formattedDate !== booking.date) {
        timeSlots.push(new Date(formattedDate));
      }
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return timeSlots;
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const isFormValid = selectedDate && selectedTime && selectedVehicle;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.info("Réservation validée :", {
        selectedDate,
        selectedTime,
        selectedVehicle,
      });
    }
  };

  return (
    <div className="allElements">
      <h2 className="titleCard">Choisir un créneau</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="allElementsCalendar">
          <legend className="selectDate">Choisir une date :</legend>
          <Calendar
            className="calendar"
            onChange={handleDateChange}
            value={selectedDate}
          />
          {selectedDate && (
            <>
              <time className="confirmDate">Votre date sélectionnée :</time>
              <time className="selectedDateDisplay">
                {selectedDate.toLocaleDateString()}
              </time>
            </>
          )}
        </fieldset>

        {generateTimeSlots()[0] ? (
          <time className="timeVehicule">
            <label htmlFor="selectTime" className="selectTime">
              Choisir un créneau horaire :
            </label>
            <select
              className="slot"
              id="selectTime"
              onChange={(e) => handleTimeSelect(new Date(e.target.value))}
            >
              <option value="">Sélectionnez un créneau</option>
              {generateTimeSlots().map((time) => (
                <option key={generateTimeSlots} value={time}>
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </option>
              ))}
            </select>

            {selectedTime && (
              <p className="confirmSlot">
                Votre créneau horaire sélectionné :{" "}
                {selectedTime.toLocaleTimeString()}
              </p>
            )}

            <label htmlFor="selectVehicle" className="selectVehicle">
              Choisir un véhicule :
            </label>
            <select
              className="vehicle"
              id="selectVehicle"
              onChange={(e) => handleVehicleSelect(e.target.value)}
            >
              <option value="">Sélectionnez votre véhicule</option>
              {user.vehicle.map((vehicle) => (
                <option key={user.id} value={vehicle}>
                  {vehicle}
                </option>
              ))}
            </select>
          </time>
        ) : (
          <p>Pas de créneau disponible</p>
        )}

        {isFormValid && (
          <button
            type="submit"
            className="submitButton"
            onClick={() => {
              setOpenBooking({
                page1: false,
                page2: true,
                page3: false,
              });
            }}
          >
            Valider la réservation
          </button>
        )}
      </form>
    </div>
  );
}

export default ChargepointCalendar;
