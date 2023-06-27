import ApiStaff from "../API/ApiStaff.js";
import ApiCities from "../API/ApiCities.js";
import ApiAreas from "../API/ApiAreas.js";
import cities from "./cities.js";


export default {
    async showStaff(){
        let cities = await ApiCities.getCities();
        let areas = await ApiAreas.getAreas();
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Staff</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarStaff" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroStaff" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Staff</h1>
        <form class="formTables" id="formStaff">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese el numero de documento</label>
            <input class="form-control" type="text" name="doc" required placeholder="CC">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Primer Nombre</label>
            <input class="form-control" type="text" name="first_name" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Segundo Nombre</label>
            <input class="form-control" type="text" name="second_name" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Primer Apellido</label>
            <input class="form-control" type="text" name="first_surname" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Segundo Apellido</label>
            <input class="form-control" type="text" name="second_surname" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Digite su Eps</label>
            <input class="form-control" type="text" name="eps" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-5">
            <label for="">Seleccione la Ciudad</label>
            <select class="form-select " aria-label="Default select example" name="id_city">
            ${cities.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.codeCity}">${val.nombreCity}</option>
                `
            })}
            </select>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-5">
            <label for="">Seleccione el Area</label>
            <select class="form-select " aria-label="Default select example" name="id_area">
            ${areas.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.code}">${val.nombreArea}</option>
                `
            })}
            </select>
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit fs-5" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div`

    this.agregarStaff();
    this.showRegistro();
    },

    agregarStaff(){
        let formStaff = document.querySelector("#formStaff")
        formStaff.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiStaff.postStaff(data);
        alert(res);
        formStaff.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroStaff");
        let agregar = document.querySelector("#agregarStaff");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiStaff.getStaff();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Staff</h2>
            <table class="table tablaImpo table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CC</th>
                        <th>FIRST NAME</th>
                        <th>SECOND NAME</th>
                        <th>FIRST SURNAME</th>
                        <th>SECOND SURNAME</th>
                        <th>EPS</th>
                        <th>NAME CITY</th>
                        <th>NAME AREA</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(staff=>{
                    return `
                    <tr>
                    <td>${staff.id}</td>
                    <td>${staff.cc}</td>
                    <td>${staff.name_first}</td>
                    <td>${staff.name_second}</td>
                    <td>${staff.surname_first}</td>
                    <td>${staff.surname_second}</td>
                    <td>${staff.eps}</td>
                    <td>${staff.city_name}</td>
                    <td>${staff.area_name}</td>
                    <td class="contBut"><button  data-id="${staff.id}" id="modificar" class="btnSelec mb-2">M</button> <button data-id="${staff.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteStaff();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroStaff");
        let agregar = document.querySelector("#agregarStaff");

        agregar.addEventListener("click",(e)=>{
          this.showStaff();
        agregar.className += " active";
        registro.classList.remove("active");
        this.agregarStaff();
        })
    },

    DeleteStaff(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data = val.dataset.id;
                let res = await ApiStaff.deleteStaff(data);
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
                let idStaff = val.dataset.id;
                console.log(idStaff);
                let staff = await ApiStaff.getStaffId(idStaff);
                let cities = await ApiCities.getCities();
                let areas = await ApiAreas.getAreas();
               document.querySelector(".containerForm").innerHTML =  `
    <h1 class="title">Staff</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarStaff" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroStaff" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Staff</h1>
        <form class="formTables" id="newForm">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese el numero de documento</label>
            <input class="form-control" value="${staff.MESSAGE[0].cc}" type="text" name="doc" required placeholder="CC">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Primer Nombre</label>
            <input class="form-control" value="${staff.MESSAGE[0].name_first}" type="text" name="first_name" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Segundo Nombre</label>
            <input class="form-control" value="${staff.MESSAGE[0].name_second}" type="text" name="second_name" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Primer Apellido</label>
            <input class="form-control" value="${staff.MESSAGE[0].surname_first}" type="text" name="first_surname" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Segundo Apellido</label>
            <input class="form-control" value="${staff.MESSAGE[0].surname_second}" type="text" name="second_surname" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Digite su Eps</label>
            <input class="form-control" type="text" value="${staff.MESSAGE[0].eps}" name="eps" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-5">
            <label for="">Seleccione la Ciudad</label>
            <select class="form-select" aria-label="Default select example" name="id_city">
            <option value="${staff.MESSAGE[0].city_code}">${staff.MESSAGE[0].city_name}</option>
            ${cities.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.codeCity}">${val.nombreCity}</option>
                `
            })}
            </select>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-5">
            <label for="">Seleccione el Area</label>
            <select class="form-select " aria-label="Default select example" name="id_area">
            <option value="${staff.MESSAGE[0].area_code}">${staff.MESSAGE[0].area_name}</option>
            ${areas.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.code}">${val.nombreArea}</option>
                `
            })}
            </select>
        </div>
        <div class="col-12 d-flex justify-content-center">
        <button id="${idStaff}" class="btnSub fs-4" type="submit"> Modificar </button>
        </div>
        </div>  
        </form>
	</div`;
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
        let res = await ApiStaff.updateStaff(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}