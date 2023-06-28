import countries from "./components/countries.js";
import regions from "./components/regions.js";
import cities from "./components/cities.js";
import areas from "./components/areas.js";
import staff from "./components/staff.js";
import locations from "./components/locations.js";
import contactInfo from "./components/contactInfo.js";
import contactEmer from "./components/contactEmer.js";
import workReference from "./components/workReference.js";
import personalRef from "./components/personalRef.js";
import levels from "./components/levels.js";
import journey from "./components/journey.js";
import position from "./components/position.js";
import adminArea from "./components/adminArea.js";
import academicArea from "./components/academicArea.js";
import maintArea from "./components/maintArea.js";
import marketingArea from "./components/marketingArea.js";
import subjects from "./components/subjects.js";

//COUNTRIES
let btn_countries = document.querySelector("#btn_countries");
btn_countries.addEventListener("click", (e)=>{
    document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">COUNTRIES</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarCountry" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroCountry" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Countries</h1>
        <form class="formTables" id="formCountries">
        <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center mb-3">
            <label for="">Ingrese el nombre del pais</label>
            <input class="form-control" type="text" name="name_country" required placeholder="Nombre del pais">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>
    `;
    countries.agregarCountry();
    countries.showForm();
    countries.showRegistro();
})

//REGIONS
let btn_regions = document.querySelector("#btn_regions");
btn_regions.addEventListener("click", (e)=>{
    regions.showRegions();
})

//CITIES
let btn_cities = document.querySelector("#btn_cities");
btn_cities.addEventListener("click", (e)=>{
    cities.showCities();
})

//AREAS
let btn_areas = document.querySelector("#btn_areas");
btn_areas.addEventListener("click", (e)=>{
    areas.showAreas();
})

//STAFF
let btn_staff = document.querySelector("#btn_staff");
btn_staff.addEventListener("click", (e)=>{
    staff.showStaff();
})

//LOCATIONS
let btn_locations = document.querySelector("#btn_locations");
btn_locations.addEventListener("click", (e)=>{
    locations.showLocations();
})

//CONTACT INFO
let btn_contact_info = document.querySelector("#btn_contact_info");
btn_contact_info.addEventListener("click", (e)=>{
    contactInfo.showContactInfo();
})

//EMERGENCY CONTACT
let btn_emergency_contact = document.querySelector("#btn_emergency_contact");
btn_emergency_contact.addEventListener("click", (e)=>{
    contactEmer.showContactEmer();
})

//WORK REFERENCE
let btn_work_reference = document.querySelector("#btn_work_reference");
btn_work_reference.addEventListener("click", (e)=>{
    workReference.showWorkReference();
})

//PERSONAL REF
let btn_personal_ref = document.querySelector("#btn_personal_ref");
btn_personal_ref.addEventListener("click", (e)=>{
    personalRef.showPersonalRef();
})

//LEVELS
let btn_levels = document.querySelector("#btn_levels");
btn_levels.addEventListener("click", (e)=>{
    levels.showLevels();
})

//JOURNEY
let btn_journey = document.querySelector("#btn_journey");
btn_journey.addEventListener("click", (e)=>{
    journey.showJourney();
})

//POSITION
let btn_position = document.querySelector("#btn_position");
btn_position.addEventListener("click", (e)=>{
    position.showPosition();
})

//ADMIN AREA
let btn_adminArea = document.querySelector("#btn_adminArea");
btn_adminArea.addEventListener("click", (e)=>{
    adminArea.showAdminArea();
})

//ACADEMIC AREA
let btn_academic_area = document.querySelector("#btn_academic_area");
btn_academic_area.addEventListener("click", (e)=>{
    academicArea.showAcademicArea();
})

//MAINT AREA
let btn_maint_area = document.querySelector("#btn_maint_area");
btn_maint_area.addEventListener("click", (e)=>{
    maintArea.showMaintArea();
})

//MARKETING AREA
let btn_marketing_area = document.querySelector("#btn_marketing_area");
btn_marketing_area.addEventListener("click", (e)=>{
    marketingArea.showMarketingArea();
})

//SUBJECTS
let btn_subjects = document.querySelector("#btn_subjects");
btn_subjects.addEventListener("click", (e)=>{
    subjects.showSubjects();
})

