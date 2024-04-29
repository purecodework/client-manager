import React, { useState, useEffect } from "react";
import { AddClientModalProps } from "../types/client";
import { ClientFormData } from "../types/client";
import useCreateClient from "../hooks/use-client-hooks/use-create-client";
import "../styles/add-client-modal.scss";
import success from "../../public/success.svg";

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose }) => {
  const { createClient, createError } = useCreateClient();

  const [stepIndex, setStepIndex] = useState<number>(1);
  const fundingSourceOptions = ["NDIS", "HCP", "CHSP", "DVA", "HACC"];
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    dateOfBirth: "",
    mainLanguage: "",
    secondaryLanguage: "",
    fundingSource: "",
  });
  const [error, setError] = useState<string>("");
  const [isClientCreated, setIsClientCreated] = useState<boolean>(false);

  const prevStep = (): void => {
    if (stepIndex > 1) {
      setStepIndex((stepIndex) => stepIndex - 1);
      setError("");
    }
  };

  const nextStep = (): void => {
    if (stepIndex === 1) {
      if (formData.name.trim() === "") {
        setError("Name cannot be empty");
        return;
      }
      if (!isValidDate(formData.dateOfBirth)) {
        setError("Invalid date format. Please use YYYY-MM-DD");
        return;
      }
    } else if (stepIndex === 2) {
      if (formData.mainLanguage.trim() === "") {
        setError("Primary Language cannot be empty");
        return;
      }
    } else if (stepIndex === 3) {
      if (formData.fundingSource === "") {
        setError("Please select a funding source");
        return;
      }
    }

    if (stepIndex < 3) {
      setStepIndex((stepIndex) => stepIndex + 1);
      setError("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFundingSourceSelect = (source: string): void => {
    setFormData((prevData) => ({ ...prevData, fundingSource: source }));
  };

  const handleCreated = () => {
    setFormData({
      name: "",
      dateOfBirth: "",
      mainLanguage: "",
      secondaryLanguage: "",
      fundingSource: "",
    });
    setError("");
    setStepIndex(1);
    setIsClientCreated(false);
    onClose();
  };

  const handleConfirmCreateClient = async (): Promise<void> => {
    try {
      await createClient(formData);
      if (!createError) {
        setIsClientCreated(true);
      } else {
        setError(createError);
      }
    } catch (error) {
      setError("There was a problem creating the client. Please try again.");
    }
  };

  const isValidDate = (dateString: string): boolean => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }
    const date = new Date(dateString);
    const isValid = !isNaN(date.getTime());
    return isValid;
  };

  useEffect(() => {
    if (createError) {
      setError(createError);
    }
  }, [createError]);

  return (
    <div
      className={`add-client-modal ${
        isOpen ? "add-client-modal--is-open" : ""
      }`}
    >
      <div className="add-client-modal__overlay" onClick={onClose}></div>
      <div className="add-client-modal__content">
        <button className="add-client-modal__close-btn" onClick={onClose}>
          ×
        </button>

        <div className="add-client-modal__controls">
          {stepIndex > 1 && !isClientCreated && (
            <button onClick={prevStep}>prev</button>
          )}
          {stepIndex < 3 && !isClientCreated && (
            <button onClick={nextStep}>next</button>
          )}
        </div>

        <div className="add-client-modal__steps-count">
          step <span>{stepIndex}</span>/3
        </div>

        {stepIndex === 1 && (
          <div className="add-client-modal__step">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label>Date of Birth (YYYY-MM-DD):</label>
            <input
              type="text"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
            {error && <div className="add-client-modal__error">{error}</div>}
          </div>
        )}

        {stepIndex === 2 && (
          <div className="add-client-modal__step">
            <label>Main Language:</label>
            <input
              type="text"
              name="mainLanguage"
              value={formData.mainLanguage}
              onChange={handleInputChange}
            />

            <label>Secondary Language:</label>
            <input
              type="text"
              name="secondaryLanguage"
              value={formData.secondaryLanguage}
              onChange={handleInputChange}
            />

            {error && <div className="add-client-modal__error">{error}</div>}
          </div>
        )}

        {stepIndex === 3 && !isClientCreated && (
          <div className="add-client-modal__step">
            Choose the Priamry Funding Source
            <div className="add-client-modal__funding-options">
              {fundingSourceOptions.map((option) => (
                <button
                  key={option}
                  className={`add-client-modal__funding-button ${
                    formData.fundingSource === option
                      ? "add-client-modal__funding-button--selected"
                      : ""
                  }`}
                  onClick={() => handleFundingSourceSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className={`add-client-modal__submit-btn${
                !formData.fundingSource ? "--disabled" : ""
              }`}
              onClick={handleConfirmCreateClient}
              disabled={!formData.fundingSource}
            >
              Confirm
            </button>
          </div>
        )}

        {isClientCreated && (
          <div className="add-client-modal__success">
            <img src={success} alt="Description of SVG" />
            <button
              className="add-client-modal__client-created-btn"
              onClick={handleCreated}
            >
              Client Created
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddClientModal;
