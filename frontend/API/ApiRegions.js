export default {
    async getRegions(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/regions", config)).json();
        return data;
    },

    async getRegionsId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/regions/${id}`, config)).json();
        return data;
    },

    async postRegions(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/regions", config)).text();
        return res;
    },

    async updateRegions(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/regions/${id}`, config)).text();
        return res;
    },

    async deleteRegions(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/regions/${id}`, config)).text();
        return res;
    }
}