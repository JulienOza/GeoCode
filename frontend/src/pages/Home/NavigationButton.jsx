import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function NavigationButton({ text, destination, buttonStylization }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(destination);
  };
  return (
    <button
      className={`${buttonStylization}`}
      type="button"
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
}

NavigationButton.propTypes = {
  text: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  buttonStylization: PropTypes.string.isRequired,
};

export default NavigationButton;
