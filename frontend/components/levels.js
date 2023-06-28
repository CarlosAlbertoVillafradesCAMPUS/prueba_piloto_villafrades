import ApiLevels from "../API/ApiLevels.js";

export default {
    async showLevels(){
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Levels</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarLevels" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroLevels" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Levels</h1>
        <form class="formTables" id="formLevels">
        <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center mb-2">
            <label for="">Ingrese el nombre del nivel</label>
            <input class="form-control mt-2" type="text" name="name_level" required placeholder="Nombre level">
        </div>
        <div class="col-12 d-flex flex-column justify-content-center mb-3">
            <label for="">Ingrese el grupo</label>
            <input class="form-control mt-2" type="text" name="group_level" required placeholder="Nombre Grupo">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>`

    this.agregarLevels();
    this.showRegistro();
    },

    agregarLevels(){
        let formLevels = document.querySelector("#formLevels")
        formLevels.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        data.name_level = data.name_level.toLocaleUpperCase();
        data.group_level = data.group_level.toLocaleUpperCase();

       let res = await ApiLevels.postLevels(data);
        alert(res);
        formLevels.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroLevels");
        let agregar = document.querySelector("#agregarLevels");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiLevels.getLevels();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Levels</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>GROUP</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(level=>{
                    return `
                    <tr>
                    <td>${level.id}</td>
                    <td>${level.name_level}</td>
                    <td>${level.group_level}</td>
                    <td class="contBut"><button  data-id="${level.id}" id="modificar" class="btnSelec">M</button> <button data-id="${level.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteLevels();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroLevels");
        let agregar = document.querySelector("#agregarLevels");

        agregar.addEventListener("click",(e)=>{
          this.showLevels();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteLevels(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data =val.dataset.id;
                let res = await ApiLevels.deleteLevels(data);
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
                let idLevels = val.dataset.id;
                let levelsUpdate = await ApiLevels.getLevelsId(idLevels);
                console.log(levelsUpdate);
               document.querySelector(".containerForm").innerHTML =  `
               <h1 class="text-center">Modificar Levels</h1>
            <form class="formTables" id="newForm">
            <div class="row">
            <div class="col-12 d-flex flex-column justify-content-center mb-3">
                <label for="">Ingrese el nuevo nivel</label>
                <input class="form-control" value="${levelsUpdate.MESSAGE[0].name_level}" type="text" name="name_level" required placeholder="Nombre Nivel">
            </div>
            <div class="col-12 d-flex flex-column justify-content-center mb-3">
            <label for="">Ingrese el grupo</label>
            <input class="form-control" value="${levelsUpdate.MESSAGE[0].group_level}" type="text" name="group_level" required placeholder="Nombre Grupo">
        </div>
            <div class="col-12 d-flex justify-content-center">
                <button id="${idLevels}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        data.name_level = data.name_level.toLocaleUpperCase();
        data.group_level = data.group_level.toLocaleUpperCase();

        let res = await ApiLevels.updateLevels(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}