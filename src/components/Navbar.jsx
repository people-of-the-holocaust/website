// Navbar component at the top of each page, buttons to move between pages
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="top-bar">
      <div className="brand">MARQUETTE UNIVERSITY</div>
      <div className="brand">BADER PHILANTHROPIES / USHMM</div>
      <div className="navigation-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/people")}>The People</button>
        <button onClick={() => navigate("/places")}>The Places</button>
      </div>
    </div>
  );
}