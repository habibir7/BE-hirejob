const Pool = require("../config/db")

const getAuthModel = async() => {
    return new Promise((resolve,reject) => {
        Pool.query("SELECT * FROM user_auth",(err,res) =>{
            if(!err){
                return resolve(res)
            }else{
                reject(err)
            }
        })
    })
}

const getAuthByEmailModel = async (email) => {
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM user_auth WHERE email='${email}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
		})
	)
}

const createAuthModel = async(data) => {
    let  {id_user, email, password, name, phone,  role, position} = data
    console.log(data)
    return new Promise((resolve,reject) => 
        Pool.query(`INSERT INTO user_auth (id_user, email, password, name, phone, position, role, otp, created_at, updated_at) VALUES ('${id_user}','${email}', '${password}', '${name}', '${phone}', '${position}', '${role}', NULL, NOW(), NULL)`,(err,res) => 
        {
            if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
        })
       
    )
}

const createOtpAuthModel = async(otp,id_user) => {
    return new Promise((resolve,reject) => {
        Pool.query(`UPDATE user_auth set otp='${otp}' where id_user='${id_user}'`,(err,res) => {
            if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
        })
    })
}

const nullOtpAuthModel = async(id_user) => {
    return new Promise((resolve,reject) => {
        Pool.query(`UPDATE user_auth set otp=NULL where id_user='${id_user}'`,(err,res) => {
            if(!err){
				return resolve(res)
			} else {
                console.log(err)
				reject(err)
			}
        })
    })
}

const getOtpAuthModel = async(otp) => {
    return new Promise((resolve,reject) => {
        Pool.query(`SELECT * FROM user_auth where otp='${otp}'`),(err,res) =>{
            if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
        }
    })
}

const updatePasswordAuthModel = async(password,id_user) => {
    return new Promise((resolve,reject) => {
        Pool.query(`UPDATE user_auth set password='${password}' where id_user='${id_user}'`,(err,res) => {
            if(!err){
				return resolve(res)
			} else {
                console.log(err)
				reject(err)
			}
        })
    })
}

module.exports = {getAuthModel,getAuthByEmailModel,createAuthModel,createOtpAuthModel,getOtpAuthModel,nullOtpAuthModel,updatePasswordAuthModel}