import React, { useState } from "react";
import { Client, ClientColumnProps } from "../types/client";
import useUpdateClient from "../hooks/use-client-hooks/use-update-client";
import useDeleteClient from "../hooks/use-client-hooks/use-delete-client";
import "../styles/client-column.scss";

const ClientColumn: React.FC<ClientColumnProps> = ({
  id,
  client,
  callback,
}) => {
  const { updateClient, updateError } = useUpdateClient();
  const { deleteClient, deleteError } = useDeleteClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState<Client>(client);
  const [isDelete, setIsDelete] = useState(false);

  const fundingSourceOptions = ["NDIS", "HCP", "CHSP", "DVA", "HACC"];

  const handleEditToggle = () => {
    if (isEditing === true) {
      callback();
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditedClient({ ...editedClient, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateClient(editedClient);
      setIsEditing(false);
      if (!updateError) {
        callback();
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    if (isDelete) {
      try {
        await deleteClient(client.id);
        if (!deleteError) {
          callback();
        }
      } catch (error) {}
    } else {
      setIsDelete(true);
    }
  };

  return (
    <tr className="client-column" id={id}>
      <span className="client-column__error">
        {updateError}
        {deleteError}
      </span>
      {isEditing ? (
        <>
          <td>
            <span className="td-span">Name:</span>
            <input
              type="text"
              name="name"
              value={editedClient.name}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <span>Date Of Birth:</span>
            <input
              type="date"
              name="dateOfBirth"
              value={editedClient.dateOfBirth}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <span>Main Language:</span>
            <input
              type="text"
              name="mainLanguage"
              value={editedClient.mainLanguage}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <span>Secondary Language</span>
            <input
              type="text"
              name="secondaryLanguage"
              value={editedClient.secondaryLanguage}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <span>Funding Source</span>
            <select
              name="fundingSource"
              value={editedClient.fundingSource}
              onChange={handleInputChange}
            >
              {fundingSourceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </td>
          <td className="client-column__actions">
            <button className="client-column__save-btn" onClick={handleSave}>
              Save
            </button>
            <button
              className="client-column__cancel-btn"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>
            <span className="td-span">name:</span>{" "}
            <span>{editedClient.name}</span>
          </td>
          <td>
            <span>date of birth:</span>
            {editedClient.dateOfBirth}
          </td>
          <td>
            <span>main language:</span>
            {editedClient.mainLanguage}
          </td>
          <td>
            <span>secondary language:</span>
            {editedClient.secondaryLanguage || ""}
          </td>
          <td>
            <span>funding source</span>
            {editedClient.fundingSource}
          </td>
          <td className="client-column__actions">
            <button
              className="client-column__edit-btn"
              onClick={isDelete ? () => callback() : () => handleEditToggle()}
            >
              {isDelete ? "Cancel" : "Edit"}
            </button>
            <button
              className={`client-column__delete-btn${
                isDelete ? "--confirm" : ""
              }`}
              onClick={handleDelete}
            >
              {isDelete ? "Confirm" : "Delete"}
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default ClientColumn;
