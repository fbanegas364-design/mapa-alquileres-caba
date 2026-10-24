import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import KpiBar from './components/KpiBar';
import MapView from './components/MapView';
import PropertyModal from './components/PropertyModal';

export default function App() {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // ─── Fetch de datos desde Supabase ───
  useEffect(() => {
    async function fetchData() {
      const { data, error: fetchError } = await supabase
        .from('propiedades')
        .select('*')
        .order('id', { ascending: true });

      if (fetchError) {
        console.error('Error al cargar propiedades:', fetchError);
        setError(fetchError.message);
      } else {
        setPropiedades(data ?? []);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // ─── KPIs calculados dinámicamente ───
  const totalPropiedades = propiedades.length;

  const precioPromedio =
    totalPropiedades > 0
      ? Math.round(
          propiedades.reduce((sum, p) => sum + p.valor, 0) / totalPropiedades,
        )
      : 0;

  const categoriasAltas = propiedades.filter(
    (p) => p.categoria === 'Alta',
  ).length;

  // ─── Render ───
  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-screen">
          <div className="spinner" />
          <span>Cargando propiedades…</span>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="error-screen">
          <span style={{ fontSize: '2rem' }}>⚠️</span>
          <p>Error al conectar con Supabase:</p>
          <code>{error}</code>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <KpiBar
        total={totalPropiedades}
        promedio={precioPromedio}
        altas={categoriasAltas}
      />
      <MapView
        propiedades={propiedades}
        onClickProperty={setSelectedProperty}
      />
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>📍 Mapa de Alquileres — Buenos Aires</h1>
      <span className="badge">PoC · Datos Reales · MercadoLibre</span>
    </header>
  );
}
