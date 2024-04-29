export interface Client {
  id: number;
  name: string;
  dateOfBirth: string;
  mainLanguage: string;
  secondaryLanguage?: string;
  fundingSource: string;
}

export interface ClientColumnProps {
  id: string;
  client: Client;
  callback: () => void;
}

export interface ClientListProps {
  clients: Client[];
  isLoading: Boolean;
  callback: () => void;
}

export interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AddClientCTAProps {
  onAddClient: () => void;
}

export interface ClientFormData {
  name: string;
  dateOfBirth: string;
  mainLanguage: string;
  secondaryLanguage: string;
  fundingSource: string;
}
