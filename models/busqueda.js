const axios = require("axios");

class Busqueda{

    constructor(){
        let historial = {};
    }

    async getCiudad(nombre=""){
        const instance = axios.create(
            {
            baseURL: `http://api.positionstack.com/v1/forward`,
            params:{
                'access_key':process.env.POSITIONSTACK,
                'query': nombre,
                'limit': 5,
                
            }
            }
        )
        const resp = await instance.get();
        return resp.data.data.map((lugares, index)=>({
            id:index + 1,
            name: lugares.label,
            lat: lugares.latitude,
            lng:lugares.longitude,
        }))
    }

    async getClima(lat, lng){
        const instance = axios.create(
            {
                baseURL: "https://api.openweathermap.org/data/2.5/weather?",
                params:{
                    lat,
                    lon:lng,
                    appid:process.env.OPENWEATHER,
                    units: "metric",
                    lang: "es"
                }
            }
        )

        const resp = await instance.get();
        return {
            desc: resp.data.weather[0].description,
            min: resp.data.main.temp_min,
            max: resp.data.main.temp_max,
            temp: resp.data.main.temp
        }
    }

}

module.exports = {
    Busqueda
}