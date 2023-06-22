SHOW DATABASES;
USE campusland;

/* ORDEN DE TABALAS
1-countries,
2-regions,
3-cities,
4-areas, */

DESCRIBE areas;
SELECT * FROM regions INNER JOIN countries ON countries.id = regions.id_country;

SELECT cities.id AS codeCity, name_city AS nombreCity, regions.id AS codeRegion, name_region AS nombreRegion FROM cities INNER JOIN regions ON cities.id_region = regions.id;
SELECT * FROM areas;
SELECT cities.id AS codeCity, name_city AS nombreCity, regions.id AS codeRegion, name_region AS nombreRegion, countries.id AS codeCountry, name_country AS nombreCountry FROM cities INNER JOIN regions ON cities.id_region = regions.id INNER JOIN countries ON regions.id_country = countries.id;
DELETE FROM countries WHERE id = 4;