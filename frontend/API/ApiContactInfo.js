export default {
    async getContactInfo(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/contactInfo", config)).json();
        return data;
    },

    async getContactInfoId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/contactInfo/${id}`, config)).json();
        return data;
    },

    async postContactInfo(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/contactInfo", config)).text();
        return res;
    },

    async updateContactInfo(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/contactInfo/${id}`, config)).text();
        return res;
    },

    async deleteContactInfo(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/contactInfo/${id}`, config)).text();
        return res;
    }
}