const { v4: uuidv4 } = require("uuid");
const argon2 = require("argon2");
const {
  getAuthModel,
  getAuthByEmailModel,
  getAuthByIdModel,
  createAuthModel,
  createOtpAuthModel,
  updatePasswordAuthModel,
  nullOtpAuthModel,
  activatedUser
} = require("../model/auth");
const {
  createRecruiterModel
} = require("../model/recruiter")
const {
  inputWorkerModel
} = require("../model/worker");
const { GenerateToken } = require("../helper/token");
const { sendEmailActivated,sendEmailActivatedotp } = require("../helper/email");

const AuthController = {
  login: async (req, res, next) => {
    let { email, password } = req.body;
    if (!email || !password || email == "" || password == "") {
      return res.status(401).json({
        status: 401,
        messages: "email & password is required",
      });
    }
    let user = await getAuthByEmailModel(email);
    if (user.rowCount === 0) {
      return res
        .status(401)
        .json({ status: 401, messages: "email not register" });
    }
    let userData = user.rows[0];

    let isVerify = await argon2.verify(userData.password, password);
    if (!isVerify) {
      return res.status(401).json({ status: 401, messages: "password wrong" });
    }
    if(!userData.isverify){
      return res
      .status(401)
      .json({ status: 401, messages: "account not verified, please check your email" });
    }

    
    console.log(userData);

    delete userData.password;
    let token = GenerateToken(userData);

    return res
      .status(201)
      .json({ status: 201, messages: "login success", token, userData });
  },
  getAuth: async (req, res, next) => {
    try {
      let users = await getAuthModel();
      let result = users.rows;
      return res.status(200).json({ message: "sukses getUsers", data: result });
    } catch (err) {
      console.log("users controller error");
      console.log(err);
      return res.status(404).json({ message: "gagal getUsers controller" });
    }
  },
  createAuth: async (req, res, next) => {
    try {
      let { email, password, name, phone, role, position, company_name } = req.body;
      if (
        !email ||
        email === "" ||
        !password ||
        password === "" ||
        !name ||
        name === "" ||
        !phone ||
        phone === "" ||
        !role ||
        role === ""
      ) {
        return res
          .status(401)
          .json({ code: 401, message: "Harap masukkan data dengan lengkap" });
      }
      if(role == "recruiter"){
        if(
          !company_name ||
          company_name == "" ||
          !position ||
          position == ""
        ){
          return res
          .status(401)
          .json({ code: 401, message: "Harap masukkan data dengan lengkap" });
        }
      }
      password = await argon2.hash(password);
      let cek = await getAuthByEmailModel(email);
      cek = await getAuthByEmailModel(email);
      if (cek.rowCount === 1) {
        return res.status(404).json({
          code: 404,
          message: "Email sudah terdaftar coba masukkan email lain",
        });
      }
      let data = { id_user: uuidv4(), email, password, name, phone, role , verifyotp: uuidv4()};


      let url = `https://hirejob-khaki.vercel.app/auth/activated/${data.id_user}/${data.verifyotp}`

      let sendOTP = await sendEmailActivated(email,url,name)

        if(!sendOTP){
            return res
            .status(401)
            .json({ status: 401, messages: "register failed when send email" });
        }

      if(role == "recruiter"){
        data = {id_recruiter:uuidv4(),...data,company_name,position}
        let resultauth = await createAuthModel(data);
        let result = await createRecruiterModel(data)
        if (result.rowCount === 1 && resultauth.rowCount === 1) {
          return res
            .status(201)
            .json({ code: 201, message: "Data berhasil Di input" });
        }
      }else if(role == "worker"){
        data = {id:uuidv4(),...data}
        let resultauth = await createAuthModel(data);
        let result = await inputWorkerModel(data)
        if (result.rowCount === 1 && resultauth.rowCount === 1) {
          return res
            .status(201)
            .json({ code: 201, message: "Data berhasil Di input" });
        }
      }else{
        return res
        .status(401)
        .json({ code: 401, message: "Maaf role tidak ditemukan" });
      }
      return res
        .status(401)
        .json({ code: 401, message: "Maaf data tidak berhasil Di input" });
    } catch (err) {
      console.log("Register Error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Register Controller Error" });
    }
  },
  requestOTP: async (req, res, next) => {
    try {
      let { email } = req.body;
      if (!email || email == "") {
        return res.status(401).json({
          status: 401,
          messages: "email is required",
        });
      }
      let user = await getAuthByEmailModel(email);
      if (user.rowCount === 0) {
        return res
          .status(401)
          .json({ status: 401, messages: "email not register" });
      }

      let userData = user.rows[0];

      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let otp = "";
      for (let i = 0; i < 5; i++) {
        otp += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      console.log(otp);
      let sendOTP = await sendEmailActivatedotp(email, otp, userData.name);

      if (!sendOTP) {
        return res
          .status(401)
          .json({ status: 401, messages: "register failed when send email" });
      }

      let otpStatus = await createOtpAuthModel(otp, userData.id_user);
      if (otpStatus.rowCount === 0) {
        return res
          .status(401)
          .json({ status: 401, messages: "error Otp create" });
      }

      return res
        .status(201)
        .json({ code: 201, message: "Otp berhasil Di kirim" , email});
    } catch (err) {
      console.log("OTP Error");
      console.log(err);
      return res.status(404).json({ code: 404, message: "OTP request Error" });
    }
  },
  otpLogin: async (req, res, next) => {
    try {
      let { email, otp } = req.body;
      if (!email || email == "" || !otp || otp == "") {
        return res.status(401).json({
          status: 401,
          messages: "email & OTP is required",
        });
      }
      let user = await getAuthByEmailModel(email);
      if (user.rowCount === 0) {
        return res
          .status(401)
          .json({ status: 401, messages: "email not register" });
      }

      let userData = user.rows[0];
      console.log(otp);
      if (userData.otp !== otp) {
        return res.status(401).json({ status: 401, messages: "otp wrong" });
      }
      console.log(userData);
      await nullOtpAuthModel(userData.id_user);

      delete userData.password;
      let token = GenerateToken(userData);

      return res
        .status(201)
        .json({ status: 201, messages: "OTP success", token, userData });
    } catch (err) {}
  },
  resetPassword: async (req, res, next) => {
    try {
      let { password } = req.body;
      if (!password || password == "") {
        return res.status(401).json({
          status: 401,
          messages: "new password is required",
        });
      }
      email = req.payload.email
      password = await argon2.hash(password);
      let result = await updatePasswordAuthModel(password, req.payload.id_user);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "Data berhasil Di input" ,email});
      }
      return res
        .status(404)
        .json({ code: 404, message: "error update password" });
    } catch (err) {
      console.log("Register Error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Register Controller Error" });
    }
  },
  verification: async (req, res, next) => {
    let { id_user, otp } = req.params;

    let user = await getAuthByIdModel(id_user);
    if (user.rowCount === 0) {
        return res
            .status(404)
            .json({ status: 404, messages: "email not register" });
    }
    let userData = user.rows[0];

    if (otp !== userData.verifyotp) {
        return res
            .status(404)
            .json({ status: 404, messages: "otp invalid" });
    }

    let activated = await activatedUser(id_user);

    if (!activated) {
        return res
            .status(404)
            .json({ status: 404, messages: "account failed verification" });
    }

    if(userData.role === "worker")
    {
      return res.redirect('https://hirejob-project.vercel.app/login/worker')
    }else if(userData.role === "recruiter")
    {
      return res.redirect('https://hirejob-project.vercel.app/login/recruiter')
    }
}
};

module.exports = AuthController;
