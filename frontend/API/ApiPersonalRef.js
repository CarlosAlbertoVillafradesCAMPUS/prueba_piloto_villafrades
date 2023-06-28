export default {
    async getPersonalRef(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/personalRef", config)).json();
        return data;
    },

    async getPersonalRefId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/personalRef/${id}`, config)).json();
        return data;
    },

    async postPersonalRef(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/personalRef", config)).text();
        return res;
    },

    async updatePersonalRef(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/personalRef/${id}`, config)).text();
        return res;
    },

    async deletePersonalRef(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/personalRef/${id}`, config)).text();
        return res;
    }
}