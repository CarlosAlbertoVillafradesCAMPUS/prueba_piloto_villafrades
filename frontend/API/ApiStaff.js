export default {
    async getStaff(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/staff", config)).json();
        return data;
    },

    async getStaffId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/staff/${id}`, config)).json();
        return data;
    },

    async postStaff(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/staff", config)).text();
        return res;
    },

    async updateStaff(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/staff/${id}`, config)).text();
        return res;
    },

    async deleteStaff(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/staff/${id}`, config)).text();
        return res;
    }
}