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
		Koneksi.query(`SELECT * FROM users WHERE email='${email}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				reject(err)
			}
		})
	)
}

module.exports = {getAuthModel,getAuthByEmailModel}