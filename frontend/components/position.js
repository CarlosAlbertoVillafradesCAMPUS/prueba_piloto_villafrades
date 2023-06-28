import ApiPosition from "../API/ApiPosition.js";

export default {
    async showPosition(){
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Position</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarPosition" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroPosition" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Position</h1>
        <form class="formTables" id="formPosition">
        <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center mb-2">
            <label for="">Nombre Posicion</label>
            <input class="form-control mt-2" type="text" name="name_position" required placeholder="Nombre Posicion">
        </div>
        <div class="col-12 d-flex flex-column justify-content-center mb-3">
            <label for="">ARL</label>
            <input class="form-control mt-2" type="text" name="arl" required placeholder="">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>`

    this.agregarPosition();
    this.showRegistro();
    },

    agregarPosition(){
        let formPosition = document.querySelector("#formPosition")
        formPosition.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiPosition.postPosition(data);
        alert(res);
        formPosition.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroPosition");
        let agregar = document.querySelector("#agregarPosition");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiPosition.getPosition();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Position</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>ARL</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(Position=>{
                    return `
                    <tr>
                    <td>${Position.id}</td>
                    <td>${Position.name_position}</td>
                    <td>${Position.arl}</td>
                    <td class="contBut"><button  data-id="${Position.id}" id="modificar" class="btnSelec">M</button> <button data-id="${Position.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeletePosition();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroPosition");
        let agregar = document.querySelector("#agregarPosition");

        agregar.addEventListener("click",(e)=>{
          this.showPosition();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeletePosition(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data =val.dataset.id;
                let res = await ApiPosition.deletePosition(data);
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
                let idPosition = val.dataset.id;
                let PositionUpdate = await ApiPosition.getPositionId(idPosition);
                console.log(PositionUpdate);
               document.querySelector(".containerForm").innerHTML =  `
               <h1 class="text-center">Modificar Position</h1>
            <form class="formTables" id="newForm">
            <div class="row">
            <div class="col-12 d-flex flex-column justify-content-center mb-2">
                <label for="">Nombre Posicion</label>
                <input class="form-control" value="${PositionUpdate.MESSAGE[0].name_position}" type="text" name="name_position" required placeholder="Nombre Position">
            </div>
            <div class="col-12 d-flex flex-column justify-content-center mb-3">
            <label for="">ALR</label>
            <input class="form-control" value="${PositionUpdate.MESSAGE[0].arl}" type="text" name="arl" required placeholder="">
        </div>
            <div class="col-12 d-flex justify-content-center">
                <button id="${idPosition}" class="btnSub fs-4" type="submit"> Modificar </button>
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

        let res = await ApiPosition.updatePosition(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}