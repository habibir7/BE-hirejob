const { v4: uuidv4 } = require("uuid");
const {
  getRecuiterModel,
  getRecuiterByIdModel,
  updateRecruiterModel,
} = require("../model/recruiter");
const { updateAuthRecruiterModel } = require("../model/auth");
const cloudinary = require("../config/photo");

const recuiterController = {
  getRecruiter: async (req, res, next) => {
    try {
      let users = await getRecuiterModel();
      let result = users.rows;
      return res.status(200).json({ message: "sukses getUsers", data: result });
    } catch (err) {
      console.log("users controller error");
      console.log(err);
      return res.status(404).json({ message: "gagal getUsers controller" });
    }
  },

  getRecruiterByID: async (req, res, next) => {
    try {
      let { id_user } = req.params;
      if (id_user === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      let users = await getRecuiterByIdModel(id_user);
      let result = users.rows;
      return res.status(200).json({ message: "sukses getUsers", data: result[0] });
    } catch (err) {
      console.log("users controller error");
      console.log(err);
      return res.status(404).json({ message: "gagal getUsers controller" });
    }
  },

  updateRecruiter: async (req, res, next) => {
    try {
      let id_user = req.payload.id_user;
      console.log(req.payload.id_user);
      let {
        company_name,
        company_field,
        company_info,
        email,
        company_email,
        company_phone,
        city_id,
        province_id,
        photo,
        linkedin,
        city,
        province,
      } = req.body;
      //   let recruiter = await getRecuiterByIdModel(id_user);
      let recruiter = await getRecuiterByIdModel(id_user);
      let resultRecruiter = recruiter.rows;
      if (!resultRecruiter.length) {
        return res
          .status(404)
          .json({ message: "recruiter not found or id invalid" });
      }
      let Recruiter = resultRecruiter[0];
      console.log(Recruiter);
      let data = {
        id_user,
        company_name: company_name || Recruiter.company_name,
        company_field: company_field || Recruiter.company_field,
        company_info: company_info || Recruiter.company_info,
        email: email || Recruiter.email,
        company_email: company_email || Recruiter.company_email,
        company_phone: company_phone || Recruiter.company_phone,
        city_id: city_id || Recruiter.city_id,
        province_id: province_id || Recruiter.province_id,
        photo: photo || Recruiter.photo,
        linkedin: linkedin || Recruiter.linkedin,
        city: city || Recruiter.city,
        province: province || Recruiter.province,
        // user_id : id_user
      };

      // Check & update with photo
      console.log("photo");
      console.log(req.file);

      // Update with photo
      if (req.isFileValid === true) {
        // Check photo size
        console.log("photo_size : " + req.file.size);
        if (req.file.size >= 5242880) {
          return res
            .status(404)
            .json({ code: 404, message: "Photo is too large (max. 5 mb)" });
        }

        // Upload photo
        const imageUpload = await cloudinary.uploader.upload(req.file.path, {
          folder: "peworld-database",
        });

        // Check if photo not uploaded to cloudinary
        console.log("cloudinary");
        console.log(imageUpload);
        if (!imageUpload) {
          return res
            .status(404)
            .json({ code: 404, message: "Upload photo failed" });
        }

        // Process
        data.photo = imageUpload.secure_url;
        let result = await updateRecruiterModel(data);
        let resultauth = await updateAuthRecruiterModel(data);
        if (result.rowCount === 1 && resultauth.rowCount === 1) {
          return res
            .status(200)
            .json({ code: 200, message: "Success update data" });
        }
      } else if (req.isFileValid === false) {
        // Check format photo
        console.log("isFileValid : " + req.isFileValid);
        if (!req.isFileValid) {
          return res
            .status(404)
            .json({ code: 404, message: req.isFileValidMessage });
        }
      }
      // Update without photo
      else if (req.isFileValid === undefined) {
        // Process
        data.photo = Recruiter.photo;
        let result = await updateRecruiterModel(data);
        let resultauth = await updateAuthRecruiterModel(data);
        if (result.rowCount === 1 && resultauth.rowCount === 1) {
          return res
            .status(200)
            .json({ code: 200, message: "Success update data" });
        }
      }

      return res.status(401).json({ code: 401, message: "Failed update data" });

      // let result = await updateRecruiterModel(data);
      // if (result.rowCount === 1) {
      //   return res
      //     .status(201)
      //     .json({ code: 201, message: "success update data" });
      // }

      // return res.status(404).json({ code: 404, message: "Error Update Data" });
    } catch (err) {
      console.log("users controller error");
      console.log(err);
      return res.status(404).json({ message: "gagal update controller" });
    }
  },
};

module.exports = recuiterController;
