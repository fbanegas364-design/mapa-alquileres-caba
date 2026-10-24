import { useState, useCallback } from 'react';
import { Map } from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { IconLayer } from '@deck.gl/layers';
import 'maplibre-gl/dist/maplibre-gl.css';

// ─── Vista inicial: centrada en Buenos Aires (CABA) ───
const INITIAL_VIEW_STATE = {
  longitude: -58.42,
  latitude: -34.60,
  zoom: 12,
  pitch: 0,
  bearing: 0,
};

// ─── Colores por categoría (RGBA) ───
const CATEGORY_COLORS = {
  Alta:  [56, 189, 248, 240],   // celeste
  Media: [250, 204, 21, 240],   // amarillo
  Baja:  [248, 113, 113, 240],  // rojo suave
};

// ─── Ícono de casa SVG (blanco, se tiñe con getColor + mask) ───
const HOUSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path d="M64 10 L8 58 L24 58 L24 114 L52 114 L52 78 L76 78 L76 114 L104 114 L104 58 L120 58 Z" fill="white"/><rect x="52" y="78" width="24" height="36" rx="2" fill="rgba(0,0,0,0.25)"/></svg>`;
const HOUSE_ICON_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(HOUSE_SVG)}`;

const ICON_MAPPING = {
  house: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

// Mapa base gratuito (sin API key)
const MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export default function MapView({ propiedades, onClickProperty }) {
  const [hoverInfo, setHoverInfo] = useState(null);

  // ─── Capa IconLayer con casitas ───
  const layers = [
    new IconLayer({
      id: 'propiedades-layer',
      data: propiedades,
      pickable: true,
      iconAtlas: HOUSE_ICON_URL,
      iconMapping: ICON_MAPPING,
      getIcon: () => 'house',
      getPosition: (d) => [d.longitud, d.latitud],
      getSize: 32,
      sizeMinPixels: 22,
      sizeMaxPixels: 48,
      getColor: (d) => CATEGORY_COLORS[d.categoria] ?? [200, 200, 200, 220],
      // Hover → tooltip
      onHover: (info) => {
        setHoverInfo(info.object ? info : null);
      },
      // Click → modal de detalle
      onClick: (info) => {
        if (info.object) {
          onClickProperty(info.object);
        }
      },
    }),
  ];

  const getTooltip = useCallback(() => null, []); // tooltip custom abajo

  return (
    <div className="map-container">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={getTooltip}
        getCursor={({ isHovering }) => (isHovering ? 'pointer' : 'grab')}
      >
        <Map reuseMaps mapStyle={MAP_STYLE} />
      </DeckGL>

      {/* Tooltip flotante en hover */}
      {hoverInfo?.object && (
        <div
          className="map-tooltip"
          style={{
            left: hoverInfo.x + 12,
            top: hoverInfo.y - 12,
          }}
        >
          <strong>{hoverInfo.object.nombre}</strong>
          <br />
          $ {hoverInfo.object.valor.toLocaleString('es-AR')} ·{' '}
          {hoverInfo.object.categoria}
          <br />
          <em style={{ opacity: 0.7, fontSize: '0.75rem' }}>
            Clic para ver todos los detalles
          </em>
        </div>
      )}
    </div>
  );
}
