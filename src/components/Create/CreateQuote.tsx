import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import "./CreateQuote.scss";

function CreateQuote() {
  return (
    <div className="create page">
      <Navbar
        navList={[
          { path: "/create-quote/form", label: "New Quote" },
          { path: "/create-quote/list", label: "Your Creations" },
        ]}
      />

      <Outlet />
    </div>
  );
}

export default CreateQuote;
