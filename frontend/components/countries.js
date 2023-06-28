import ApiCountries from "../API/ApiCountries.js";

export default {
    agregarCountry(){
        let formCountries = document.querySelector("#formCountries")
        formCountries.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        data.name_country = data.name_country.toLocaleUpperCase();
       /*  let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/countries", config)).text();
         */
        //el codigo anterior hace referencia a la siguiente linea de codigo
        let res = await ApiCountries.postCountries(data);
        alert(res);
        formCountries.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registroCountry");
        let agregar = document.querySelector("#agregarCountry");
        registro.addEventListener("click", async (e)=>{
        let data = await ApiCountries.getCountries();
        console.log(data);
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>COUNTRIES</h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                    </tr>
                </thead>
                <tbody class="tableBody">
                ${data.MESSAGE.map(pais=>{
                    return `
                    <tr>
                    <td>${pais.code}</td>
                    <td>${pais.name}</td>
                    <td class="contBut"><button  data-id="${pais.code}" id="modificar" class="btnSelec">M</button> <button data-id="${pais.code}" id="eliminar" class="btnSelec">X</button></td>
                    </tr>
                    `
                }).join("")}
                </tbody>
            </table>
            </div>`;
            registro.className += " active";
            agregar.classList.remove("active");

            this.DeleteCountry();
            this.showUpdate();
        })
    },

    showForm(){
        let registro = document.querySelector(".registroCountry");
        let agregar = document.querySelector("#agregarCountry");
        agregar.addEventListener("click", async (e)=>{
            document.querySelector(".contPrincipal").innerHTML = `
            <div class="containerForm">
                <form id="formCountries">
                    <label for="">Ingrese el Nombre del pais a agregar</label>
                    <input type="text" name="name_country" required placeholder="Nombre del pais">
                    <button type="submit"> Agregar </button>
                </form>
            </div>`;
        agregar.className += " active";
        registro.classList.remove("active");
        this.agregarCountry();
        })
    },

    DeleteCountry(){
        let btnDelete = document.querySelectorAll("#eliminar");
        btnDelete.forEach((val,id) => {
            val.addEventListener("click", async (e)=>{
                console.log(val.dataset.id);
                let idCountry = val.dataset.id;
                let res = await ApiCountries.deleteCountries(idCountry);
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
                let idCountry = val.dataset.id;

                let info = await ApiCountries.getCountriesId(idCountry);
               document.querySelector(".containerForm").innerHTML =  `
               <form id="newForm">
               <label for="countryy">Ingrese el Nombre del nuevo pais</label>
               <input id="countryy" type="text" value="${info.MESSAGE[0].name}" name="name_country" required placeholder="Nombre del pais">
               <button id="${idCountry}" class="btnSub" type="submit"> Modificar </button>
           </form>`;
           this.updateCountry();
            })
        });
    },

    updateCountry(){
        let newForm = document.querySelector("#newForm");
        newForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let btnSub = document.querySelector(".btnSub");
        let idCountry = btnSub.id;
        let data = Object.fromEntries(new FormData(e.target));
        data.name_country = data.name_country.toLocaleUpperCase();
        let res = await ApiCountries.updateCountries(data, idCountry);
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}