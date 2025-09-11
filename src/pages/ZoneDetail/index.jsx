import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "@/app/store";
import { EditZoneForm } from "@/entities/Zone/EditZoneForm";
import { getSubtitle } from "@/entities/ZoneCard/lib/zoneCardUtilities";
import { NotFoundPage } from "@/pages/NotFound";
import "@/entities/ZoneCard/styles/ZoneCard.css";
import "./ZoneDetail.css";

export function ZoneDetailPage() {
  const { zoneId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const zone = useAppStore((state) => state.zones.find((z) => z.id === zoneId));
  const toggleZone = useAppStore((state) => state.toggleZone);
  const updateZone = useAppStore((state) => state.updateZone);
  const deleteZone = useAppStore((state) => state.deleteZone);

  if (!zone) {
    return <NotFoundPage />;
  }

  const subtitle = getSubtitle(zone);

  const handleTogglePower = () => {
    toggleZone(zone.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (newName, newDesiredTemp) => {
    updateZone(zone.id, {
      name: newName,
      desiredTemp: newDesiredTemp,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = confirm(
      `¿Estás seguro de que quieres eliminar la zona "${zone.name}"?\n\nEsta acción no se puede deshacer.`
    );
    if (confirmed) {
      deleteZone(zone.id);
      navigate("/");
    }
  };
  return (
    <section>
      <header className="zone-detail__header">
        <button
          className="zone-detail__back-btn"
          onClick={() => navigate("/")}
          aria-label="Volver al inicio"
        >
          ← Volver
        </button>

        <div className="zone-detail__actions">
          {!isEditing && (
            <>
              <button
                className="zc-power"
                aria-pressed={zone.power}
                aria-label={zone.power ? "Apagar" : "Encender"}
                onClick={handleTogglePower}
                type="button"
                title={zone.power ? "Apagar zona" : "Encender zona"}
              >
                <div className="zc-power__icon" aria-hidden="true" />
              </button>
              <button
                className="btn btn--secondary"
                onClick={handleEdit}
                title="Editar zona"
              >
                ✎ Editar
              </button>
              <button
                className="btn btn--danger"
                onClick={handleDelete}
                title="Eliminar zona"
              >
                🗑 Eliminar
              </button>
            </>
          )}
        </div>
      </header>

      <main className="zone-detail__content">
        <h1 className="zone-detail__title">{zone.name}</h1>

        <div className="zone-detail__temperature">
          <span className="temperature__current">{zone.temperature}°</span>
          <span className="temperature__desired">{subtitle}</span>
        </div>
      </main>

      <EditZoneForm
        zone={zone}
        isOpen={isEditing}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    </section>
  );
}
