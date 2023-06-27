export default {
    async getAreas(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/areas", config)).json();
        return data;
    },

    async getAreasId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/areas/${id}`, config)).json();
        return data;
    },

    async postAreas(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/areas", config)).text();
        return res;
    },

    async updateAreas(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/areas/${id}`, config)).text();
        return res;
    },

    async deleteAreas(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/areas/${id}`, config)).text();
        return res;
    }
}