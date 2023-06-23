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
9-levels,
10-locations,
11-position,
12-subjects,
13-team_educators,
14-working_info
15-contact_info
16-journeys,
17-academic_areas
18-admin_area,
19-tutors
20-maint_area
21-marketing_area
22-routes
*/

DESCRIBE routes;
SELECT * FROM regions INNER JOIN countries ON countries.id = regions.id_country;

SELECT cities.id AS codeCity, name_city AS nombreCity, regions.id AS codeRegion, name_region AS nombreRegion FROM cities INNER JOIN regions ON cities.id_region = regions.id;
SELECT * FROM academic_area;
SELECT cities.id AS codeCity, name_city AS nombreCity, regions.id AS codeRegion, name_region AS nombreRegion, countries.id AS codeCountry, name_country AS nombreCountry FROM cities INNER JOIN regions ON cities.id_region = regions.id INNER JOIN countries ON regions.id_country = countries.id;
DELETE FROM countries WHERE id = 4;

SELECT staff.id AS id, doc AS cc, first_name AS name_first, second_name AS name_second, first_surname AS surname_first, second_surname AS surname_second, eps, cities.id AS city_code, name_city AS city_name, areas.id AS area_code, name_area AS area_name FROM staff INNER JOIN cities ON staff.id_city = cities.id INNER JOIN areas ON staff.id_area = areas.id;

SELECT emergency_contact.*, doc, first_name, first_surname FROM emergency_contact INNER JOIN staff ON emergency_contact.id_staff = staff.id;
SELECT working_info.*, staff.id, staff.doc, staff.first_name, staff.first_surname,work_reference.id, work_reference.full_name, work_reference.cel_number, personal_ref.id, personal_ref.full_name, personal_ref.cel_number FROM working_info INNER JOIN work_reference ON working_info.id_work_reference = work_reference.id INNER JOIN personal_ref ON working_info.id_personal_ref = personal_ref.id INNER JOIN staff ON working_info.id_staff = staff.id;


INSERT INTO staff(doc, first_name, second_name, first_surname, second_surname, eps, id_area, id_city) VALUES ("1006546", "carlos", "alberto", "villa", "yea", "coo", 1, 1);

INSERT INTO areas(name_area) VALUES("admi")