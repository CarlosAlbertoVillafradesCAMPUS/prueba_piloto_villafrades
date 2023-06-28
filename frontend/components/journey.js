import ApiJourney from "../API/ApiJourney.js";

export default {
    async showJourney(){
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Journey</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarJourney" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroJourney" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Journey</h1>
        <form class="formTables" id="formJourney">
        <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center mb-2">
            <label for="">Nombre del Viaje</label>
            <input class="form-control mt-2" type="text" name="name_journey" required placeholder="Nombre viaje">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label for="">Check-in</label>
            <input class="form-control mt-2" type="time" name="check_in" required placeholder="">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label for="">Check-out</label>
            <input class="form-control mt-2" type="time" name="check_out" required placeholder="">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>`

    this.agregarJourney();
    this.showRegistro();
    },

    agregarJourney(){
        let formJourney = document.querySelector("#formJourney")
        formJourney.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiJourney.postJourney(data);
        alert(res);
        formJourney.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroJourney");
        let agregar = document.querySelector("#agregarJourney");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiJourney.getJourney();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Journey</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>CKECK-IN</th>
                        <th>CKECK-OUT</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(journey=>{
                    return `
                    <tr>
                    <td>${journey.id}</td>
                    <td>${journey.name_journey}</td>
                    <td>${journey.check_in}</td>
                    <td>${journey.check_out}</td>
                    <td class="contBut"><button  data-id="${journey.id}" id="modificar" class="btnSelec">M</button> <button data-id="${journey.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteJourney();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroJourney");
        let agregar = document.querySelector("#agregarJourney");

        agregar.addEventListener("click",(e)=>{
          this.showJourney();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteJourney(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data =val.dataset.id;
                let res = await ApiJourney.deleteJourney(data);
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
                let idJourney = val.dataset.id;
                let JourneyUpdate = await ApiJourney.getJourneyId(idJourney);
                console.log(JourneyUpdate);
               document.querySelector(".containerForm").innerHTML =  `
               <h1 class="text-center">Modificar Journey</h1>
            <form class="formTables" id="newForm">
            <div class="row">
            <div class="col-12 d-flex flex-column justify-content-center mb-3">
                <label for="">Nombre del Viaje</label>
                <input class="form-control" value="${JourneyUpdate.MESSAGE[0].name_journey}" type="text" name="name_journey" required placeholder="Nombre viaje">
            </div>
            <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label for="">Check-in</label>
            <input class="form-control" value="${JourneyUpdate.MESSAGE[0].check_in}" type="time" name="check_in" required placeholder="">
        </div>
            <div class="col-6 d-flex flex-column justify-content-center mb-3">
            <label for="">Check-out</label>
            <input class="form-control" value="${JourneyUpdate.MESSAGE[0].check_out}" type="time" name="check_out" required placeholder="">
        </div>
            <div class="col-12 d-flex justify-content-center">
                <button id="${idJourney}" class="btnSub fs-4" type="submit"> Modificar </button>
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

        let res = await ApiJourney.updateJourney(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}