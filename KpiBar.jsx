/**
 * KpiBar – Tres indicadores clave calculados dinámicamente.
 */
export default function KpiBar({ total, promedio, altas }) {
  const formatARS = (n) =>
    '$ ' + n.toLocaleString('es-AR');

  return (
    <section className="kpis">
      <div className="kpi-card">
        <span className="label">Total Propiedades</span>
        <span className="value accent-blue">{total}</span>
      </div>

      <div className="kpi-card">
        <span className="label">Precio Promedio</span>
        <span className="value accent-green">{formatARS(promedio)}</span>
      </div>

      <div className="kpi-card">
        <span className="label">Categoría Alta</span>
        <span className="value accent-yellow">{altas}</span>
      </div>
    </section>
  );
}
