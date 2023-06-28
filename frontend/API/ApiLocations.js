export default {
    async getLocation(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/locations", config)).json();
        return data;
    },

    async getLocationId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/locations/${id}`, config)).json();
        return data;
    },

    async postLocation(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/locations", config)).text();
        return res;
    },

    async updateLocation(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/locations/${id}`, config)).text();
        return res;
    },

    async deleteLocation(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/locations/${id}`, config)).text();
        return res;
    }
}