const {v4: uuidv4} = require("uuid")
const argon2 = require("argon2")
const {
    getAuthModel,
    getAuthByEmailModel,
} = require("../model/auth")

const AuthController = {
    login: async (req, res, next) => {
		let { email, password } = req.body;
        if (!email || !password || email == "" || password == "") {
            return res
                .status(401)
                .json({
                    status: 401,
                    messages: "username & password is required",
                });
        }
        let user = await getAuthByEmailModel(email);
        if (user.rowCount === 0) {
            return res
			.status(401)
			.json({ status: 401, messages: "username not register" });
        }
		let userData = user.rows[0]
		
		let isVerify = await argon2.verify(userData.password,password)
        if (!isVerify) {
			return res
			.status(401)
			.json({ status: 401, messages: "password wrong" });
        }
		console.log(userData)

		delete userData.password
		let token = GenerateToken(userData)
		
		return res.status(201).json({ status: 201, messages: "login success",token,userData });
	},
    getAuth: async (req,res,next) => {
        try{
            if(req.payload.otoritas == "Member"){
                let users = await getAuthByUsernameModel(req.payload.username)
                let result = users.rows
                return res.status(200).json({message:"sukses getUsersByUsername",data:result})
            }
            let users = await getAuthModel()
            let result = users.rows
            return res.status(200).json({message:"sukses getUsers",data:result})
        }catch(err){
            console.log("users controller error")
            console.log(err)
            return res.status(404).json({message:"gagal getUsers controller"})
        }
    }
}

module.exports = AuthController