import PropTypes from "prop-types";
import type2 from "../../assets/plug-type/ev-plug-type2.svg";
import comboCCS from "../../assets/plug-type/ComboCCSplug.svg";
import chademo from "../../assets/plug-type/ev-plug-chademo.svg";
import electricalPower from "../../assets/electric-power.png";
import button from "../../assets/button.svg";

function CarShow({ carData, counterCar, setcounterCar }) {
  const plugImages = {
    "Type 2": type2,
    "Combo CCS": comboCCS,
    Chademo: chademo,
  };

  return carData[counterCar] ? (
    <section className="carMainContent">
      {carData[counterCar - 1] && (
        <button
          className="nextCar"
          type="button"
          onClick={() => setcounterCar(counterCar - 1)}
        >
          <img
            className="nextCarButton nextCarMirror"
            src={button}
            alt=""
            draggable="false"
          />
          <p className="nextCarText">Voiture</p>
          <p className="nextCarText">précédente</p>
        </button>
      )}
      <figure className="carCardPlug">
        <img
          className="carPlugType"
          src={plugImages[carData[counterCar].plug_type]}
          alt=""
        />
        <figcaption className="carCardText">
          {carData[counterCar].plug_type}
        </figcaption>
      </figure>
      <figure className="carCardPlug">
        <img className="carElectricalPower" src={electricalPower} alt="" />
        <figcaption className="carCardText">Puissance</figcaption>
        <figcaption className="carCardText2">
          {carData[counterCar].max_power}kW
        </figcaption>
      </figure>
      {carData[counterCar + 1] && (
        <button
          className="nextCar"
          type="button"
          onClick={() => setcounterCar(counterCar + 1)}
        >
          <img
            className="nextCarButton"
            src={button}
            alt=""
            draggable="false"
          />
          <p className="nextCarText">Voiture</p>
          <p className="nextCarText">suivante</p>
        </button>
      )}
    </section>
  ) : (
    <p className="textInformationCar">Pas de voiture enregistrée</p>
  );
}
CarShow.propTypes = {
  carData: PropTypes.shape({
    max_power: PropTypes.number.isRequired,
    plug_type: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    car: PropTypes.arrayOf(
      PropTypes.shape({
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  counterCar: PropTypes.number.isRequired,
  setcounterCar: PropTypes.func.isRequired,
};

export default CarShow;
