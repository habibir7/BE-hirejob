/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const {
  showDetailProfileWorkerModel,
  showDetailProfileWorkerByIdModel,
  getDetailProfileWorkerByIdModel,
  searchDetailProfileWorkerDetailModel,
  searchDetailProfileWorkerCountModel,
  inputDetailProfileWorkerModel,
  updateDetailProfileWorkerModel,
  deleteDetailProfileWorkerModel,
} = require("../model/detail_profile_worker");

const detailProfileWorkerController = {
  showDetailProfileWorker: async (req, res, next) => {
    try {
      // Process
      let detailProfileWorker = await showDetailProfileWorkerModel();
      let result = detailProfileWorker.rows;
      return res.status(200).json({
        code: 200,
        message: "Success showDetailProfileWorker",
        data: result,
      });
    } catch (err) {
      console.log("showDetailProfileWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showDetailProfileWorker" });
    }
  },

  showDetailProfileWorkerById: async (req, res, next) => {
    try {
      // Check params
      let { id } = req.params;
      if (id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      // Process
      let detailProfileWorker = await getDetailProfileWorkerByIdModel(id);
      let result = detailProfileWorker.rows;
      if (!result.length) {
        return res.status(404).json({
          code: 404,
          message: "detailProfileWorker not found or id invalid",
        });
      }
      return res.status(200).json({
        code: 200,
        message: "Success showDetailProfileWorkerById",
        data: result[0],
      });
    } catch (err) {
      console.log("showDetailProfileWorkerById error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showDetailProfileWorkerByIdcipe" });
    }
  },

  searchDetailProfileWorker: async (req, res, next) => {
    try {
      // Check searchBy
      let searchBy = "province";
      if (req.query.searchBy) {
        if (
          req.query.searchBy === "province" ||
          req.query.searchBy === "city"
        ) {
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
      let sort = "DESC";
      if (req.query.sort) {
        if (
          req.query.sort === "ASC" ||
          req.query.sort === "DESC"
        ) {
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
      let detailProfileWorker = await searchDetailProfileWorkerDetailModel(
        data
      );
      let count = await searchDetailProfileWorkerCountModel(data);
      let total = count.rowCount;
      let result = detailProfileWorker.rows;

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
        message: "Success searchDetailProfileWorkerDetail",
        data: result,
        pagination,
      });
    } catch (err) {
      console.log("searchDetailProfileWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed searchDetailProfileWorkerDetail" });
    }
  },

  inputDetailProfileWorker: async (req, res, next) => {
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
      let result = await inputDetailProfileWorkerModel(data);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "Success input data" });
      }
      return res.status(401).json({ code: 401, message: "Failed input data" });
    } catch (err) {
      console.log("inputDetailProfileWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed inputDetailProfileWorker" });
    }
  },

  updateDetailProfileWorker: async (req, res, next) => {
    try {
      let { province, city, last_work, bio } = req.body;

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

      // Check DetailProfileWorker
      let detailProfileWorker = await getDetailProfileWorkerByIdModel(id);
      let resultDetailProfileWorker = detailProfileWorker.rows;
      if (!resultDetailProfileWorker.length) {
        return res.status(404).json({
          code: 404,
          message: "DetailProfileWorker not found or id invalid",
        });
      }

      let newDetailProfileWorker = resultDetailProfileWorker[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newDetailProfileWorker.user_id) {
      //     console.log(`id_token = ${req.payload.id}`)
      //     console.log(`id_user = ${newDetailProfileWorker.user_id}`)
      //     return res.status(404).json({code: 404, message: 'This is not your DetailProfileWorker'})
      // }

      // Process
      let data = {
        id,
        province: province || newDetailProfileWorker.province,
        city: city || newDetailProfileWorker.city,
        last_work: last_work || newDetailProfileWorker.last_work,
        bio: bio || newDetailProfileWorker.bio,
      };

      let result = await updateDetailProfileWorkerModel(data);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success update data" });
      }

      return res.status(401).json({ code: 404, message: "Failed update data" });
    } catch (err) {
      console.log("putDetailProfileWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed putDetailProfileWorker" });
    }
  },

  deleteDetailProfileWorker: async (req, res, next) => {
    try {
      // Check params
      let { id } = req.params;
      if (id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      let detailProfileWorker = await getDetailProfileWorkerByIdModel(id);

      // Check DetailProfileWorker
      let resultDetailProfileWorker = detailProfileWorker.rows;
      if (!resultDetailProfileWorker.length) {
        return res.status(404).json({
          code: 404,
          message: "DetailProfileWorker not found or id invalid",
        });
      }

      let newDetailProfileWorker = resultDetailProfileWorker[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newDetailProfileWorker.user_id) {
      //   console.log(`id_token = ${req.payload.id}`);
      //   console.log(`id_user = ${newDetailProfileWorker.user_id}`);
      //   return res
      //     .status(404)
      //     .json({ code: 404, message: "This is not your DetailProfileWorker" });
      // }

      // Process
      let result = await deleteDetailProfileWorkerModel(id);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success delete data" });
      }
      return res.status(404).json({ code: 404, message: "Failed delete data" });
    } catch (err) {
      console.log("dropDetailProfileWorker error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed dropDetailProfileWorker" });
    }
  },
};

module.exports = detailProfileWorkerController;
