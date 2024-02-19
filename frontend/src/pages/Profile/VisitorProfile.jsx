import NavigationButton from "../Home/NavigationButton";
import BackButton from "../../components/BackButton/BackButton";
import arrowDark from "../../assets/arrowBackDark.svg";
import "./VisitorProfile.scss";

function VisitorProfile() {
  return (
    <nav className="profile">
      <NavigationButton
        destination="/subscribe"
        text="S'enregistrer"
        buttonStylization="style-button2"
      />
      <NavigationButton
        destination="/connection"
        text="Se connecter"
        buttonStylization="style-button2"
      />
      <BackButton destination="/map" colorArrow={arrowDark} />
    </nav>
  );
}

export default VisitorProfile;
