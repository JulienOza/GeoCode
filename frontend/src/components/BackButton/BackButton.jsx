import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./BackButton.scss";

function BackButton({ colorArrow, destination }) {
  const navigate = useNavigate();

  return (
    <button
      className="backButton"
      type="button"
      onClick={() => navigate(destination || -1)}
    >
      <img
        src={colorArrow}
        alt="flèche de retour à la page précédente"
        className="backButtonImg"
      />
    </button>
  );
}

BackButton.propTypes = {
  destination: PropTypes.string.isRequired,
  colorArrow: PropTypes.string.isRequired,
};
export default BackButton;
