export default {
    async getMaintArea(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/maintArea", config)).json();
        return data;
    },

    async getMaintAreaId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/maintArea/${id}`, config)).json();
        return data;
    },

    async postMaintArea(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/maintArea", config)).text();
        return res;
    },

    async updateMaintArea(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/maintArea/${id}`, config)).text();
        return res;
    },

    async deleteMaintArea(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/maintArea/${id}`, config)).text();
        return res;
    }
}