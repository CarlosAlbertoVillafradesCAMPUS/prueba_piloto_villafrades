import ApiAdminArea from "../API/ApiAdminArea.js";
import ApiAreas from "../API/ApiAreas.js";
import ApiPosition from "../API/ApiPosition.js";
import ApiJourney from "../API/ApiJourney.js";
import ApiStaff from "../API/ApiStaff.js";


export default {
    async showAdminArea(){
        let staff = await ApiStaff.getStaff();
        let areas = await ApiAreas.getAreas();
        let position = await ApiPosition.getPosition();
        let journey = await ApiJourney.getJourney();

    document.querySelector(".contMain").innerHTML = `
    <h1 class="title">AdminArea</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarAdminArea" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroAdminArea" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">AdminArea</h1>
        <form class="formTables" id="formAdminArea">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-2">
            <label for="">Seleccione la Persona</label>
            <select class="form-select " aria-label="Default select example" name="id_staff">
            ${staff.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.id}">${val.name_first} ${val.name_second} ${val.surname_first}</option>
                `
            })}
            </select>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-2">
            <label for="">Seleccione el Area</label>
            <select class="form-select " aria-label="Default select example" name="id_area">
            ${areas.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.code}">${val.nombreArea}</option>
                `
            })}
            </select>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-2">
            <label for="">Seleccione la posicion</label>
            <select class="form-select " aria-label="Default select example" name="id_position">
            ${position.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.id}">${val.name_position} - ${val.arl} </option>
                `
            })}
            </select>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-2">
            <label for="">Seleccione el viaje</label>
            <select class="form-select " aria-label="Default select example" name="id_journey">
            ${journey.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.id}">${val.name_journey} ${val.check_in} - ${val.check_out}</option>
                `
            })}
            </select>
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit fs-5" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>`

    this.agregarAdminArea();
    this.showRegistro();
    },

    agregarAdminArea(){
        let formAdminArea = document.querySelector("#formAdminArea")
        formAdminArea.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiAdminArea.postAdminArea(data);
        alert(res);
        formAdminArea.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroAdminArea");
        let agregar = document.querySelector("#agregarAdminArea");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiAdminArea.getAdminArea();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Admin Area</h2>
            <table class="table tablaImpo table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CC</th>
                        <th>NAME PERSON</th>
                        <th>NAME AREA</th>
                        <th>NAME POSITION</th>
                        <th>NAME JOURNEY</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(AdminArea=>{
                    return `
                    <tr>
                    <td>${AdminArea.id}</td>
                    <td>${AdminArea.doc}</td>
                    <td>${AdminArea.name_first} ${AdminArea.name_second} ${AdminArea.surname_first}</td>
                    <td>${AdminArea.name_area}</td>
                    <td>${AdminArea.name_position}</td>
                    <td>${AdminArea.name_journey}</td>
                    <td class="contBut"><button  data-id="${AdminArea.id}" id="modificar" class="btnSelec mb-2">M</button> <button data-id="${AdminArea.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteAdminArea();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroAdminArea");
        let agregar = document.querySelector("#agregarAdminArea");

        agregar.addEventListener("click",(e)=>{
          this.showAdminArea();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteAdminArea(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data = val.dataset.id;
                let res = await ApiAdminArea.deleteAdminArea(data);
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
                let idAdminArea = val.dataset.id;
                console.log(idAdminArea);
                let AdminArea = await ApiAdminArea.getAdminAreaId(idAdminArea);
                let staff = await ApiStaff.getStaff();
                let areas = await ApiAreas.getAreas();
                let position = await ApiPosition.getPosition();
                let journey = await ApiJourney.getJourney();
               document.querySelector(".containerForm").innerHTML =  `
    <h1 class="text-center">AdminArea</h1>
        <form class="formTables" id="newForm">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-2">
        <label for="">Seleccione la Persona</label>
        <select class="form-select " aria-label="Default select example" name="id_staff">
        <option value="${AdminArea.MESSAGE[0].id_staff}">${AdminArea.MESSAGE[0].first_name} ${AdminArea.MESSAGE[0].second_name} ${AdminArea.MESSAGE[0].first_surname}</option>
        ${staff.MESSAGE.map((val,id)=>{
            return `
            <option value="${val.id}">${val.name_first} ${val.name_second} ${val.surname_first}</option>
            `
        })}
        </select>
    </div>
    <div class="col-6 d-flex flex-column justify-content-center mb-2">
        <label for="">Seleccione el Area</label>
        <select class="form-select " aria-label="Default select example" name="id_area">
        <option value="${AdminArea.MESSAGE[0].id_areas}">${AdminArea.MESSAGE[0].name_area}</option>
        ${areas.MESSAGE.map((val,id)=>{
            return `
            <option value="${val.code}">${val.nombreArea}</option>
            `
        })}
        </select>
    </div>
    <div class="col-6 d-flex flex-column justify-content-center mb-2">
        <label for="">Seleccione la posicion</label>
        <select class="form-select " aria-label="Default select example" name="id_position">
        <option value="${AdminArea.MESSAGE[0].id_position}">${AdminArea.MESSAGE[0].name_position} - ${AdminArea.MESSAGE[0].arl}</option>
        ${position.MESSAGE.map((val,id)=>{
            return `
            <option value="${val.id}">${val.name_position} - ${val.arl} </option>
            `
        })}
        </select>
    </div>
    <div class="col-6 d-flex flex-column justify-content-center mb-2">
        <label for="">Seleccione el viaje</label>
        <select class="form-select " aria-label="Default select example" name="id_journey">
        <option value="${AdminArea.MESSAGE[0].id_journey}">${AdminArea.MESSAGE[0].name_journey} ${AdminArea.MESSAGE[0].check_in} - ${AdminArea.MESSAGE[0].check_out}</option>
        ${journey.MESSAGE.map((val,id)=>{
            return `
            <option value="${val.id}">${val.name_journey} ${val.check_in} - ${val.check_out}</option>
            `
        })}
        </select>
    </div>
        <div class="col-12 d-flex justify-content-center">
        <button id="${idAdminArea}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        let res = await ApiAdminArea.updateAdminArea(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}