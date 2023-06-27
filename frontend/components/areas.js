import ApiAreas from "../API/ApiAreas.js";



export default {
    async showAreas(){
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Areas</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarAreas" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroAreas" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Areas</h1>
        <form class="formTables" id="formAreas">
        <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center mb-3">
            <label for="">Ingrese el nombre del area</label>
            <input class="form-control mt-2" type="text" name="name_area" required placeholder="Nombre area">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div`

    this.agregarAreas();
    this.showRegistro();
    },

    agregarAreas(){
        let formAreas = document.querySelector("#formAreas")
        formAreas.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        data.name_area = data.name_area.toLocaleUpperCase();

       let res = await ApiAreas.postAreas(data);
        alert(res);
        formAreas.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroAreas");
        let agregar = document.querySelector("#agregarAreas");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiAreas.getAreas();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Areas</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(area=>{
                    return `
                    <tr>
                    <td>${area.code}</td>
                    <td>${area.nombreArea}</td>
                    <td class="contBut"><button  data-id="${area.code}" id="modificar" class="btnSelec">M</button> <button data-id="${area.code}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteAreas();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroAreas");
        let agregar = document.querySelector("#agregarAreas");

        agregar.addEventListener("click",(e)=>{
          this.showAreas();
        agregar.className += " active";
        registro.classList.remove("active");
        this.agregarAreas();
        })
    },

    DeleteAreas(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data =val.dataset.id;
                let res = await ApiAreas.deleteAreas(data);
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
                let idarea = val.dataset.id;
                let areaUpdate = await ApiAreas.getAreasId(idarea);
                console.log(areaUpdate);
               document.querySelector(".containerForm").innerHTML =  `
               <h1 class="text-center">Modificar Areas</h1>
            <form class="formTables" id="newForm">
            <div class="row">
            <div class="col-12 d-flex flex-column justify-content-center mb-3">
                <label for="">Ingrese la nueva area</label>
                <input class="form-control" value="${areaUpdate.MESSAGE[0].nombreArea}" type="text" name="name_area" required placeholder="Nombre area">
            </div>
            <div class="col-12 d-flex justify-content-center">
                <button id="${idarea}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        data.name_area = data.name_area.toLocaleUpperCase();
        let res = await ApiAreas.updateAreas(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}