export default {
    async getJourney(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/journey", config)).json();
        return data;
    },

    async getJourneyId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/journey/${id}`, config)).json();
        return data;
    },

    async postJourney(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/prueba_piloto_villafrades/uploads/journey", config)).text();
        return res;
    },

    async updateJourney(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/journey/${id}`, config)).text();
        return res;
    },

    async deleteJourney(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/prueba_piloto_villafrades/uploads/journey/${id}`, config)).text();
        return res;
    }
}