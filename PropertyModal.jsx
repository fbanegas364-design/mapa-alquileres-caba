/**
 * PropertyModal – Panel modal con todos los detalles de una propiedad.
 * Se abre al hacer clic sobre un punto del mapa.
 */
export default function PropertyModal({ property, onClose }) {
  if (!property) return null;

  const {
    nombre,
    categoria,
    valor,
    fecha,
    descripcion,
    latitud,
    longitud,
  } = property;

  const categoryClass = categoria?.toLowerCase() ?? '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evita cerrar al clicar dentro
      >
        {/* Header */}
        <div className="modal-header">
          <h2>{nombre}</h2>
          <button className="modal-close" onClick={onClose} title="Cerrar">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Precio */}
          <div className="modal-field">
            <span className="field-label">Precio</span>
            <span className="modal-price">
              $ {valor?.toLocaleString('es-AR')}
            </span>
          </div>

          {/* Categoría */}
          <div className="modal-field">
            <span className="field-label">Categoría</span>
            <span className={`modal-category ${categoryClass}`}>
              {categoria}
            </span>
          </div>

          {/* Fecha */}
          <div className="modal-field">
            <span className="field-label">Fecha de publicación</span>
            <span className="field-value">
              {fecha
                ? new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '—'}
            </span>
          </div>

          {/* Descripción */}
          <div className="modal-field">
            <span className="field-label">Descripción</span>
            <span className="field-value">{descripcion || '—'}</span>
          </div>

          {/* Coordenadas */}
          <div className="modal-field">
            <span className="field-label">Coordenadas</span>
            <span className="field-value" style={{ fontFamily: 'monospace' }}>
              {latitud?.toFixed(4)}, {longitud?.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
