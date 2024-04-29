import { useState, useEffect } from "react";
import { Client } from "../../types/client";

const useSearchName = (searchTerm: string, trigger: boolean) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      if (searchTerm) {
        setIsLoading(true);
        setError(null);

        try {
          console.log(process.env.REACT_APP_API_URL);
          const response = await fetch(
            `${
              process.env.REACT_APP_API_URL
            }/clients/search?name=${encodeURIComponent(searchTerm)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setClients(data.clients || []);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setClients([]);
      }
    };

    fetchClients();
  }, [searchTerm, trigger]);

  return { clients, isLoading, error };
};

export default useSearchName;
