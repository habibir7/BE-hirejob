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
  activatedUser,
} = require("../model/auth");
const { inputSkillsModel } = require("../model/skills");
const { createRecruiterModel } = require("../model/recruiter");
const { inputWorkerModel } = require("../model/worker");
const { GenerateToken } = require("../helper/token");
const {
  sendEmailActivated,
  sendEmailActivatedotp,
} = require("../helper/email");

const AuthController = {
  login: async (req, res, next) => {
    let { email, password } = req.body;
    if (!email || !password || email == "" || password == "") {
      return res.status(401).json({
        status: 401,
        messages: "Email & password is required",
      });
    }
    let user = await getAuthByEmailModel(email);
    if (user.rowCount === 0) {
      return res
        .status(401)
        .json({ status: 401, messages: "Email not register" });
    }
    let userData = user.rows[0];

    let isVerify = await argon2.verify(userData.password, password);
    if (!isVerify) {
      return res.status(401).json({ status: 401, messages: "Incorrect password" });
    }
    if (!userData.isverify) {
      return res
        .status(401)
        .json({
          status: 401,
          messages: "Account not verified, please check your email",
        });
    }

    console.log(userData);

    delete userData.password;
    let token = GenerateToken(userData);

    return res
      .status(201)
      .json({ status: 201, messages: "Login success", token, userData });
  },

  getAuth: async (req, res, next) => {
    try {
      let users = await getAuthModel();
      let result = users.rows;
      return res.status(200).json({ message: "Success getUsers", data: result });
    } catch (err) {
      console.log("users controller error");
      console.log(err);
      return res.status(404).json({ message: "Failed getUsers controller" });
    }
  },

  createAuth: async (req, res, next) => {
    try {
      let { email, password, name, phone, role, position, company_name } =
        req.body;
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
          .json({ code: 401, message: "Please fill in all required fields" });
      }
      if (role == "recruiter") {
        if (
          !company_name ||
          company_name == "" ||
          !position ||
          position == ""
        ) {
          return res
            .status(401)
            .json({ code: 401, message: "Please fill in all required fields" });
        }
      }
      password = await argon2.hash(password);
      let cek = await getAuthByEmailModel(email);
      cek = await getAuthByEmailModel(email);
      if (cek.rowCount === 1) {
        return res.status(404).json({
          code: 404,
          message: "Email is already registered, please login",
        });
      }
      let data = {
        id_user: uuidv4(),
        email,
        password,
        name,
        phone,
        role,
        city_id : 1,
        province_id: 1,
        photo: 'https://res.cloudinary.com/dpasid4jl/image/upload/v1717426859/general-assets/3_fuibe7.jpg',
        verifyotp: uuidv4(),
      };

      let url = `https://hirejob-khaki.vercel.app/auth/activated/${data.id_user}/${data.verifyotp}`;

      let sendOTP = await sendEmailActivated(email, url, name);

      if (!sendOTP) {
        return res
          .status(401)
          .json({ status: 401, messages: "Register failed when send email" });
      }

      if (role == "recruiter") {
        data = { id_recruiter: uuidv4(), ...data, company_name, position };
        let resultauth = await createAuthModel(data);
        let result = await createRecruiterModel(data);
        if (result.rowCount === 1 && resultauth.rowCount === 1) {
          return res
            .status(201)
            .json({ code: 201, message: "Register success, please login" });
        }
      } else if (role == "worker") {
        data = { id: uuidv4(), ...data, skill_name: "", skill_id: uuidv4() };
        let resultauth = await createAuthModel(data);
        let result = await inputWorkerModel(data);
        let skill = await inputSkillsModel(data);
        if (result.rowCount === 1 && resultauth.rowCount === 1 && skill.rowCount === 1) {
          return res
            .status(201)
            .json({ code: 201, message: "Register success, please login" });
        }
      } else {
        return res
          .status(401)
          .json({ code: 401, message: "Role not found" });
      }
      return res
        .status(401)
        .json({ code: 401, message: "Data input failed" });
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
          messages: "Email is required",
        });
      }
      let user = await getAuthByEmailModel(email);
      if (user.rowCount === 0) {
        return res
          .status(401)
          .json({ status: 401, messages: "Email not registered" });
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
          .json({ status: 401, messages: "Register failed when send email" });
      }

      let otpStatus = await createOtpAuthModel(otp, userData.id_user);
      if (otpStatus.rowCount === 0) {
        return res
          .status(401)
          .json({ status: 401, messages: "Error create OTP" });
      }

      return res
        .status(201)
        .json({ code: 201, message: "OTP sent successfully", email });
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
          messages: "Email & OTP is required",
        });
      }
      let user = await getAuthByEmailModel(email);
      if (user.rowCount === 0) {
        return res
          .status(401)
          .json({ status: 401, messages: "Email not register" });
      }

      let userData = user.rows[0];
      console.log(otp);
      if (userData.otp !== otp) {
        return res.status(401).json({ status: 401, messages: "OTP invalid" });
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
          messages: "New password is required",
        });
      }
      email = req.payload.email;
      password = await argon2.hash(password);
      let result = await updatePasswordAuthModel(password, req.payload.id_user);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "Data input successfully", email });
      }
      return res
        .status(404)
        .json({ code: 404, message: "Error update password" });
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
        .json({ status: 404, messages: "Email not register" });
    }
    let userData = user.rows[0];

    if (otp !== userData.verifyotp) {
      return res.status(404).json({ status: 404, messages: "OTP invalid" });
    }

    let activated = await activatedUser(id_user);

    if (!activated) {
      return res
        .status(404)
        .json({ status: 404, messages: "Account failed verification" });
    }

    if (userData.role === "worker") {
      return res.redirect("https://hirejob-project.vercel.app/login/worker");
    } else if (userData.role === "recruiter") {
      return res.redirect("https://hirejob-project.vercel.app/login/recruiter");
    }
  },
};

module.exports = AuthController;
