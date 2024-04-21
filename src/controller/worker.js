/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const {
  showWorkerModel,
  showWorkerByIdModel,
  getWorkerByIdModel,
  searchWorkerDetailModel,
  searchWorkerCountModel,
  inputWorkerModel,
  updateWorkerModel,
  deleteWorkerModel,
  showWorkerAllDataByIdModel
} = require("../model/worker");
const {
  updateAuthModel
} = require("../model/auth")
const cloudinary = require("../config/photo");

const workerController = {
  showWorker: async (req, res, next) => {
    try {
      // Process
      let worker = await showWorkerModel();
      let result = worker.rows;
      return res.status(200).json({
        code: 200,
        message: "Success showWorker",
        data: result,
      });
    } catch (err) {
      console.log("showWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showWorker" });
    }
  },

  showWorkerAllData: async (req, res, next) => {
    try {
      // Check params
      let { user_id } = req.params;
      if (user_id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      // Process
      let worker = await showWorkerAllDataByIdModel(user_id);
      let result = worker.rows;
      if (!result.length) {
        return res.status(404).json({
          code: 404,
          message: "Worker not found or id invalid",
        });
      }
      
      return res.status(200).json({
        code: 200,
        message: "Success showWorkerAllDataById",
        data: result[0],
      });
    } catch (err) {
      console.log("showWorkerAllDataById error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showWorkerByAllDataById" });
    }
  },

  showWorkerById: async (req, res, next) => {
    try {
      // Check params
      let { user_id } = req.params;
      if (user_id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      // Process
      let worker = await showWorkerByIdModel(user_id);
      let result = worker.rows;
      if (!result.length) {
        return res.status(404).json({
          code: 404,
          message: "Worker not found or id invalid",
        });
      }
      return res.status(200).json({
        code: 200,
        message: "Success showWorkerById",
        data: result[0],
      });
    } catch (err) {
      console.log("showWorkerById error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showWorkerByIdcipe" });
    }
  },

  searchWorker: async (req, res, next) => {
    try {
      // Check searchBy
      let searchBy = "name";
      if (req.query.searchBy) {
        if (
          req.query.searchBy === "name" ||
          req.query.searchBy === "skill_name"
        ) {
          searchBy = req.query.searchBy;
        }
      }
      console.log("searchBy:", searchBy);

      // Check sortBy
      let sortBy = "user_auth.created_at";
      if (req.query.sortBy) {
        if (
          req.query.sortBy === "user_auth.created_at" ||
          req.query.sortBy === "name" ||
          req.query.sortBy === "skill_name"
        ) {
          sortBy = req.query.sortBy;
        }
      }
      console.log("sortBy:", sortBy);

      // Check sort
      let sort = "DESC";
      if (req.query.sort) {
        if (req.query.sort === "ASC" || req.query.sort === "DESC") {
          sort = req.query.sort;
        }
      }
      console.log("sort:", sort);

      // Check search, limit & page
      let search = req.query.search || "";
      let limit = parseInt(req.query.limit) || 3;
      let page = ((parseInt(req.query.page) || 1) - 1) * parseInt(limit);

      // Process
      let data = { searchBy, search, sortBy, sort, limit, page };
      let worker = await searchWorkerDetailModel(
        data
      );
      let count = await searchWorkerCountModel(data);
      let total = count.rowCount;
      let result = worker.rows;

      // Pagination
      let pageNext;
      if (parseInt(req.query.page) >= Math.round(total / parseInt(limit))) {
        pageNext = 0;
      } else {
        pageNext = parseInt(req.query.page) + 1;
      }
      let pagination = {
        pageTotal: Math.round(total / parseInt(limit)),
        pagePrev: parseInt(req.query.page) - 1,
        pageNow: parseInt(req.query.page),
        pageNext,
        totalData: total,
      };

      return res.status(200).json({
        code: 200,
        message: "Success searchWorkerDetail",
        data: result,
        pagination,
      });
    } catch (err) {
      console.log("searchWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed searchWorkerDetail" });
    }
  },

  inputWorker: async (req, res, next) => {
    try {
      let { province, city, last_work, bio } = req.body;

      // Check token
      // if(!req.payload){
      //     return res.status(404).json({code: 404, message: "Server need token, please login"})
      // }

      // Check body
      if (
        !province ||
        province === "" ||
        province === " " ||
        !city ||
        city === "" ||
        city === " " ||
        !last_work ||
        last_work === "" ||
        last_work === " "
      ) {
        return res.status(404).json({ code: 404, message: "Input invalid" });
      }

      // Process
      let data = { id: uuidv4(), province, city, last_work, bio };
      let result = await inputWorkerModel(data);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "Success input data" });
      }
      return res.status(401).json({ code: 401, message: "Failed input data" });
    } catch (err) {
      console.log("inputWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed inputWorker" });
    }
  },

  updateWorker: async (req, res, next) => {
    try {
      let { name, province_id, city_id, last_work, bio, photo, job_desk } = req.body;

      // Check token
      // if (!req.payload) {
      //   return res
      //     .status(404)
      //     .json({ code: 404, message: "Server need token, please login" });
      // }

      // Check params
      let { id } = req.params;
      if (id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      // Check Worker
      let Worker = await getWorkerByIdModel(id);
      let resultWorker = Worker.rows;
      if (!resultWorker.length) {
        return res.status(404).json({
          code: 404,
          message: "Worker not found or id invalid",
        });
      }

      let newWorker = resultWorker[0];

      console.log(newWorker)
      // Check if user_id and id token same or not
      // if (req.payload.id !== newWorker.user_id) {
      //     console.log(`id_token = ${req.payload.id}`)
      //     console.log(`id_user = ${newWorker.user_id}`)
      //     return res.status(404).json({code: 404, message: 'This is not your Worker'})
      // }
      // Process
      let data = {
        id,
        province_id: province_id || resultWorker.province_id,
        city_id: city_id || resultWorker.city_id,
        last_work: last_work || resultWorker.last_work,
        bio: bio || resultWorker.bio,
        photo: photo || resultWorker.photo,
        job_desk: job_desk || resultWorker.job_desk,
        name: name || resultWorker.name,
        id_user: newWorker.user_id,
        email: newWorker.email,
        phone: newWorker.phone
      };

      console.log(data)
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
        let result = await updateWorkerModel(data);
        let resultauth = await updateAuthModel(data)
        if (result.rowCount === 1 & resultauth.rowCount === 1) {
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
        data.photo = newWorker.photo;
        let result = await updateWorkerModel(data);
        let resultauth = await updateAuthModel(data)
        if (result.rowCount === 1 & resultauth.rowCount === 1) {
          return res
            .status(200)
            .json({ code: 200, message: "Success update data" });
        }
      }

      return res.status(401).json({ code: 404, message: "Failed update data" });

      let result = await updateWorkerModel(data);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success update data" });
      }

      return res.status(401).json({ code: 404, message: "Failed update data" });
    } catch (err) {
      console.log("putWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed putWorker" });
    }
  },

  deleteWorker: async (req, res, next) => {
    try {
      // Check params
      let { id } = req.params;
      if (id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      let worker = await getWorkerByIdModel(id);

      // Check Worker
      let resultWorker = worker.rows;
      if (!resultWorker.length) {
        return res.status(404).json({
          code: 404,
          message: "Worker not found or id invalid",
        });
      }

      let newWorker = resultWorker[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newWorker.user_id) {
      //   console.log(`id_token = ${req.payload.id}`);
      //   console.log(`id_user = ${newWorker.user_id}`);
      //   return res
      //     .status(404)
      //     .json({ code: 404, message: "This is not your Worker" });
      // }

      // Process
      let result = await deleteWorkerModel(id);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success delete data" });
      }
      return res.status(404).json({ code: 404, message: "Failed delete data" });
    } catch (err) {
      console.log("dropWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed dropWorker" });
    }
  },
};

module.exports = workerController;
