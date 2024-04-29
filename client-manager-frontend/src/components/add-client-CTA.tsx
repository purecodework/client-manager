import React from "react";
import "../styles/add-client-cta.scss";
import { AddClientCTAProps } from "../types/client";

const AddClientCTA: React.FC<AddClientCTAProps> = ({ onAddClient }) => {
  return (
    <button className="add-client-cta" onClick={onAddClient}>
      Add Client
    </button>
  );
};

export default AddClientCTA;
