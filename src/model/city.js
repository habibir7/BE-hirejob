const Koneksi = require("../config/db")


const getCityByIdModel = async (id_city) => {
    console.log(id_city)
	return new Promise((resolve,reject)=>
		Koneksi.query(`SELECT * FROM city WHERE id_city='${id_city}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
		})
	)
}

const getCityModel = async() => {
    return new Promise((resolve,reject) => {
        Koneksi.query("SELECT * FROM city",(err,res) =>{
            if(!err){
                return resolve(res)
            }else{
                reject(err)
            }
        })
    })
}

const createCityModel = async(data) => {
    let  {id_city, city_name} = data
    return new Promise((resolve,reject) => 
        Koneksi.query(`INSERT INTO city (id_city, city_name) VALUES ('${id_city}', '${city_name}')`,(err,res) => 
        {
            if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
        })
       
    )
}

const updateCityModel = async(data) => {
	let {id_city,city_name} = data
	return new Promise((resolve,reject) =>
		Koneksi.query(`UPDATE city SET city_name='${city_name}' WHERE id_city='${id_city}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const deleteCityModel = async(id_city) => {
	return new Promise((resolve,reject) =>
	 Koneksi.query(`DELETE FROM city where id_city ='${id_city}'`,(err,res) => {
		if(!err){
			return resolve(res)
		} else {
			console.log(`error db - `,err)
			reject(err)
		}
	 })
	)
}

module.exports = {createCityModel,getCityModel,getCityByIdModel,updateCityModel,deleteCityModel}