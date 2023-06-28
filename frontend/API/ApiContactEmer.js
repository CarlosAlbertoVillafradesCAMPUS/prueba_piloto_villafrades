export default {
    async getContactEmer(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/contactEmer", config)).json();
        return data;
    },

    async getContactEmerId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/contactEmer/${id}`, config)).json();
        return data;
    },

    async postContactEmer(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/contactEmer", config)).text();
        return res;
    },

    async updateContactEmer(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/contactEmer/${id}`, config)).text();
        return res;
    },

    async deleteContactEmer(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/contactEmer/${id}`, config)).text();
        return res;
    }
}