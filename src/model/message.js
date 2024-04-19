const Koneksi = require("../config/db")


const getMessageByIdModel = async (id_message) => {
    console.log(id_message)
	return new Promise((resolve,reject)=>
		Koneksi.query(`SELECT * FROM messagedetail WHERE id_messagedetail='${id_message}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
		})
	)
}

const getMessageModel = async() => {
    return new Promise((resolve,reject) => {
        Koneksi.query("SELECT * FROM message",(err,res) =>{
            if(!err){
                return resolve(res)
            }else{
                reject(err)
            }
        })
    })
}

const createMessageModel = async(data) => {
    let  {id_message,id_messagedetail,message_value,id} = data
    return new Promise((resolve,reject) => 
        Koneksi.query(`INSERT INTO message (id_message, id_messagedetail, message_value, id_user, created_at) VALUES ('${id_message}', '${id_messagedetail}', '${message_value}', '${id}' , NOW())`,(err,res) => 
        {
            if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
        })
       
    )
}

const updateMessageModel = async(data) => {
	let {id_message,message_name} = data
	return new Promise((resolve,reject) =>
		Koneksi.query(`UPDATE message SET message_name='${message_name}' WHERE id_message='${id_message}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const deleteMessageModel = async(id_message) => {
	return new Promise((resolve,reject) =>
	 Koneksi.query(`DELETE FROM message where id_message ='${id_message}'`,(err,res) => {
		if(!err){
			return resolve(res)
		} else {
			console.log(`error db - `,err)
			reject(err)
		}
	 })
	)
}

module.exports = {createMessageModel,getMessageModel,getMessageByIdModel,updateMessageModel,deleteMessageModel}