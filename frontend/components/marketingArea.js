import ApiMarketingArea from "../API/ApiMarketingArea.js";
import ApiAreas from "../API/ApiAreas.js";
import ApiPosition from "../API/ApiPosition.js";
import ApiJourney from "../API/ApiJourney.js";
import ApiStaff from "../API/ApiStaff.js";


export default {
    async showMarketingArea(){
        let staff = await ApiStaff.getStaff();
        let areas = await ApiAreas.getAreas();
        let position = await ApiPosition.getPosition();
        let journey = await ApiJourney.getJourney();

    document.querySelector(".contMain").innerHTML = `
    <h1 class="title">Marketing Area</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarMarketingArea" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroMarketingArea" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">MarketingArea</h1>
        <form class="formTables" id="formMarketingArea">
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

    this.agregarMarketingArea();
    this.showRegistro();
    },

    agregarMarketingArea(){
        let formMarketingArea = document.querySelector("#formMarketingArea")
        formMarketingArea.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiMarketingArea.postMarketingArea(data);
        alert(res);
        formMarketingArea.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroMarketingArea");
        let agregar = document.querySelector("#agregarMarketingArea");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiMarketingArea.getMarketingArea();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Marketing Area</h2>
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
                ${data.MESSAGE.map(MarketingArea=>{
                    return `
                    <tr>
                    <td>${MarketingArea.id}</td>
                    <td>${MarketingArea.doc}</td>
                    <td>${MarketingArea.first_name} ${MarketingArea.second_name} ${MarketingArea.first_surname}</td>
                    <td>${MarketingArea.name_area}</td>
                    <td>${MarketingArea.name_position}</td>
                    <td>${MarketingArea.name_journey}</td>
                    <td class="contBut"><button  data-id="${MarketingArea.id}" id="modificar" class="btnSelec mb-2">M</button> <button data-id="${MarketingArea.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteMarketingArea();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroMarketingArea");
        let agregar = document.querySelector("#agregarMarketingArea");

        agregar.addEventListener("click",(e)=>{
          this.showMarketingArea();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteMarketingArea(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data = val.dataset.id;
                let res = await ApiMarketingArea.deleteMarketingArea(data);
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
                let idMarketingArea = val.dataset.id;
                console.log(idMarketingArea);
                let MarketingArea = await ApiMarketingArea.getMarketingAreaId(idMarketingArea);
                let staff = await ApiStaff.getStaff();
                let areas = await ApiAreas.getAreas();
                let position = await ApiPosition.getPosition();
                let journey = await ApiJourney.getJourney();
               document.querySelector(".containerForm").innerHTML =  `
    <h1 class="text-center">Marketing Area</h1>
        <form class="formTables" id="newForm">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-2">
        <label for="">Seleccione la Persona</label>
        <select class="form-select " aria-label="Default select example" name="id_staff">
        <option value="${MarketingArea.MESSAGE[0].id_staff}">${MarketingArea.MESSAGE[0].first_name} ${MarketingArea.MESSAGE[0].second_name} ${MarketingArea.MESSAGE[0].first_surname}</option>
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
        <option value="${MarketingArea.MESSAGE[0].id_areas}">${MarketingArea.MESSAGE[0].name_area}</option>
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
        <option value="${MarketingArea.MESSAGE[0].id_position}">${MarketingArea.MESSAGE[0].name_position} - ${MarketingArea.MESSAGE[0].arl}</option>
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
        <option value="${MarketingArea.MESSAGE[0].id_journey}">${MarketingArea.MESSAGE[0].name_journey} ${MarketingArea.MESSAGE[0].check_in} - ${MarketingArea.MESSAGE[0].check_out}</option>
        ${journey.MESSAGE.map((val,id)=>{
            return `
            <option value="${val.id}">${val.name_journey} ${val.check_in} - ${val.check_out}</option>
            `
        })}
        </select>
    </div>
        <div class="col-12 d-flex justify-content-center">
        <button id="${idMarketingArea}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        let res = await ApiMarketingArea.updateMarketingArea(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}