import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-content">
      <h1 className="not-found-content__title">Zona no encontrada</h1>
      <p className="not-found-content__description">
        La zona a la que intentas acceder no existe
      </p>
      <button
        className="btn btn--primary"
        onClick={() => navigate("/")}
        type="button"
      >
        Volver al inicio
      </button>
    </div>
  );
}
