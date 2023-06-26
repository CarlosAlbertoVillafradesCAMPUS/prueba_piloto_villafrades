export default {
    async getCountries(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/countries", config)).json();
        return data;
    },

    async getCountriesId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/countries/${id}`, config)).json();
        return data;
    },

    async postCountries(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/countries", config)).text();
        return res;
    },

    async updateCountries(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/countries/${id}`, config)).text();
        return res;
    },

    async deleteCountries(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/SkylAb-117/prueba_piloto_villafrades/uploads/countries/${id}`, config)).text();
        return res;
    }
}