import countries from "./components/countries.js";
import regions from "./components/regions.js";
import cities from "./components/cities.js";
import areas from "./components/areas.js";
import staff from "./components/staff.js";

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
	</div
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

