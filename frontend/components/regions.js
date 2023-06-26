import ApiRegions from "../API/ApiRegions.js";
import ApiCountries from "../API/ApiCountries.js";


export default {
    async showRegions(){
        let countries = await ApiCountries.getCountries();
        console.log(countries);
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Regions</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarRegions" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroRegions" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Regions</h1>
        <form class="formTables" id="formRegions">
        <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center">
            <label for="">Seleccione el pais</label>
            <select class="form-select" aria-label="Default select example" name="id_country">
            ${countries.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.code}">${val.name}</option>
                `
            })}
            </select>
        </div>
        <div class="col-12 d-flex flex-column justify-content-center mb-3">
            <label for="">Ingrese la region del pais</label>
            <input class="form-control" type="text" name="name_region" required placeholder="Nombre region">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div`

    this.agregarRegion();
    this.showRegistro();
    },

    agregarRegion(){
        let formRegions = document.querySelector("#formRegions")
        formRegions.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        data.name_region = data.name_region.toLocaleUpperCase();

       let res = await ApiRegions.postRegions(data);
        alert(res);
        formRegions.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroRegions");
        let agregar = document.querySelector("#agregarRegions");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiRegions.getRegions();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>REGIONS</h2>
            <table class="tableCountry">
                <thead>
                    <tr>
                        <th>ID REGION</th>
                        <th>NAME REGION</th>
                        <th>NAME COUNTRY</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(region=>{
                    return `
                    <tr>
                    <td>${region.codeRegion}</td>
                    <td>${region.nombreRegion}</td>
                    <td>${region.nombreCountry}</td>
                    <td class="contBut"><button  data-id="${region.codeRegion}" id="modificar" class="btnSelec">M</button> <button data-id="${region.codeRegion}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteCountry();
            this.showUpdate();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registro");
        let agregar = document.querySelector("#agregar");

        agregar.addEventListener("click", async (e)=>{
            
            document.querySelector(".containerForm").innerHTML = `
            `;
        agregar.className += " active";
        registro.classList.remove("active");
        this.agregarCountry();
        })
    },

    DeleteCountry(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data =val.dataset.id;
                let res = await ApiRegions.deleteRegions(data);
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
                let idRegion = val.dataset.id;
                console.log(idRegion);
                let countries = await ApiCountries.getCountries();
                let regionUpdate = await ApiRegions.getRegionsId(idRegion);
               document.querySelector(".containerForm").innerHTML =  `
               <h1 class="text-center">Modificar Regions</h1>
            <form class="formTables" id="newForm">
            <div class="row">
            <div class="col-12 d-flex flex-column justify-content-center">
                <label for="">Seleccione el pais</label>
                <select class="form-select" aria-label="Default select example" name="id_country">
                ${countries.MESSAGE.map((val,id)=>{
                    return `
                    <option value="${val.code}">${val.name}</option>
                    `
                })}
                </select>
            </div>
            <div class="col-12 d-flex flex-column justify-content-center mb-3">
                <label for="">Ingrese la region del pais</label>
                <input class="form-control" value="${regionUpdate.MESSAGE[0].nombreRegion}" type="text" name="name_region" required placeholder="Nombre region">
            </div>
            <div class="col-12 d-flex justify-content-center">
                <button id="${idRegion}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        data.name_region = data.name_region.toLocaleUpperCase();
        let res = await ApiRegions.updateRegions(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}