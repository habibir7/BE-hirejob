/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const {
  showContactModel,
  showContactByIdModel,
  getContactByIdModel,
  searchContactDetailModel,
  searchContactCountModel,
  inputContactModel,
  updateContactModel,
  deleteContactModel,
} = require("../model/contact");

const contactController = {
  showContact: async (req, res, next) => {
    try {
      // Process
      let contact = await showContactModel();
      let result = contact.rows;
      return res.status(200).json({
        code: 200,
        message: "Success showContact",
        data: result,
      });
    } catch (err) {
      console.log("showContact error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showContact" });
    }
  },

  showContactById: async (req, res, next) => {
    try {
      // Check params
      let { id_user } = req.params;
      if (id_user === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      // Process
      let contact = await getContactByIdModel(id_user);
      let result = contact.rows;
      if (!result.length) {
        return res.status(200).json({
          code: 200,
          message: "success getContactByID",
          data: result
        });
      }
      return res.status(200).json({
        code: 200,
        message: "Success showContactById",
        data: result[0],
      });
    } catch (err) {
      console.log("showContactById error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed showContactByIdcipe" });
    }
  },

  searchContact: async (req, res, next) => {
    try {
      // Check searchBy
      let searchBy = "email";
      if (req.query.searchBy) {
        if (
          req.query.searchBy === "email"
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
      let contact = await searchContactDetailModel(
        data
      );
      let count = await searchContactCountModel(data);
      let total = count.rowCount;
      let result = contact.rows;

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
        message: "Success searchContactDetail",
        data: result,
        pagination,
      });
    } catch (err) {
      console.log("searchContact error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed searchContactDetail" });
    }
  },

  inputContact: async (req, res, next) => {
    try {
      let { email, instagram, github, gitlab } = req.body;

      // Check token
      // if(!req.payload){
      //     return res.status(404).json({code: 404, message: "Server need token, please login"})
      // }

      // Check body
      if (
        !email ||
        email === "" ||
        email === " " ||
        !instagram ||
        instagram === "" ||
        instagram === " " ||
        !github ||
        github === "" ||
        github === " " ||
        !gitlab ||
        gitlab === "" ||
        gitlab === " "
      ) {
        return res.status(404).json({ code: 404, message: "Input invalid" });
      }

      // Process
      let id_user = req.payload.id_user
      let data = { id: uuidv4(), email, instagram, github, gitlab,id_user };
      let result = await inputContactModel(data);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "Success input data" });
      }
      return res.status(401).json({ code: 401, message: "Failed input data" });
    } catch (err) {
      console.log("inputContact error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed inputContact" });
    }
  },

  updateContact: async (req, res, next) => {
    try {
      let { email, instagram, github, gitlab } = req.body;

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

      // Check Contact
      let contact = await getContactByIdModel(id);
      let resultContact = contact.rows;
      if (!resultContact.length) {
        return res.status(404).json({
          code: 404,
          message: "Contact not found or id invalid",
        });
      }

      let newContact = resultContact[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newContact.user_id) {
      //     console.log(`id_token = ${req.payload.id}`)
      //     console.log(`id_user = ${newContact.user_id}`)
      //     return res.status(404).json({code: 404, message: 'This is not your Contact'})
      // }

      // Process
      let data = {
        id,
        email: email || newContact.email,
        instagram: instagram || newContact.instagram,
        github: github || newContact.github,
        gitlab: gitlab || newContact.gitlab,
      };

      let result = await updateContactModel(data);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success update data" });
      }

      return res.status(401).json({ code: 404, message: "Failed update data" });
    } catch (err) {
      console.log("putContact error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed putContact" });
    }
  },

  deleteContact: async (req, res, next) => {
    try {
      // Check params
      let { id } = req.params;
      if (id === "") {
        return res
          .status(404)
          .json({ code: 404, message: "Params id invalid" });
      }

      let contact = await getContactByIdModel(id);

      // Check Contact
      let resultContact = contact.rows;
      if (!resultContact.length) {
        return res.status(404).json({
          code: 404,
          message: "Contact not found or id invalid",
        });
      }

      let newContact = resultContact[0];

      // Check if user_id and id token same or not
      // if (req.payload.id !== newContact.user_id) {
      //   console.log(`id_token = ${req.payload.id}`);
      //   console.log(`id_user = ${newContact.user_id}`);
      //   return res
      //     .status(404)
      //     .json({ code: 404, message: "This is not your Contact" });
      // }

      // Process
      let result = await deleteContactModel(id);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success delete data" });
      }
      return res.status(404).json({ code: 404, message: "Failed delete data" });
    } catch (err) {
      console.log("dropContact error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Failed dropContact" });
    }
  },
};

module.exports = contactController;
