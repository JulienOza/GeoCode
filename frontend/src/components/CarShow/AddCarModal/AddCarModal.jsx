import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./AddCarModal.scss";

function AddCarModal() {
  const carData = [
    { brand: "Tesla", model: "Model 3" },
    { brand: "Dacia", model: "Spring" },
    { brand: "Renault", model: "Megane E-tech" },
  ];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel("");
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className="addCar">
          Ajouter une voiture
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Ajouter une voiture
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Sélectionnez une marque et un modèle de voiture à ajouter:
          </Dialog.Description>
          <fieldset className="fieldsetBrand">
            <label className="labelBrand" htmlFor="brand">
              Marque
            </label>
            <select
              className="inputBrand"
              id="brand"
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              <option value="">--Choisir une marque-</option>
              {carData.map((e) => (
                <option key={e.brand} value={e.brand}>
                  {e.brand}
                </option>
              ))}
            </select>
          </fieldset>
          {selectedBrand && (
            <fieldset className="fieldsetModel">
              <label className="labelModel" htmlFor="model">
                Modèle
              </label>
              <select
                className="inputModel"
                id="model"
                value={selectedModel}
                onChange={handleModelChange}
              >
                <option value="">--Choisir un modèle-</option>
                {carData
                  .filter((car) => car.brand === selectedBrand)
                  .map((car) =>
                    car.model.length > 0 ? (
                      <option key={car.model} value={car.model}>
                        {car.model}
                      </option>
                    ) : (
                      <option key={car.model} value={car.model}>
                        Pas de modèle
                      </option>
                    )
                  )}
              </select>
            </fieldset>
          )}
          <footer className="carAddButtonContainer">
            <Dialog.Close asChild>
              <button type="button" className="buttonAddCar">
                Ajouter ma voiture
              </button>
            </Dialog.Close>
          </footer>
          <Dialog.Close asChild>
            <button type="button" className="closeButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AddCarModal;
