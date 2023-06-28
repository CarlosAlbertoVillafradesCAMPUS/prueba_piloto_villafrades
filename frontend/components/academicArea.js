import ApiAcademicArea from "../API/ApiAcademicArea.js";
import ApiAreas from "../API/ApiAreas.js";
import ApiPosition from "../API/ApiPosition.js";
import ApiJourney from "../API/ApiJourney.js";
import ApiStaff from "../API/ApiStaff.js";


export default {
    async showAcademicArea(){
        let staff = await ApiStaff.getStaff();
        let areas = await ApiAreas.getAreas();
        let position = await ApiPosition.getPosition();
        let journey = await ApiJourney.getJourney();

    document.querySelector(".contMain").innerHTML = `
    <h1 class="title">Academic Area</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarAcademicArea" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroAcademicArea" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Academic Area</h1>
        <form class="formTables" id="formAcademicArea">
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

    this.agregarAcademicArea();
    this.showRegistro();
    },

    agregarAcademicArea(){
        let formAcademicArea = document.querySelector("#formAcademicArea")
        formAcademicArea.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiAcademicArea.postAcademicArea(data);
        alert(res);
        formAcademicArea.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroAcademicArea");
        let agregar = document.querySelector("#agregarAcademicArea");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiAcademicArea.getAcademicArea();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Academic Area</h2>
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
                ${data.MESSAGE.map(AcademicArea=>{
                    return `
                    <tr>
                    <td>${AcademicArea.id}</td>
                    <td>${AcademicArea.doc}</td>
                    <td>${AcademicArea.name_first} ${AcademicArea.name_second} ${AcademicArea.surname_first}</td>
                    <td>${AcademicArea.name_area}</td>
                    <td>${AcademicArea.name_position}</td>
                    <td>${AcademicArea.name_journey}</td>
                    <td class="contBut"><button  data-id="${AcademicArea.id}" id="modificar" class="btnSelec mb-2">M</button> <button data-id="${AcademicArea.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteAcademicArea();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroAcademicArea");
        let agregar = document.querySelector("#agregarAcademicArea");

        agregar.addEventListener("click",(e)=>{
          this.showAcademicArea();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteAcademicArea(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data = val.dataset.id;
                let res = await ApiAcademicArea.deleteAcademicArea(data);
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
                let idAcademicArea = val.dataset.id;
                console.log(idAcademicArea);
                let AcademicArea = await ApiAcademicArea.getAcademicAreaId(idAcademicArea);
                let staff = await ApiStaff.getStaff();
                let areas = await ApiAreas.getAreas();
                let position = await ApiPosition.getPosition();
                let journey = await ApiJourney.getJourney();
               document.querySelector(".containerForm").innerHTML =  `
    <h1 class="text-center">Academic Area</h1>
        <form class="formTables" id="newForm">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-2">
        <label for="">Seleccione la Persona</label>
        <select class="form-select " aria-label="Default select example" name="id_staff">
        <option value="${AcademicArea.MESSAGE[0].id_staff}">${AcademicArea.MESSAGE[0].first_name} ${AcademicArea.MESSAGE[0].second_name} ${AcademicArea.MESSAGE[0].first_surname}</option>
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
        <option value="${AcademicArea.MESSAGE[0].id_areas}">${AcademicArea.MESSAGE[0].name_area}</option>
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
        <option value="${AcademicArea.MESSAGE[0].id_position}">${AcademicArea.MESSAGE[0].name_position} - ${AcademicArea.MESSAGE[0].arl}</option>
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
        <option value="${AcademicArea.MESSAGE[0].id_journey}">${AcademicArea.MESSAGE[0].name_journey} ${AcademicArea.MESSAGE[0].check_in} - ${AcademicArea.MESSAGE[0].check_out}</option>
        ${journey.MESSAGE.map((val,id)=>{
            return `
            <option value="${val.id}">${val.name_journey} ${val.check_in} - ${val.check_out}</option>
            `
        })}
        </select>
    </div>
        <div class="col-12 d-flex justify-content-center">
        <button id="${idAcademicArea}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        let res = await ApiAcademicArea.updateAcademicArea(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}