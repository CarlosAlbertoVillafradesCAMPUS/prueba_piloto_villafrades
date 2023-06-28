import ApiStaff from "../API/ApiStaff.js";
import ApiContactEmer from "../API/ApiContactEmer.js";


export default {
    async showContactEmer(){
        let satff = await ApiStaff.getStaff();

        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Emergency Contact</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarContactEmer" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroContactEmer" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Emergency Contact</h1>
        <form class="formTables" id="formContactEmer">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label for="">Seleccione la persona</label>
            <select class="form-select " aria-label="Default select example" name="id_staff">
            ${satff.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.id}">${val.name_first} ${val.surname_first} ${val.surname_second}</option>
                `
            })}
            </select>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese el numero de telefono</label>
            <input class="form-control" type="number" name="cel_number" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Relacion</label>
            <input class="form-control" type="text" name="relationship" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Nombre de la persona</label>
            <input class="form-control" type="text" name="full_name" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Email</label>
            <input class="form-control" type="email" name="email" required placeholder="email@*******">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit fs-5" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>`

    this.agregarContactEmer();
    this.showRegistro();
    },

    agregarContactEmer(){
        let formContactEmer = document.querySelector("#formContactEmer")
        formContactEmer.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiContactEmer.postContactEmer(data);
        alert(res);
        formContactEmer.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroContactEmer");
        let agregar = document.querySelector("#agregarContactEmer");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiContactEmer.getContactEmer();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Emergency Contact</h2>
            <table class="table tablaImpo table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>NAME PARENT</th>
                        <th>RELATIONSHIP</th>
                        <th>TEL.PARENT</th>
                        <th>EMAIL.PARENT</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(ContactEmer=>{
                    return `
                    <tr>
                    <td>${ContactEmer.id}</td>
                    <td>${ContactEmer.first_name} ${ContactEmer.first_surname}</td>
                    <td>${ContactEmer.full_name}</td>
                    <td>${ContactEmer.relationship}</td>
                    <td>${ContactEmer.cel_number}</td>
                    <td>${ContactEmer.email}</td>
                    <td class="contBut"><button  data-id="${ContactEmer.id}" id="modificar" class="btnSelec mb-2">M</button> <button data-id="${ContactEmer.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteContactEmer();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroContactEmer");
        let agregar = document.querySelector("#agregarContactEmer");

        agregar.addEventListener("click",(e)=>{
          this.showContactEmer();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteContactEmer(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data = val.dataset.id;
                let res = await ApiContactEmer.deleteContactEmer(data);
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
                let idContactEmer = val.dataset.id;
                console.log(idContactEmer);
                let ContactEmer = await ApiContactEmer.getContactEmerId(idContactEmer);
                let satff = await ApiStaff.getStaff();
                console.log(satff);
               document.querySelector(".containerForm").innerHTML =  `
    <h1 class="text-center">Modificar Emergency Contact</h1>
        <form class="formTables" id="newForm">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label for="">Seleccione la persona</label>
            <select class="form-select " aria-label="Default select example" name="id_staff">
            <option value="${ContactEmer.MESSAGE[0].id}">${ContactEmer.MESSAGE[0].first_name} ${ContactEmer.MESSAGE[0].first_surname}</option>
            ${satff.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.id}">${val.name_first} ${val.surname_first} ${val.surname_second}</option>
                `
            })}
            </select>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese el numero de telefono</label>
            <input class="form-control" value="${ContactEmer.MESSAGE[0].cel_number}" type="number" name="cel_number" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Relacion</label>
            <input class="form-control" value="${ContactEmer.MESSAGE[0].relationship}" type="text" name="relationship" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Nombre de la persona</label>
            <input class="form-control" value="${ContactEmer.MESSAGE[0].full_name}" type="text" name="full_name" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Email</label>
            <input class="form-control" value="${ContactEmer.MESSAGE[0].email}" type="email" name="email" required placeholder="email@*******">
        </div>
        <div class="col-12 d-flex justify-content-center">
        <button id="${idContactEmer}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        let res = await ApiContactEmer.updateContactEmer(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}