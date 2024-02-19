import { useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import BackButton from "../../components/BackButton/BackButton";
import "./UserInformations.scss";
import AddressIcon from "../../assets/address-21a89a.png";
import GenderIcon from "../../assets/gender-mark-2-21a89a.png";
import EmailIcon from "../../assets/email-21a89a.png";
import BirthdayIcon from "../../assets/birthday-cake-21a89a.png";
import userPicturePath from "../../assets/user.png";
import arrowDark from "../../assets/arrowBackDark.svg";
import NavigationButton from "../Home/NavigationButton";

function UserInformations() {
  const connectedUser = useLoaderData();
  const formatedBirthdate = format(
    new Date(connectedUser.birthdate),
    "dd/MM/yyyy"
  );

  return (
    <section className="viewport_userinformations">
      <img className="userpicture" alt="" src={userPicturePath} />
      <p className="username firstname">{connectedUser.firstname}</p>
      <p className="username lastname">{connectedUser.lastname}</p>
      <img className="icon birthdate_icon" alt="" src={BirthdayIcon} />
      <p className="userinfo birthdate">{formatedBirthdate}</p>
      <img className="icon gender_icon" alt="" src={GenderIcon} />
      <p className="userinfo gender">{connectedUser.gender}</p>
      <img className="icon email_icon" alt="" src={EmailIcon} />
      <p className="userinfo email">{connectedUser.email}</p>
      <img className="icon address_icon" alt="" src={AddressIcon} />
      <p className="userinfo zipcode">{connectedUser.zipcode}</p>
      <p className="userinfo city">{connectedUser.city}</p>
      <NavigationButton
        text="Modifier"
        buttonStylization="style-button"
        destination="/editprofile"
      />
      <BackButton colorArrow={arrowDark} />
    </section>
  );
}

export default UserInformations;
