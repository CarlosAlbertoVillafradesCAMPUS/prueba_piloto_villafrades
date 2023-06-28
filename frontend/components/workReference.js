import ApiWorkReference from "../API/ApiWorkReference.js";


export default {
    async showWorkReference(){
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Work Reference</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarWorkReference" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroWorkReference" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Work Reference</h1>
        <form class="formTables" id="formWorkReference">
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
            <label>Posicion</label>
            <input class="form-control" type="text" name="position" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Nombre Compañia</label>
            <input class="form-control" type="text" name="company" required placeholder="">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit fs-5" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>`

    this.agregarWorkReference();
    this.showRegistro();
    },

    agregarWorkReference(){
        let formWorkReference = document.querySelector("#formWorkReference")
        formWorkReference.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiWorkReference.postWorkReference(data);
        alert(res);
        formWorkReference.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroWorkReference");
        let agregar = document.querySelector("#agregarWorkReference");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiWorkReference.getWorkReference();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Work Reference</h2>
            <table class="table tablaImpo table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>TELEFONO</th>
                        <th>POSITION</th>
                        <th>COMPANY</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(WorkReference=>{
                    return `
                    <tr>
                    <td>${WorkReference.id}</td>
                    <td>${WorkReference.full_name}</td>
                    <td>${WorkReference.cel_number}</td>
                    <td>${WorkReference.position}</td>
                    <td>${WorkReference.company}</td>
                    <td class="contBut"><button  data-id="${WorkReference.id}" id="modificar" class="btnSelec mb-2">M</button> <button data-id="${WorkReference.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteWorkReference();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroWorkReference");
        let agregar = document.querySelector("#agregarWorkReference");

        agregar.addEventListener("click",(e)=>{
          this.showWorkReference();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteWorkReference(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data = val.dataset.id;
                let res = await ApiWorkReference.deleteWorkReference(data);
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
                let idWorkReference = val.dataset.id;
                console.log(idWorkReference);
                let WorkReference = await ApiWorkReference.getWorkReferenceId(idWorkReference);
               document.querySelector(".containerForm").innerHTML =  `
  
    <h1 class="text-center">Modificar Work Reference</h1>
        <form class="formTables" id="newForm">
        <div class="row">
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Nombre Completo</label>
            <input class="form-control" value="${WorkReference.MESSAGE[0].full_name}" type="text" name="full_name" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Telefono</label>
            <input class="form-control" value="${WorkReference.MESSAGE[0].cel_number}" type="number" name="cel_number" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Posicion</label>
            <input class="form-control" value="${WorkReference.MESSAGE[0].position}" type="text" name="position" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label>Nombre Compañia</label>
            <input class="form-control" value="${WorkReference.MESSAGE[0].company}" type="text" name="company" required placeholder="">
        </div>
        <div class="col-12 d-flex justify-content-center">
        <button id="${idWorkReference}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        let res = await ApiWorkReference.updateWorkReference(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}