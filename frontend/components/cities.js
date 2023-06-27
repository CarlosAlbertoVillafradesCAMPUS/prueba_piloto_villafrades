import ApiRegions from "../API/ApiRegions.js";
import ApiCities from "../API/ApiCities.js";


export default {
    async showCities(){
        let regions = await ApiRegions.getRegions();
        console.log(regions);
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Cities</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarCities" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroCities" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Cities</h1>
        <form class="formTables" id="formCities">
        <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center mb-2">
            <label for="">Seleccione la Region</label>
            <select class="form-select " aria-label="Default select example" name="id_region">
            ${regions.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.codeRegion}">${val.nombreRegion}</option>
                `
            })}
            </select>
        </div>
        <div class="col-12 d-flex flex-column justify-content-center mb-3">
            <label for="">Ingrese la la ciudad del pais</label>
            <input class="form-control" type="text" name="name_city" required placeholder="Nombre ciudad">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div`

    this.agregarCities();
    this.showRegistro();
    },

    agregarCities(){
        let formCities = document.querySelector("#formCities")
        formCities.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        data.name_city = data.name_city.toLocaleUpperCase();

       let res = await ApiCities.postCities(data);
        alert(res);
        formCities.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroCities");
        let agregar = document.querySelector("#agregarCities");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiCities.getCities();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>CITIES</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID CITY</th>
                        <th>NAME CITY</th>
                        <th>NAME REGION</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(city=>{
                    return `
                    <tr>
                    <td>${city.codeCity}</td>
                    <td>${city.nombreCity}</td>
                    <td>${city.nombreRegion}</td>
                    <td class="contBut"><button  data-id="${city.codeCity}" id="modificar" class="btnSelec">M</button> <button data-id="${city.codeCity}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteCities();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroCities");
        let agregar = document.querySelector("#agregarCities");

        agregar.addEventListener("click",(e)=>{
          this.showCities();
        agregar.className += " active";
        registro.classList.remove("active");
        this.agregarCountry();
        })
    },

    DeleteCities(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data =val.dataset.id;
                let res = await ApiCities.deleteCities(data);
               alert(res);
                window.location.reload();
            })
        });
    },

    showUpdate(){
        let btnUpdate = document.querySelectorAll("#modificar");
        btnUpdate.forEach((val,id) => {
            console.log(val);
            val.addEventListener("click", async (e)=>{
                let idCity = val.dataset.id;
                console.log(idCity);
                let regions = await ApiRegions.getRegions();
                let cityUpdate = await ApiCities.getCitiesId(idCity);
               document.querySelector(".containerForm").innerHTML =  `
               <h1 class="text-center">Modificar Cities</h1>
            <form class="formTables" id="newForm">
            <div class="row">
            <div class="col-12 d-flex flex-column justify-content-center">
                <label for="">Seleccione la region</label>
                <select class="form-select" aria-label="Default select example" name="id_region">
                ${regions.MESSAGE.map((val,id)=>{
                    return `
                    <option value="${val.codeRegion}">${val.nombreRegion}</option>
                    `
                })}
                </select>
            </div>
            <div class="col-12 d-flex flex-column justify-content-center mb-3">
                <label for="">Ingrese la ciudad de la region</label>
                <input class="form-control" value="${cityUpdate.MESSAGE[0].nombreCity}" type="text" name="name_city" required placeholder="Nombre region">
            </div>
            <div class="col-12 d-flex justify-content-center">
                <button id="${idCity}" class="btnSub fs-4" type="submit"> Modificar </button>
            </div>
            </div>  
            </form>`;
           this.updateRegion();
            })
        });
    },

    updateRegion(){
        let newForm = document.querySelector("#newForm");
        newForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let btnSub = document.querySelector(".btnSub");
        let id = btnSub.id;
        console.log(id);
        let data = Object.fromEntries(new FormData(e.target));
        data.name_city = data.name_city.toLocaleUpperCase();
        let res = await ApiCities.updateCities(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}