import { useNavigate } from "react-router-dom";
import NavigationButton from "../Home/NavigationButton";
import BackButton from "../../components/BackButton/BackButton";
import "./ConnectedProfile.scss";
import profilePict from "../../assets/user.png";
import arrowDark from "../../assets/arrowBackDark.svg";
import { logout } from "../../services/auth";
import useStore from "../../store/AuthProvider";

function Profile() {
  const navigate = useNavigate();
  const { setAuth } = useStore();
  const { auth } = useStore();
  return (
    <main>
      <section className="headband">
        <img className="profilePict" src={profilePict} alt="vue du profil" />
        <h2 className="titleSize">{auth.user.firstname}</h2>
      </section>
      <nav className="profile">
        <NavigationButton
          destination="/userinformations"
          text="Mes informations"
          buttonStylization="style-button2"
        />
        <NavigationButton
          destination="/car"
          text="Véhicules"
          buttonStylization="style-button2"
        />
        <NavigationButton
          destination="/mybookings"
          text="Mes réservations"
          buttonStylization="style-button2"
        />
        <button
          type="button"
          className="style-button2"
          onClick={() => {
            logout();
            navigate("/map");
            setAuth({
              user: { status: "visitor" },
            });
          }}
        >
          Se déconnecter
        </button>
        <BackButton destination="/map" colorArrow={arrowDark} />
      </nav>
    </main>
  );
}

export default Profile;
