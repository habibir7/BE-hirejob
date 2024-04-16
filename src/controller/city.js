const {v4: uuidv4} = require("uuid")
const {
    getCityByIdModel,
    createCityModel,
    getCityModel,
    updateCityModel,
    deleteCityModel
} = require("../model/city")
const { search } = require("../router");
const { Protect } = require("../middleware/private")


const CityController = {
    getCityById: async(req,res,next) => {
        try{
            let { id_city } = req.params
            if(id_city === ""){
                return res.status(404).json({ message: "params id invalid" })
            }
            let city = await getCityByIdModel(id_city)
            let result = city.rows
            if (!result.length) {
                return res
                    .status(404)
                    .json({ message: "city not found or id invalid" });
            }
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getCityById", data: result[0] });
        }  catch (err) {
            return res
                .status(404)
                .json({ message: "failed getCityById Controller" });
        }
    },
        createCity: async (req,res,next) => {
        try {
            let { city_name } = req.body
            // if(req.payload.otoritas !== "Admin"){
            //     return res.json({code: 404,message: "Hanya Admin yang bisa menambah data"})
            // }
            if(
                !city_name ||
                city_name === "" 
            ){
                return res.json({code: 404,message: "Harap masukkan City Dengan lengkap"})
            }
            let data = {id_city: uuidv4(), city_name}
            let result = await createCityModel(data)
            if(result.rowCount === 1){
                return res
                .status(201)
                .json({ code:201, message: "Data berhasil Di input"})
            }
            return res
            .status(401)
            .json({ code: 401, message: "Maaf data tidak berhasil Di input"})
        } catch (err){
            return res
            .status(404)
            .json({ code: 404, message: "CreateCity Controller Error"})
        }
    }, 
        getCity: async (req,res,next) => {
        try{
            let resep = await getCityModel()
            let result = resep.rows
            return res.status(200).json({message:"sukses getCity ",data:result})
        }catch(err){
            return res.status(404).json({message:"gagal getCity controller"})
        }
    },
        updateCity: async (req, res, next) => {
        try {
            let { id_city } = req.params;
            // if(req.payload.otoritas !== "Admin"){
            //     return res.json({code: 404,message: "Hanya Admin yang bisa menambah data"})
            // }
            if (id_city === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let { city_name } = req.body;
            let city = await getCityByIdModel(id_city);
            let resultCity = city.rows;
            if (!resultCity.length) {
                return res
                    .status(404)
                    .json({ message: "city not found or id invalid" });
            }
            let City = resultCity[0];
            let data = {
                id_city,
                city_name: city_name || City.city_name,
            };
            console.log(data)
            let result = await updateCityModel(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success update data" });
            }
            return res.status(401).json({code:401,message:"failed update data"})
        } catch (err) {
            return res
                .status(404)
                .json({ message: "failed InputCity Controller" });
        }
    },
        deleteCity: async (req,res,next) => {
        try{
            let { id_city } = req.params;
            if(req.payload.otoritas !== "Admin"){
                return res.json({code: 404,message: "Hanya Admin yang bisa menambah data"})
            }
            if (id_city === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let city = await getCityByIdModel(id_city);
            let resultCity = city.rows;
            if (!resultCity.length) {
                return res
                    .status(404)
                    .json({ message: "city not found or id invalid" });
            }
            let result = await deleteCityModel(id_city)
            if (!result.length) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success Delete data" });
            }
            return res.status(200).json({code:401,message:"failed Delete data"})

        }catch(err){
            return res
            .status(404)
            .json({ code: 404, message: "Delete city Controller Error"})
        }
    }
}

module.exports = CityController