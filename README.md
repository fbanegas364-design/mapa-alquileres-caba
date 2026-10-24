# Mapa de Alquileres — Buenos Aires (CABA)

## Descripción del Proyecto

Este proyecto analiza la oferta de alquileres en Capital Federal (CABA) a partir de 170 publicaciones reales obtenidas de MercadoLibre, con precios en pesos argentinos.
Los datos fueron almacenados en Supabase y consumidos desde una aplicación web desarrollada con React/Vite, visualizándolos geográficamente con deck.gl sobre un mapa interactivo.
El mapa muestra las propiedades distribuidas en 33 barrios de Buenos Aires, clasificadas por rango de precio en tres categorías: Baja (< $800K), Media ($800K–$1.6M) y Alta (> $1.6M).
La visualización permite identificar las zonas con mayor oferta de alquileres, los rangos de precios predominantes por barrio y comparar valores entre distintas ubicaciones.
En una segunda versión se agregaría un HeatmapLayer para visualizar la concentración de oferta, filtros por barrio y rango de precio, y un buscador por nombre de propiedad.

## Integrantes

- [Completar nombre 1]
- [Completar nombre 2]

## Tecnologías Utilizadas

- **Base de datos:** Supabase (PostgreSQL)
- **Frontend:** React 18 + Vite
- **Visualización geográfica:** deck.gl (IconLayer)
- **Mapa base:** MapLibre GL + CartoDB Dark Matter
- **Deploy:** Vercel

## URL Pública

[Completar después del deploy]

## Fuente de Datos

MercadoLibre Argentina — Alquileres en Capital Federal
170 registros · Precios en ARS · 33 barrios de CABA
