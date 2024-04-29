import { ClientListProps } from "../types/client";
import ClientColumn from "./client-column";
import "../styles/client-list.scss";

const ClientList: React.FC<ClientListProps> = ({
  clients,
  isLoading,
  callback,
}) => {
  return (
    <div className="client-list">
      {!isLoading && (
        <table className="client-list__table">
          <tbody>
            {clients.map((client) => (
              <ClientColumn
                id={client.id.toString()}
                key={client.id}
                client={client}
                callback={callback}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ClientList;
