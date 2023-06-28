export default {
    async getPosition(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/position", config)).json();
        return data;
    },

    async getPositionId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/position/${id}`, config)).json();
        return data;
    },

    async postPosition(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/position", config)).text();
        return res;
    },

    async updatePosition(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/position/${id}`, config)).text();
        return res;
    },

    async deletePosition(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/position/${id}`, config)).text();
        return res;
    }
}