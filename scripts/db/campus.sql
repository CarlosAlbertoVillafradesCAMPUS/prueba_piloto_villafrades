SHOW DATABASES;
USE campusland;

/* ORDEN DE TABALAS
1-countries,
2-regions,
3-cities,
4-areas,
5-staff,
6-work_reference
7-perosnal_ref,
8-emergency_contact

levels,
locations,
position,
subjects,
team_educators,
working_info*/

DESCRIBE staff;
SELECT * FROM regions INNER JOIN countries ON countries.id = regions.id_country;

SELECT cities.id AS codeCity, name_city AS nombreCity, regions.id AS codeRegion, name_region AS nombreRegion FROM cities INNER JOIN regions ON cities.id_region = regions.id;
SELECT * FROM emergency_contact;
SELECT cities.id AS codeCity, name_city AS nombreCity, regions.id AS codeRegion, name_region AS nombreRegion, countries.id AS codeCountry, name_country AS nombreCountry FROM cities INNER JOIN regions ON cities.id_region = regions.id INNER JOIN countries ON regions.id_country = countries.id;
DELETE FROM countries WHERE id = 4;

SELECT staff.id AS id, doc AS cc, first_name AS name_first, second_name AS name_second, first_surname AS surname_first, second_surname AS surname_second, eps, cities.id AS city_code, name_city AS city_name, areas.id AS area_code, name_area AS area_name FROM staff INNER JOIN cities ON staff.id_city = cities.id INNER JOIN areas ON staff.id_area = areas.id;

SELECT emergency_contact.*, doc, first_name, first_surname FROM emergency_contact INNER JOIN staff ON emergency_contact.id_staff = staff.id;