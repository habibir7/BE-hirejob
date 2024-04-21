/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const {
  showPortofolioModel,
  showPortofolioByIdModel,
  getPortofolioByIdModel,
  searchPortofolioDetailModel,
  searchPortofolioCountModel,
  inputPortofolioModel,
  updatePortofolioModel,
  deletePortofolioModel,
} = require("../model/portofolio");
const cloudinary = require("../config/photo");

const portofolioController = {
  showPortofolio: async (req, res, next) => {
    try {
      // Process
      let portofolio = await showPortofolioModel();
      let result = portofolio.rows;
      return res.status(200).json({
        code: 200,
        message: "Success showPortofolio",
        data: result,
      });
    } catch (err) {
      console.log("showPortofolio error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showPortofolio" });
    }
  },

  showPortofolioById: async (req, res, next) => {
    try {
      // Check params
      let { id_user } = req.params;
      if (id_user === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      // Process
      let portofolio = await showPortofolioByIdModel(id_user);
      let result = portofolio.rows;
      if (!result.length) {
        return res.status(404).json({
          code: 404,
          message: "Portofolio not found or id invalid",
        });
      }
      return res.status(200).json({
        code: 200,
        message: "Success showPortofolioById",
        data: result[0],
      });
    } catch (err) {
      console.log("showPortofolioById error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showPortofolioByIdcipe" });
    }
  },

  searchPortofolio: async (req, res, next) => {
    try {
      // Check searchBy
      let searchBy = "type";
      if (req.query.searchBy) {
        if (req.query.searchBy === "type") {
          searchBy = req.query.searchBy;
        }
      }
      console.log("searchBy:", searchBy);

      // Check sortBy
      let sortBy = "created_at";
      if (req.query.sortBy) {
        if (
          req.query.sortBy === "created_at" ||
          req.query.sortBy === "updated_at"
        ) {
          sortBy = req.query.sortBy;
        }
      }
      console.log("sortBy:", sortBy);

      // Check sort
      let sort = "ASC";
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
      let portofolio = await searchPortofolioDetailModel(data);
      let count = await searchPortofolioCountModel(data);
      let total = count.rowCount;
      let result = portofolio.rows;

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
        message: "Success searchPortofolioDetail",
        data: result,
        pagination,
      });
    } catch (err) {
      console.log("searchPortofolio error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed searchPortofolioDetail" });
    }
  },

  inputPortofolio: async (req, res, next) => {
    try {
      let { link_repo, type, photo } = req.body;

      // Check token
      // if(!req.payload){
      //     return res.status(404).json({code: 404, message: "Server need token, please login"})
      // }

      // Check body
      if (
        !link_repo ||
        link_repo === "" ||
        link_repo === " " ||
        !type ||
        type === "" ||
        type === " "
      ) {
        return res.status(404).json({ code: 404, message: "Input invalid" });
      }
      let id_user = req.payload.id_user
      // Check photo
      console.log("photo");
      console.log(req.file);

      // Check format photo
      console.log("isFileValid : " + req.isFileValid);
      if (req.isFileValid === false) {
        return res
          .status(404)
          .json({ code: 404, message: req.isFileValidMessage });
      }
      if (req.isFileValid === undefined) {
        return res.status(404).json({ code: 404, message: "Photo required" });
      }

      // Check photo size
      console.log("photo_size : " + req.file.size);
      if (req.file.size >= 5242880) {
        return res
          .status(404)
          .json({ code: 404, message: "Photo is too large (max. 5 mb)" });
      }

      // Upload photo using cloudinary
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
      let data = {
        id: uuidv4(),
        link_repo,
        type,
        photo: imageUpload.secure_url,
        id_user
      };
      let result = await inputPortofolioModel(data);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "Success input data" });
      }
      return res.status(401).json({ code: 401, message: "Failed input data" });
    } catch (err) {
      console.log("inputPortofolio error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed inputPortofolio" });
    }
  },

  updatePortofolio: async (req, res, next) => {
    try {
      let { link_repo, type, photo } = req.body;

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

      // Check Portofolio
      let portofolio = await getPortofolioByIdModel(id);
      let resultPortofolio = portofolio.rows;
      if (!resultPortofolio.length) {
        return res.status(404).json({
          code: 404,
          message: "Portofolio not found or id invalid",
        });
      }

      let newPortofolio = resultPortofolio[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newPortofolio.user_id) {
      //     console.log(`id_token = ${req.payload.id}`)
      //     console.log(`id_user = ${newPortofolio.user_id}`)
      //     return res.status(404).json({code: 404, message: 'This is not your Portofolio'})
      // }

      // Process
      let data = {
        id,
        link_repo: link_repo || newPortofolio.link_repo,
        type: type || newPortofolio.type,
        photo: photo || newPortofolio.photo,
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
        let result = await updatePortofolioModel(data);
        if (result.rowCount === 1) {
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
        data.photo = newPortofolio.photo;
        let result = await updatePortofolioModel(data);
        if (result.rowCount === 1) {
          return res
            .status(200)
            .json({ code: 200, message: "Success update data" });
        }
      }

      return res.status(401).json({ code: 404, message: "Failed update data" });
    } catch (err) {
      console.log("putPortofolio error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed putPortofolio" });
    }
  },

  deletePortofolio: async (req, res, next) => {
    try {
      // Check params
      let { id } = req.params;
      if (id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      let portofolio = await getPortofolioByIdModel(id);

      // Check Portofolio
      let resultPortofolio = portofolio.rows;
      if (!resultPortofolio.length) {
        return res.status(404).json({
          code: 404,
          message: "Portofolio not found or id invalid",
        });
      }

      let newPortofolio = resultPortofolio[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newPortofolio.user_id) {
      //   console.log(`id_token = ${req.payload.id}`);
      //   console.log(`id_user = ${newPortofolio.user_id}`);
      //   return res
      //     .status(404)
      //     .json({ code: 404, message: "This is not your Portofolio" });
      // }

      // Process
      let result = await deletePortofolioModel(id);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success delete data" });
      }
      return res.status(404).json({ code: 404, message: "Failed delete data" });
    } catch (err) {
      console.log("dropPortofolio error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed dropPortofolio" });
    }
  },
};

module.exports = portofolioController;
