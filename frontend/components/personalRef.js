import ApiPersonalRef from "../API/ApiPersonalRef.js";


export default {
    async showPersonalRef(){
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Personal Ref</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarPersonalRef" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroPersonalRef" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Personal Ref</h1>
        <form class="formTables" id="formPersonalRef">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Nombre Completo</label>
            <input class="form-control" type="text" name="full_name" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Telefono</label>
            <input class="form-control" type="number" name="cel_number" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Relacion</label>
            <input class="form-control" type="text" name="relationship" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ocupacion</label>
            <input class="form-control" type="text" name="occupation" required placeholder="">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit fs-5" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>`

    this.agregarPersonalRef();
    this.showRegistro();
    },

    agregarPersonalRef(){
        let formPersonalRef = document.querySelector("#formPersonalRef")
        formPersonalRef.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiPersonalRef.postPersonalRef(data);
        alert(res);
        formPersonalRef.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroPersonalRef");
        let agregar = document.querySelector("#agregarPersonalRef");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiPersonalRef.getPersonalRef();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Personal Ref</h2>
            <table class="table tablaImpo table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>TELEFONO</th>
                        <th>RELATIONSHIP</th>
                        <th>OCCUPATION</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(PersonalRef=>{
                    return `
                    <tr>
                    <td>${PersonalRef.id}</td>
                    <td>${PersonalRef.full_name}</td>
                    <td>${PersonalRef.cel_number}</td>
                    <td>${PersonalRef.relationship}</td>
                    <td>${PersonalRef.occupation}</td>
                    <td class="contBut"><button  data-id="${PersonalRef.id}" id="modificar" class="btnSelec mb-2">M</button> <button data-id="${PersonalRef.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeletePersonalRef();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroPersonalRef");
        let agregar = document.querySelector("#agregarPersonalRef");

        agregar.addEventListener("click",(e)=>{
          this.showPersonalRef();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeletePersonalRef(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data = val.dataset.id;
                let res = await ApiPersonalRef.deletePersonalRef(data);
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
                let idPersonalRef = val.dataset.id;
                console.log(idPersonalRef);
                let PersonalRef = await ApiPersonalRef.getPersonalRefId(idPersonalRef);
               document.querySelector(".containerForm").innerHTML =  `
  
    <h1 class="text-center">Modificar Personal Ref</h1>
        <form class="formTables" id="newForm">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Nombre Completo</label>
            <input class="form-control" value="${PersonalRef.MESSAGE[0].full_name}" type="text" name="full_name" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Telefono</label>
            <input class="form-control" value="${PersonalRef.MESSAGE[0].cel_number}" type="number" name="cel_number" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Relacion</label>
            <input class="form-control" value="${PersonalRef.MESSAGE[0].relationship}" type="text" name="relationship" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Ocupacion</label>
            <input class="form-control" value="${PersonalRef.MESSAGE[0].occupation}" type="text" name="occupation" required placeholder="">
        </div>
        <div class="col-12 d-flex justify-content-center">
        <button id="${idPersonalRef}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        let res = await ApiPersonalRef.updatePersonalRef(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}