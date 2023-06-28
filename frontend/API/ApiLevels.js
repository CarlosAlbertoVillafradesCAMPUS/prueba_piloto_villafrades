export default {
    async getLevels(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }
        console.log("yeaaa");
        
        let data = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/levels", config)).json();
        return data;
    },

    async getLevelsId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/levels/${id}`, config)).json();
        return data;
    },

    async postLevels(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        console.log("yeaaa");
        let res = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/levels", config)).text();
        return res;
    },

    async updateLevels(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/levels/${id}`, config)).text();
        return res;
    },

    async deleteLevels(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/levels/${id}`, config)).text();
        return res;
    }
}