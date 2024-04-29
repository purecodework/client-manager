import { useState } from "react";
import useDebounce from "./hooks/utils-hooks/use-debounce";
import useSearchName from "./hooks/use-client-hooks/use-seatch-name";
import SearchBar from "./components/search-bar";
import AddClientCTA from "./components/add-client-CTA";
import ClientList from "./components/client-list";
import "../src/styles/app.scss";
import logo from "../public/logo.png";
import AddClientModal from "./components/add-client-modal";

function App() {
  const [searchName, setSearchName] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const debouncedSearchName = useDebounce(searchName, 1000);

  const handleChange = (e: any) => {
    setSearchName(e.target.value);
  };

  const handleUpdate = () => {
    setSearchTrigger((prevTrigger) => !prevTrigger);
  };

  const { clients, isLoading } = useSearchName(
    debouncedSearchName,
    searchTrigger
  );

  return (
    <div className="app">
      <div className="app__header">
        <img src={logo} alt="My Description" />
        <div className="app__client-actions">
          <SearchBar value={searchName} onChange={handleChange} />
          <AddClientCTA onAddClient={toggleModal} />
          <AddClientModal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
      </div>

      <ClientList
        clients={clients}
        isLoading={isLoading}
        callback={handleUpdate}
      />
    </div>
  );
}

export default App;
