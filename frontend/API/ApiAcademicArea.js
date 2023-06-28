export default {
    async getAcademicArea(){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/academicArea", config)).json();
        return data;
    },

    async getAcademicAreaId(id){
        let config = {
            method: "GET",
            header: {"Content-Type": "application/json"},
        }

        let data = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/academicArea/${id}`, config)).json();
        return data;
    },

    async postAcademicArea(data){
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch("http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/academicArea", config)).text();
        return res;
    },

    async updateAcademicArea(data, id){
        let config = {
            method: "PUT",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/academicArea/${id}`, config)).text();
        return res;
    },

    async deleteAcademicArea(id){
        let config = {
            method: "DELETE",
            header: {"Content-Type": "application/json"},
        }

        let res = await (await fetch(`http://localhost/SkylAb-116/prueba_piloto_villafrades/uploads/academicArea/${id}`, config)).text();
        return res;
    }
}