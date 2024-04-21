/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const {
  showSkillsModel,
  showSkillsByIdModel,
  getSkillsByIdModel,
  searchSkillsDetailModel,
  searchSkillsCountModel,
  inputSkillsModel,
  updateSkillsModel,
  deleteSkillsModel,
} = require("../model/skills");

const skillsController = {
  showSkills: async (req, res, next) => {
    try {
      // Process
      let skills = await showSkillsModel();
      let result = skills.rows;
      return res.status(200).json({
        code: 200,
        message: "Success showSkills",
        data: result,
      });
    } catch (err) {
      console.log("showSkills error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showSkills" });
    }
  },

  showSkillsById: async (req, res, next) => {
    try {
      // Check params
      let { user_id } = req.params;
      if (user_id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      // Process
      let skills = await showSkillsByIdModel(user_id);
      let result = skills.rows;
      if (!result.length) {
        return res.status(404).json({
          code: 404,
          message: "Skills not found or id invalid",
        });
      }
      return res.status(200).json({
        code: 200,
        message: "Success showSkillsById",
        data: result[0],
      });
    } catch (err) {
      console.log("showSkillsById error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showSkillsByIdcipe" });
    }
  },

  searchSkills: async (req, res, next) => {
    try {
      // Check searchBy
      let searchBy = "skill_name";
      if (req.query.searchBy) {
        if (
          req.query.searchBy === "skill_name"
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
      let sort = "ASC";
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
      let skills = await searchSkillsDetailModel(
        data
      );
      let count = await searchSkillsCountModel(data);
      let total = count.rowCount;
      let result = skills.rows;

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
        message: "Success searchSkillsDetail",
        data: result,
        pagination,
      });
    } catch (err) {
      console.log("searchSkills error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed searchSkillsDetail" });
    }
  },

  inputSkills: async (req, res, next) => {
    try {
      let { skill_name } = req.body;

      // Check token
      // if(!req.payload){
      //     return res.status(404).json({code: 404, message: "Server need token, please login"})
      // }

      // Check body
      if (
        !skill_name ||
        skill_name === "" ||
        skill_name === " "
      ) {
        return res.status(404).json({ code: 404, message: "Input invalid" });
      }

      // Process
      let id_user = req.payload.id_user
      let data = { id: uuidv4(), skill_name,id_user };
      let result = await inputSkillsModel(data);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "Success input data" });
      }
      return res.status(401).json({ code: 401, message: "Failed input data" });
    } catch (err) {
      console.log("inputSkills error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed inputSkills" });
    }
  },

  updateSkills: async (req, res, next) => {
    try {
      let { skill_name } = req.body;

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

      // Check Skills
      let skills = await getSkillsByIdModel(id);
      let resultSkills = skills.rows;
      if (!resultSkills.length) {
        return res.status(404).json({
          code: 404,
          message: "Skills not found or id invalid",
        });
      }

      let newSkills = resultSkills[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newSkills.user_id) {
      //     console.log(`id_token = ${req.payload.id}`)
      //     console.log(`id_user = ${newSkills.user_id}`)
      //     return res.status(404).json({code: 404, message: 'This is not your Skills'})
      // }

      // Process
      let data = {
        id,
        skill_name: skill_name || newSkills.skill_name
      };

      let result = await updateSkillsModel(data);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success update data" });
      }

      return res.status(401).json({ code: 404, message: "Failed update data" });
    } catch (err) {
      console.log("putSkills error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed putSkills" });
    }
  },

  deleteSkills: async (req, res, next) => {
    try {
      // Check params
      let { id } = req.params;
      if (id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      let skills = await getSkillsByIdModel(id);

      // Check Skills
      let resultSkills = skills.rows;
      if (!resultSkills.length) {
        return res.status(404).json({
          code: 404,
          message: "Skills not found or id invalid",
        });
      }

      let newSkills = resultSkills[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newSkills.user_id) {
      //   console.log(`id_token = ${req.payload.id}`);
      //   console.log(`id_user = ${newSkills.user_id}`);
      //   return res
      //     .status(404)
      //     .json({ code: 404, message: "This is not your Skills" });
      // }

      // Process
      let result = await deleteSkillsModel(id);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success delete data" });
      }
      return res.status(404).json({ code: 404, message: "Failed delete data" });
    } catch (err) {
      console.log("dropSkills error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed dropSkills" });
    }
  },
};

module.exports = skillsController;
