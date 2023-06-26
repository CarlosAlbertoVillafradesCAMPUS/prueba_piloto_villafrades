import countries from "./components/countries.js";

let btnPais = document.querySelector("#btnPais");
btnPais.addEventListener("click", (e)=>{
    document.querySelector(".contPrincipal").innerHTML =  `
    <div class="containerForm">
        <form id="formCountries">
            <label for="">Ingrese el Nombre del pais a agregar</label>
            <input type="text" name="name_country" required placeholder="Nombre del pais">
            <button type="submit"> Agregar </button>
        </form>
	</div
    `;
    countries.agregarCountry();
    countries.showForm();
    countries.showRegistro();
})