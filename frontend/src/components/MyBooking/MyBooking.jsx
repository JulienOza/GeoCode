import "./MyBooking.scss";
import PropTypes from "prop-types";
import type2 from "../../assets/plug-type/ev-plug-type2.svg";
import comboCCS from "../../assets/plug-type/ComboCCSplug.svg";
import chademo from "../../assets/plug-type/ev-plug-chademo.svg";
import DeleteBookingModal from "../DeleteBookingModal/DeleteBookingModal";

const plugImages = {
  type2,
  comboCCS,
  chademo,
};

function MyBooking({ userBook, setDeleted, deleted }) {
  return (
    <section className="allBook">
      <section className="bookingStationInfos">
        <h2 className="bookingName">{userBook.station_name}</h2>
        <p className="date">
          Date :{" "}
          <time className="dateChoose">
            {new Date(userBook.date).toLocaleDateString()}
          </time>
        </p>
        <p className="time">
          Horaire :{" "}
          <time className="timeChoose">
            {new Date(userBook.date).toLocaleTimeString()}
          </time>
        </p>
        <p className="adressStation">
          Adresse :
          <span className="adressStationChoose">{userBook.adress}</span>
        </p>
        <p>Types de prises :</p>
        <ul className="plugList">
          <li>
            <p className="typePlugItem">- {userBook.name}</p>
            <img className="imgPlug" src={plugImages[userBook.name]} alt="" />
          </li>
        </ul>
        <p className="chargepointPower">
          Puissance de la borne :
          <span className="fullPower"> {userBook.max_power}</span> kW
        </p>
        <DeleteBookingModal
          deleted={deleted}
          setDeleted={setDeleted}
          userBook={userBook}
        />
      </section>
    </section>
  );
}

MyBooking.propTypes = {
  userBook: PropTypes.shape({
    station_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    adress: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    max_power: PropTypes.number.isRequired,
    bookId: PropTypes.number.isRequired,
  }).isRequired,
  deleted: PropTypes.bool.isRequired,
  setDeleted: PropTypes.func.isRequired,
};

export default MyBooking;
