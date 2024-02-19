/* eslint-disable react/jsx-props-no-spreading */
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { format } from "date-fns";
import "./EditProfile.scss";
import BackgroundAsideType from "../../components/BackgroundAsideType/BackgroundAsideType";
import FormLabel from "../../components/FormLabel/FormLabel";

function EditProfile() {
  const navigate = useNavigate();
  const validationSchema = Joi.object({
    lastName: Joi.string().min(1).max(255).required().messages({
      "string.empty": "Votre nom est requis",
      "string.min": "Le nom doit contenir au moins {#limit} caractères",
      "string.max": "Le nom ne doit pas dépasser {#limit} caractères",
    }),
    firstName: Joi.string().min(1).max(255).required().messages({
      "string.empty": "Votre prénom est requis",
      "string.min": "Le prénom doit contenir au moins {#limit} caractères",
      "string.max": "Le prénom ne doit pas dépasser {#limit} caractères",
    }),
    image: Joi.any(),
    email: Joi.string().email({ tlds: false }).max(255).required().messages({
      "string.empty": "Votre email est requis",
      "string.email": "L'email doit être valide",
      "string.max": "L'email ne doit pas dépasser {#limit} caractères",
    }),
    gender: Joi.string().min(1).max(255).required().messages({
      "string.empty": "Le genre est requis",
    }),
    birthdate: Joi.string().min(1).max(255).required().messages({
      "string.empty": "La date de naissance est requise",
    }),
    zipcode: Joi.string()
      .pattern(/^\d{5}$/)
      .required()
      .messages({
        "string.empty": "Le code postal est requis",
        "string.pattern.base":
          "Le code postal doit contenir exactement 5 chiffres",
      }),
    city: Joi.string().min(1).max(255).required().messages({
      "string.empty": "La ville est requise",
    }),
  }).required();

  const connectedUser = useLoaderData();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      lastName: connectedUser.lastname,
      firstName: connectedUser.firstname,
      email: connectedUser.email,
      gender: connectedUser.gender,
      birthdate: format(new Date(connectedUser.birthdate), "yyyy-MM-dd"),
      zipcode: connectedUser.zipcode.toString(),
      city: connectedUser.city,
    },
  });

  function onSubmit(data) {
    try {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <BackgroundAsideType title="Modifier Profil">
      <form className="subscribeForm" onSubmit={handleSubmit(onSubmit)}>
        <FormLabel
          label="lastName"
          labelTitle="Nom"
          register={register}
          errors={errors}
          placeholder="Tapez votre nom ici"
        />
        <FormLabel
          label="firstName"
          labelTitle="Prénom"
          register={register}
          errors={errors}
          placeholder="Tapez votre prénom ici"
        />
        <FormLabel
          label="pictureProfil"
          labelTitle="Photo de Profil"
          register={register}
          errors={errors}
        />
        <FormLabel
          label="email"
          labelTitle="Email"
          register={register}
          errors={errors}
          placeholder="Tapez votre email ici"
        />
        <FormLabel
          label="gender"
          labelTitle="Genre"
          register={register}
          errors={errors}
        />
        <FormLabel
          label="birthdate"
          labelTitle="Date de naissance"
          register={register}
          errors={errors}
        />
        <FormLabel
          label="zipcode"
          labelTitle="Code Postal"
          register={register}
          errors={errors}
          placeholder="Tapez votre code postal ici"
        />
        <FormLabel
          label="city"
          labelTitle="Ville"
          register={register}
          errors={errors}
          placeholder="Tapez votre ville ici"
        />
        <button className="submit" type="submit">
          Envoyer
        </button>
      </form>
    </BackgroundAsideType>
  );
}

export default EditProfile;
