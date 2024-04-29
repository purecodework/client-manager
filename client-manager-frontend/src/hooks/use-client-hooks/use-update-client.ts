import { useState } from "react";
import { Client } from "../../types/client";

const useUpdateClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateClient = async (client: Client) => {
    setIsLoading(true);
    setUpdateError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/clients/${client.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(client),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setUpdateError(errorData.errors[0]);
        throw new Error(errorData.errors[0]);
      } else {
        await response.json();
      }
    } catch (error: any) {
      if (!error.response) {
        const errorMessage =
          error.message || "An error occurred while updating the client";
        setUpdateError(errorMessage);
        throw new Error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateClient, isLoading, updateError };
};

export default useUpdateClient;
