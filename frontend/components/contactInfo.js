import ApiStaff from "../API/ApiStaff.js";
import ApiContactInfo from "../API/ApiContactInfo.js";


export default {
    async showContactInfo(){
        let satff = await ApiStaff.getStaff();

        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Contact Info</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarContactInfo" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroContactInfo" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Contact Info</h1>
        <form class="formTables" id="formContactInfo">
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
            <label>Ingrese el numero de whatsapp</label>
            <input class="form-control" type="tel" name="whatsapp" required placeholder="+57********">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese su usuario de instagram</label>
            <input class="form-control" type="text" name="instagram" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese su usuario de linkedin</label>
            <input class="form-control" type="text" name="linkedin" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Email</label>
            <input class="form-control" type="email" name="email" required placeholder="email@*******">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese su direccion</label>
            <input class="form-control" type="text" name="address" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Digite su numero de telefono</label>
            <input class="form-control" type="tel" name="cel_number" required placeholder="">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit fs-5" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div`

    this.agregarContactInfo();
    this.showRegistro();
    },

    agregarContactInfo(){
        let formContactInfo = document.querySelector("#formContactInfo")
        formContactInfo.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiContactInfo.postContactInfo(data);
        alert(res);
        formContactInfo.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroContactInfo");
        let agregar = document.querySelector("#agregarContactInfo");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiContactInfo.getContactInfo();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>ContactInfo</h2>
            <table class="table tablaImpo table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PERSONA</th>
                        <th>WHATSAPP</th>
                        <th>INSTAGRAM</th>
                        <th>LINKEDIN</th>
                        <th>EMAIL</th>
                        <th>DIRECCION</th>
                        <th>TELEFONO</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(ContactInfo=>{
                    return `
                    <tr>
                    <td>${ContactInfo.id}</td>
                    <td>${ContactInfo.first_name} ${ContactInfo.first_surname} ${ContactInfo.second_surname}</td>
                    <td>${ContactInfo.whatsapp}</td>
                    <td>${ContactInfo.instagram}</td>
                    <td>${ContactInfo.linkedin}</td>
                    <td>${ContactInfo.email}</td>
                    <td>${ContactInfo.address}</td>
                    <td>${ContactInfo.cel_number}</td>
                    <td class="contBut"><button  data-id="${ContactInfo.id}" id="modificar" class="btnSelec mb-2">M</button> <button data-id="${ContactInfo.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteContactInfo();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroContactInfo");
        let agregar = document.querySelector("#agregarContactInfo");

        agregar.addEventListener("click",(e)=>{
          this.showContactInfo();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteContactInfo(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data = val.dataset.id;
                let res = await ApiContactInfo.deleteContactInfo(data);
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
                let idContactInfo = val.dataset.id;
                console.log(idContactInfo);
                let ContactInfo = await ApiContactInfo.getContactInfoId(idContactInfo);
                let satff = await ApiStaff.getStaff();
                console.log(satff);
               document.querySelector(".containerForm").innerHTML =  `
    <h1 class="text-center">Modificar Contact Info</h1>
        <form class="formTables" id="newForm">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label for="">Seleccione la persona</label>
            <select class="form-select " aria-label="Default select example" name="id_staff">
            <option value="${ContactInfo.MESSAGE[0].id_staff}">${ContactInfo.MESSAGE[0].first_name} ${ContactInfo.MESSAGE[0].first_surname} ${ContactInfo.MESSAGE[0].second_surname}</option>
            ${satff.MESSAGE.map((val,id)=>{
                return `
                <option value="${val.id}">${val.name_first} ${val.surname_first} ${val.surname_second}</option>
                `
            })}
            </select>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese el numero de whatsapp</label>
            <input class="form-control"  value="${ContactInfo.MESSAGE[0].whatsapp}" type="tel" name="whatsapp" required placeholder="+57********">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese su usuario de instagram</label>
            <input class="form-control"  value="${ContactInfo.MESSAGE[0].instagram}" type="text" name="instagram" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese su usuario de linkedin</label>
            <input class="form-control"  value="${ContactInfo.MESSAGE[0].linkedin}" type="text" name="linkedin" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Email</label>
            <input class="form-control"  value="${ContactInfo.MESSAGE[0].email}" type="email" name="email" required placeholder="email@*******">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ingrese su direccion</label>
            <input class="form-control"  value="${ContactInfo.MESSAGE[0].address}" type="text" name="address" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Digite su numero de telefono</label>
            <input class="form-control"  value="${ContactInfo.MESSAGE[0].cel_number}" type="tel" name="cel_number" required placeholder="">
        </div>
        <div class="col-12 d-flex justify-content-center">
        <button id="${idContactInfo}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        let res = await ApiContactInfo.updateContactInfo(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}