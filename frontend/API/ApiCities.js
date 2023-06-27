export default {
    async getCities(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/cities", config)).json();
        return data;
    },

    async getCitiesId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/cities/${id}`, config)).json();
        return data;
    },

    async postCities(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/cities", config)).text();
        return res;
    },

    async updateCities(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/cities/${id}`, config)).text();
        return res;
    },

    async deleteCities(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/cities/${id}`, config)).text();
        return res;
    }
}