import ApiMaintArea from "../API/ApiMaintArea.js";
import ApiAreas from "../API/ApiAreas.js";
import ApiPosition from "../API/ApiPosition.js";
import ApiJourney from "../API/ApiJourney.js";
import ApiStaff from "../API/ApiStaff.js";


export default {
    async showMaintArea(){
        let staff = await ApiStaff.getStaff();
        let areas = await ApiAreas.getAreas();
        let position = await ApiPosition.getPosition();
        let journey = await ApiJourney.getJourney();

    document.querySelector(".contMain").innerHTML = `
    <h1 class="title">Maint Area</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarMaintArea" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroMaintArea" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Maint Area</h1>
        <form class="formTables" id="formMaintArea">
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

    this.agregarMaintArea();
    this.showRegistro();
    },

    agregarMaintArea(){
        let formMaintArea = document.querySelector("#formMaintArea")
        formMaintArea.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiMaintArea.postMaintArea(data);
        alert(res);
        formMaintArea.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroMaintArea");
        let agregar = document.querySelector("#agregarMaintArea");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiMaintArea.getMaintArea();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Maint Area</h2>
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
                ${data.MESSAGE.map(MaintArea=>{
                    return `
                    <tr>
                    <td>${MaintArea.id}</td>
                    <td>${MaintArea.doc}</td>
                    <td>${MaintArea.name_first} ${MaintArea.name_second} ${MaintArea.surname_first}</td>
                    <td>${MaintArea.name_area}</td>
                    <td>${MaintArea.name_position}</td>
                    <td>${MaintArea.name_journey}</td>
                    <td class="contBut"><button  data-id="${MaintArea.id}" id="modificar" class="btnSelec mb-2">M</button> <button data-id="${MaintArea.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteMaintArea();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroMaintArea");
        let agregar = document.querySelector("#agregarMaintArea");

        agregar.addEventListener("click",(e)=>{
          this.showMaintArea();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteMaintArea(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data = val.dataset.id;
                let res = await ApiMaintArea.deleteMaintArea(data);
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
                let idMaintArea = val.dataset.id;
                console.log(idMaintArea);
                let MaintArea = await ApiMaintArea.getMaintAreaId(idMaintArea);
                let staff = await ApiStaff.getStaff();
                let areas = await ApiAreas.getAreas();
                let position = await ApiPosition.getPosition();
                let journey = await ApiJourney.getJourney();
               document.querySelector(".containerForm").innerHTML =  `
    <h1 class="text-center">Maint Area</h1>
        <form class="formTables" id="newForm">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-2">
        <label for="">Seleccione la Persona</label>
        <select class="form-select " aria-label="Default select example" name="id_staff">
        <option value="${MaintArea.MESSAGE[0].id_staff}">${MaintArea.MESSAGE[0].first_name} ${MaintArea.MESSAGE[0].second_name} ${MaintArea.MESSAGE[0].first_surname}</option>
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
        <option value="${MaintArea.MESSAGE[0].id_areas}">${MaintArea.MESSAGE[0].name_area}</option>
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
        <option value="${MaintArea.MESSAGE[0].id_position}">${MaintArea.MESSAGE[0].name_position} - ${MaintArea.MESSAGE[0].arl}</option>
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
        <option value="${MaintArea.MESSAGE[0].id_journey}">${MaintArea.MESSAGE[0].name_journey} ${MaintArea.MESSAGE[0].check_in} - ${MaintArea.MESSAGE[0].check_out}</option>
        ${journey.MESSAGE.map((val,id)=>{
            return `
            <option value="${val.id}">${val.name_journey} ${val.check_in} - ${val.check_out}</option>
            `
        })}
        </select>
    </div>
        <div class="col-12 d-flex justify-content-center">
        <button id="${idMaintArea}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        let res = await ApiMaintArea.updateMaintArea(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}