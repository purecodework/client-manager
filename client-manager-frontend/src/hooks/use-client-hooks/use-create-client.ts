import { useState } from "react";
import { ClientFormData } from "../../types/client";

const useCreateClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createdClient, setCreatedClient] = useState<ClientFormData | null>(
    null
  );

  const createClient = async (client: ClientFormData) => {
    setIsLoading(true);
    setCreateError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setCreateError(errorData.errors[0]);
        throw new Error(errorData.errors[0]);
      } else {
        const data = await response.json();
        setCreatedClient(data.client);
      }
    } catch (error: any) {
      if (!error.response) {
        const errorMessage =
          error.message || "An error occurred while updating the client";
        setCreateError(errorMessage);
        throw new Error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createClient, createdClient, isLoading, createError };
};

export default useCreateClient;
