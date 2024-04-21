/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const {
  showWorkExperienceModel,
  showWorkExperienceByIdModel,
  getWorkExperienceByIdModel,
  searchWorkExperienceDetailModel,
  searchWorkExperienceCountModel,
  inputWorkExperienceModel,
  updateWorkExperienceModel,
  deleteWorkExperienceModel,
} = require("../model/work_experience");
const cloudinary = require("../config/photo");

const workExperienceController = {
  showWorkExperience: async (req, res, next) => {
    try {
      // Process
      let workExperience = await showWorkExperienceModel();
      let result = workExperience.rows;
      return res.status(200).json({
        code: 200,
        message: "Success showWorkExperience",
        data: result,
      });
    } catch (err) {
      console.log("showWorkExperience error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showWorkExperience" });
    }
  },

  showWorkExperienceById: async (req, res, next) => {
    try {
      // Check params
      let { user_id } = req.params;
      if (user_id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      // Process
      let workExperience = await showWorkExperienceByIdModel(user_id);
      let result = workExperience.rows;
      if (!result.length) {
        return res.status(200).json({
          code: 200,
          message: "succes getWorkexperienceById",
          data: result,

        });
      }
      return res.status(200).json({
        code: 200,
        message: "Success showWorkExperienceById",
        data: result,
        // data: result[0],
      });
    } catch (err) {
      console.log("showWorkExperienceById error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showWorkExperienceByIdcipe" });
    }
  },

  searchWorkExperience: async (req, res, next) => {
    try {
      // Check searchBy
      let searchBy = "position";
      if (req.query.searchBy) {
        if (
          req.query.searchBy === "position"
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
      let workExperience = await searchWorkExperienceDetailModel(
        data
      );
      let count = await searchWorkExperienceCountModel(data);
      let total = count.rowCount;
      let result = workExperience.rows;

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
        message: "Success searchWorkExperienceDetail",
        data: result,
        pagination,
      });
    } catch (err) {
      console.log("searchWorkExperience error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed searchWorkExperienceDetail" });
    }
  },

  inputWorkExperience: async (req, res, next) => {
    try {
      let { position, company_name, working_start_at, working_end_at, description,photo } = req.body;

      // Check token
      // if(!req.payload){
      //     return res.status(404).json({code: 404, message: "Server need token, please login"})
      // }
      console.log(company_name)
      // Check body
      if (
        !position ||
        position === "" ||
        position === " " ||
        !company_name ||
        company_name === "" ||
        company_name === " " ||
        !working_start_at ||
        working_start_at === "" ||
        working_start_at === " " ||
        !working_end_at ||
        working_end_at === "" ||
        working_end_at === " "
      ) {
        return res.status(404).json({ code: 404, message: "Input invalid" });
      }

      // Process
      let id_user = req.payload.id_user
      let data = { id: uuidv4(), position, company_name, working_start_at, working_end_at, description,id_user, photo};
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
        let result = await inputWorkExperienceModel(data);
        if (result.rowCount === 1) {
          return res
            .status(200)
            .json({ code: 200, message: "Success input data" });
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
        let result = await inputWorkExperienceModel(data);
        if (result.rowCount === 1) {
          return res
            .status(200)
            .json({ code: 200, message: "Success input data" });
        }
      }
      // let result = await inputWorkExperienceModel(data);
      // if (result.rowCount === 1) {
      //   return res
      //     .status(201)
      //     .json({ code: 201, message: "Success input data" });
      // }
      // return res.status(401).json({ code: 401, message: "Failed input data" });
    } catch (err) {
      console.log("inputWorkExperience error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed inputWorkExperience" });
    }
  },

  updateWorkExperience: async (req, res, next) => {
    try {
      let { position, company_name, working_start_at, working_end_at, description } = req.body;

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

      // Check WorkExperience
      let workExperience = await getWorkExperienceByIdModel(id);
      let resultWorkExperience = workExperience.rows;
      if (!resultWorkExperience.length) {
        return res.status(404).json({
          code: 404,
          message: "WorkExperience not found or id invalid",
        });
      }

      let newWorkExperience = resultWorkExperience[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newWorkExperience.user_id) {
      //     console.log(`id_token = ${req.payload.id}`)
      //     console.log(`id_user = ${newWorkExperience.user_id}`)
      //     return res.status(404).json({code: 404, message: 'This is not your WorkExperience'})
      // }

      // Process
      let data = {
        id,
        position: position || newWorkExperience.position,
        company_name: company_name || newWorkExperience.company_name,
        working_start_at: working_start_at || newWorkExperience.working_start_at,
        working_end_at: working_end_at || newWorkExperience.working_end_at,
        description: description || newWorkExperience.description,
        photo: newWorkExperience.photo
      };

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
        let result = await updateWorkExperienceModel(data);
        if (result.rowCount === 1) {
          return res
            .status(200)
            .json({ code: 200, message: "Success input data" });
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
        let result = await updateWorkExperienceModel(data);
        if (result.rowCount === 1) {
          return res
            .status(200)
            .json({ code: 200, message: "Success input data" });
        }
      }

      // let result = await updateWorkExperienceModel(data);
      // if (result.rowCount === 1) {
      //   return res
      //     .status(200)
      //     .json({ code: 200, message: "Success update data" });
      // }

      return res.status(401).json({ code: 404, message: "Failed update data" });
    } catch (err) {
      console.log("putWorkExperience error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed putWorkExperience" });
    }
  },

  deleteWorkExperience: async (req, res, next) => {
    try {
      // Check params
      let { id } = req.params;
      if (id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      let workExperience = await getWorkExperienceByIdModel(id);

      // Check WorkExperience
      let resultWorkExperience = workExperience.rows;
      if (!resultWorkExperience.length) {
        return res.status(404).json({
          code: 404,
          message: "WorkExperience not found or id invalid",
        });
      }

      let newWorkExperience = resultWorkExperience[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newWorkExperience.user_id) {
      //   console.log(`id_token = ${req.payload.id}`);
      //   console.log(`id_user = ${newWorkExperience.user_id}`);
      //   return res
      //     .status(404)
      //     .json({ code: 404, message: "This is not your WorkExperience" });
      // }

      // Process
      let result = await deleteWorkExperienceModel(id);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success delete data" });
      }
      return res.status(404).json({ code: 404, message: "Failed delete data" });
    } catch (err) {
      console.log("dropWorkExperience error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed dropWorkExperience" });
    }
  },
};

module.exports = workExperienceController;
