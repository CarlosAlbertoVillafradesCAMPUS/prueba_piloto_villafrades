export default {
    agregarCountry(){
        let formCountries = document.querySelector("#formCountries")
        formCountries.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        data.name_country = data.name_country.toLocaleUpperCase();

        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/countries", config)).text();
        alert(res);
        formCountries.reset();
        })
    },

    showRegistro(){
        let registro = document.querySelector(".registro");
        let agregar = document.querySelector("#agregar");
        registro.addEventListener("click", async (e)=>{
            let config = {
                method: "GET",
                header: {"Content-Type": "application/json"},
            }

            let data = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/countries", config)).json();
            document.querySelector(".containerForm").innerHTML = `
            <div class="cont">
            <h2>COUNTRIES</h2>
            <table class="tableCountry">
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
        let registro = document.querySelector(".registro");
        let agregar = document.querySelector("#agregar");
        agregar.addEventListener("click", async (e)=>{
            document.querySelector(".containerForm").innerHTML = `
            <form id="formCountries">
            <label for="">Ingrese el Nombre del pais a agregar</label>
            <input type="text" name="name_country" required placeholder="Nombre del pais">
            <button type="submit"> Agregar </button>
        </form>`;
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
                let data =val.dataset.id;

                let config = {
                    method: "DELETE",
                    header: {"Content-Type": "application/json"},
                }
    
                let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/countries/${data}`, config)).text();
                alert(res);
                window.location.reload();
            })
        });
    },

    showUpdate(){
        let btnUpdate = document.querySelectorAll("#modificar");
        btnUpdate.forEach((val,id) => {
            console.log(val);
            val.addEventListener("click", (e)=>{
                let code = val.dataset.id;
                console.log(code);
               document.querySelector(".containerForm").innerHTML =  `
               <form id="newForm">
               <label for="countryy">Ingrese el Nombre del nuevo pais</label>
               <input id="countryy" type="text" name="name_country" required placeholder="Nombre del pais">
               <button id="${code}" class="btnSub" type="submit"> Modificar </button>
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
        let id = btnSub.id;
        console.log(id);
        let data = Object.fromEntries(new FormData(e.target));
        data.name_country = data.name_country.toLocaleUpperCase();

        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/countries/${id}`, config)).text();
        alert(res);
        newForm.reset();
        window.location.reload();
        })
    }

}