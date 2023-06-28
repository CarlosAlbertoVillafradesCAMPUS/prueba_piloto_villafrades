import ApiLocations from "../API/ApiLocations.js";


export default {
    async showLocations(){
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Locations</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarLocations" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroLocations" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Locations</h1>
        <form class="formTables" id="formLocations">
        <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center mb-3">
            <label for="">Ingrese el nombre de la location</label>
            <input class="form-control mt-2" type="text" name="name_location" required placeholder="Nombre location">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>`

    this.agregarLocations();
    this.showRegistro();
    },

    agregarLocations(){
        let formLocations = document.querySelector("#formLocations")
        formLocations.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        data.name_location = data.name_location.toLocaleUpperCase();

       let res = await ApiLocations.postLocation(data);
        alert(res);
        formLocations.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroLocations");
        let agregar = document.querySelector("#agregarLocations");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiLocations.getLocation();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Locations</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(location=>{
                    return `
                    <tr>
                    <td>${location.id}</td>
                    <td>${location.name_location}</td>
                    <td class="contBut"><button  data-id="${location.id}" id="modificar" class="btnSelec">M</button> <button data-id="${location.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteLocations();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroLocations");
        let agregar = document.querySelector("#agregarLocations");

        agregar.addEventListener("click",(e)=>{
          this.showLocations();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteLocations(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data =val.dataset.id;
                let res = await ApiLocations.deleteLocation(data);
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
                let idLocation = val.dataset.id;
                let locationUpdate = await ApiLocations.getLocationId(idLocation);
                console.log(locationUpdate);
               document.querySelector(".containerForm").innerHTML =  `
               <h1 class="text-center">Modificar Locations</h1>
            <form class="formTables" id="newForm">
            <div class="row">
            <div class="col-12 d-flex flex-column justify-content-center mb-3">
                <label for="">Ingrese la nueva location</label>
                <input class="form-control" value="${locationUpdate.MESSAGE[0].name_location}" type="text" name="name_location" required placeholder="Nombre location">
            </div>
            <div class="col-12 d-flex justify-content-center">
                <button id="${idLocation}" class="btnSub fs-4" type="submit"> Modificar </button>
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
        data.name_location = data.name_location.toLocaleUpperCase();
        let res = await ApiLocations.updateLocation(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}