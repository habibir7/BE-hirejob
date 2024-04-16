const Koneksi = require("../config/db")


const getProvinceByIdModel = async (id_province) => {
    console.log(id_province)
	return new Promise((resolve,reject)=>
		Koneksi.query(`SELECT * FROM province WHERE id_province='${id_province}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
		})
	)
}

const getProvinceModel = async() => {
    return new Promise((resolve,reject) => {
        Koneksi.query("SELECT * FROM province",(err,res) =>{
            if(!err){
                return resolve(res)
            }else{
                reject(err)
            }
        })
    })
}

const createProvinceModel = async(data) => {
    let  {id_province, province_name} = data
    return new Promise((resolve,reject) => 
        Koneksi.query(`INSERT INTO province (id_province, province_name) VALUES ('${id_province}', '${province_name}')`,(err,res) => 
        {
            if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
        })
       
    )
}

const updateProvinceModel = async(data) => {
	let {id_province,province_name} = data
	return new Promise((resolve,reject) =>
		Koneksi.query(`UPDATE province SET province_name='${province_name}' WHERE id_province='${id_province}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const deleteProvinceModel = async(id_province) => {
	return new Promise((resolve,reject) =>
	 Koneksi.query(`DELETE FROM province where id_province ='${id_province}'`,(err,res) => {
		if(!err){
			return resolve(res)
		} else {
			console.log(`error db - `,err)
			reject(err)
		}
	 })
	)
}

module.exports = {createProvinceModel,getProvinceModel,getProvinceByIdModel,updateProvinceModel,deleteProvinceModel}