/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import addPicture from "../../assets/addPicture.svg";

function FormLabel({ label, labelTitle, register, errors, placeholder }) {
  const pictureProfil = (
    <label htmlFor="pictureProfil" className="labelPicture">
      <img
        className="addPicture"
        src={addPicture}
        alt="raccourci pour import fichier portrait"
        draggable="false"
      />
    </label>
  );

  let inputField;

  if (label === "pictureProfil") {
    inputField = (
      <input
        className="inputPictureProfil"
        type="file"
        id="pictureProfil"
        {...register("image", { validate: (value) => value !== "" })}
      />
    );
  } else if (label === "birthdate") {
    inputField = (
      <input
        className="inputSubscribe"
        type="date"
        id={label}
        {...register(label)}
      />
    );
  } else if (label === "gender") {
    inputField = (
      <select className="selectGender" id={label} {...register(label)}>
        <option value="">Choisir un genre</option>
        <option value="Homme">Homme</option>
        <option value="Femme">Femme</option>
        <option value="Ne souhaite pas choisir">Ne souhaite pas choisir</option>
      </select>
    );
  } else {
    inputField = (
      <input
        className="inputSubscribe"
        type={
          label === "password" || label === "confirmPassword"
            ? "password"
            : "text"
        }
        placeholder={placeholder}
        id={label}
        autoComplete={
          label === "password" || label === "confirmPassword"
            ? "new-password"
            : null
        }
        {...register(label)}
      />
    );
  }

  return (
    <>
      {label === "pictureProfil" ? (
        <>
          {inputField}
          {pictureProfil}
        </>
      ) : (
        <>
          <label className="labelSubscribe" htmlFor={label}>
            {labelTitle}
          </label>
          {inputField}
        </>
      )}

      {errors[label] && (
        <p className={`error error${label}`}>{errors[label].message}</p>
      )}
    </>
  );
}

FormLabel.propTypes = {
  label: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
};

FormLabel.defaultProps = {
  placeholder: "",
};

export default FormLabel;
