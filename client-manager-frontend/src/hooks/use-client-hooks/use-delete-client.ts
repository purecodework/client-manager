import { useState } from "react";

const useDeleteClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const deleteClient = async (clientId: number) => {
    setIsLoading(true);
    setDeleteError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/clients/${clientId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setDeleteError(errorData.errors[0]);
        throw new Error(errorData.errors[0]);
      }
    } catch (error: any) {
      if (!error.response) {
        const errorMessage =
          error.message || "An error occurred while updating the client";
        setDeleteError(errorMessage);
        throw new Error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteClient, deleteError, isLoading };
};

export default useDeleteClient;
