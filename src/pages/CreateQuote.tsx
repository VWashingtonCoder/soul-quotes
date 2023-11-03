import { useUser, useQuote } from "../context-hooks";
import CreateForm from "../forms/CreateForm";
import FavoritesTable from "../components/FavoritesTable";

function CreateQuote() {
  const { allQuotes } = useQuote();
  const { activeUser } = useUser();
  const userCreations = allQuotes.filter(
    (quote) => quote.creatorId === activeUser?.userId
  );

  return (
    <div className="create page">
      <header className="page header">
        <h2 className="page-title">Create a Quote</h2>
      </header>

      <div className="page-content">
        <CreateForm />

        <div className="creation-list">
          <h3 className="page-subtitle">Your Creations</h3>
          <FavoritesTable favoriteList={userCreations} />
        </div>
      </div>
    </div>
  );
}

export default CreateQuote;
