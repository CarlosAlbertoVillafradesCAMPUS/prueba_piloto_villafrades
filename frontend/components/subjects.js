import ApiSubjects from "../API/ApiSubjects.js";

export default {
    async showSubjects(){
        document.querySelector(".contMain").innerHTML =  `
    <h1 class="title">Subjects</h1>
    <ul class="breadcrumbs">
        <li><a  id="agregarSubjects" style="cursor: pointer;" class="active">Agregar</a></li>
        <li class="divider">/</li>
        <li><a class="registroSubjects" style="cursor: pointer;">Registro</a></li>
    </ul>
    <div class="containerForm">
    <h1 class="text-center">Subjects</h1>
        <form class="formTables" id="formSubjects">
        <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center mb-2">
            <label for="">Nombre Asignatura</label>
            <input class="form-control mt-2" type="text" name="name_subject" required placeholder="Nombre Asignatura">
        </div>
        <div class="col-12 d-flex justify-content-center">
            <button class="btnSubmit" type="submit"> Agregar </button>
        </div>
        </div>  
        </form>
	</div>`

    this.agregarSubjects();
    this.showRegistro();
    },

    agregarSubjects(){
        let formSubjects = document.querySelector("#formSubjects")
        formSubjects.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

       let res = await ApiSubjects.postSubjects(data);
        alert(res);
        formSubjects.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroSubjects");
        let agregar = document.querySelector("#agregarSubjects");
        registro.addEventListener("click", async (e)=>{
           let data = await ApiSubjects.getSubjects();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>Subjects</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(Subjects=>{
                    return `
                    <tr>
                    <td>${Subjects.id}</td>
                    <td>${Subjects.name_subject}</td>
                    <td class="contBut"><button  data-id="${Subjects.id}" id="modificar" class="btnSelec">M</button> <button data-id="${Subjects.id}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteSubjects();
            this.showUpdate();
            this.showForm();
            
        })
    },

    showForm(){
        let registro = document.querySelector(".registroSubjects");
        let agregar = document.querySelector("#agregarSubjects");

        agregar.addEventListener("click",(e)=>{
          this.showSubjects();
        agregar.className += " active";
        registro.classList.remove("active");
        })
    },

    DeleteSubjects(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let data =val.dataset.id;
                let res = await ApiSubjects.deleteSubjects(data);
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
                let idSubjects = val.dataset.id;
                let SubjectsUpdate = await ApiSubjects.getSubjectsId(idSubjects);
                console.log(SubjectsUpdate);
               document.querySelector(".containerForm").innerHTML =  `
               <h1 class="text-center">Modificar Subjects</h1>
            <form class="formTables" id="newForm">
            <div class="row">
            <div class="col-12 d-flex flex-column justify-content-center mb-2">
                <label for="">Nombre Asignatura</label>
                <input class="form-control" value="${SubjectsUpdate.MESSAGE[0].name_subject}" type="text" name="name_subject" required placeholder="Nombre Subjects">
            </div>
            <div class="col-12 d-flex justify-content-center">
                <button id="${idSubjects}" class="btnSub fs-4" type="submit"> Modificar </button>
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

        let res = await ApiSubjects.updateSubjects(data, id);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}