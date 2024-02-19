import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CarShow from "../../components/CarShow/CarShow";
import DeleteCarConfirmationModal from "../../components/CarShow/DeleteCarConfirmationModal/DeleteCarConfirmationModal";
import "./Car.scss";
import Teslamodel3 from "../../assets/cars/teslaModel3.png";
import PeugeotE208 from "../../assets/cars/PeugeotE208.png";
import DaciaSpring from "../../assets/cars/daciaSpring.png";
import mg4 from "../../assets/cars/mg4.png";
import zoe from "../../assets/cars/renaultZOE.png";
import renaultMegane from "../../assets/cars/renaultMegane.png";
import nissanLeaf from "../../assets/cars/nissanLeaf.png";
import kiaNiro from "../../assets/cars/kiaNiro.png";
import fiatE500 from "../../assets/cars/fiatE500.png";
import miniCooperSE from "../../assets/cars/miniCooperSE.png";
import AddCarModal from "../../components/CarShow/AddCarModal/AddCarModal";
import BackButton from "../../components/BackButton/BackButton";
import arrowDark from "../../assets/arrowBackDark.svg";
import useStore from "../../store/AuthProvider";

function Car() {
  const { auth } = useStore();

  const [counterCar, setcounterCar] = useState(0);

  const carData = useLoaderData();
  const carImages = {
    "Modele 3": Teslamodel3,
    Spring: DaciaSpring,
    "Megane E-tech": renaultMegane,
    MG4: mg4,
    "500e": fiatE500,
    "E-208": PeugeotE208,
    "Cooper SE": miniCooperSE,
    ZOE: zoe,
    Leaf: nissanLeaf,
    Niro: kiaNiro,
  };

  return (
    <main className="carTopPage">
      <header className="carTopPageHeader">
        <h1 className="carTopPageTitle">Hello, {auth.user.firstname} !</h1>
        {carData[counterCar] && (
          <>
            <p className="carTopPageSubtitle">
              {`${carData[counterCar].brand} ${carData[counterCar].model}`}
            </p>
            <img
              className="carModel"
              src={carImages[carData[counterCar].model]}
              alt=""
            />
          </>
        )}
      </header>
      <CarShow
        carData={carData}
        counterCar={counterCar}
        setcounterCar={setcounterCar}
      />
      <footer className="ButtonShowCarContainer">
        <AddCarModal />
        <DeleteCarConfirmationModal carData={carData} counterCar={counterCar} />
      </footer>
      <BackButton colorArrow={arrowDark} />
    </main>
  );
}

export default Car;
