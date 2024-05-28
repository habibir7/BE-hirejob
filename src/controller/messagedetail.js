const { v4: uuidv4 } = require("uuid");
const {
  getMessagedetailByIdWorkerModel,
  getMessagedetailByIdRecruiterModel,
  createMessagedetailModel,
  getMessagedetailModel,
  updateMessagedetailModel,
  deleteMessagedetailModel,
} = require("../model/messagedetail");

const MessagedetailController = {
  getMessagedetailById: async (req, res, next) => {
    try {
      let id_user = req.payload.id_user;
      let messagedetail;
      if (req.payload.role === "worker") {
        messagedetail = await getMessagedetailByIdWorkerModel(id_user);
      } else if (req.payload.role === "recruiter") {
        messagedetail = await getMessagedetailByIdRecruiterModel(id_user);
      }
      let result = messagedetail.rows;
      console.log(result);
      return res
        .status(200)
        .json({ message: "success getMessagedetailById", data: result });
    } catch (err) {
      return res
        .status(404)
        .json({ message: "failed getMessagedetailById Controller" });
    }
  },

  createMessagedetail: async (req, res, next) => {
    try {
      let { position, id_user } = req.body;
      if (!position || position === "" || !id_user || id_user === "") {
        return res.json({
          code: 404,
          message: "Harap masukkan Messagedetail Dengan lengkap",
        });
      }
      let recruiter = req.payload.id_user;
      let data = { id_messagedetail: uuidv4(), position, recruiter, id_user };
      let result = await createMessagedetailModel(data);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "Data berhasil Di input", data });
      }
      return res
        .status(404)
        .json({ code: 404, message: "Maaf data tidak berhasil Di input" });
    } catch (err) {
      return res
        .status(404)
        .json({ code: 404, message: "CreateMessagedetail Controller Error" });
    }
  },

  getMessagedetail: async (req, res, next) => {
    try {
      let resep = await getMessagedetailModel();
      let result = resep.rows;
      return res
        .status(200)
        .json({ message: "sukses getMessagedetail ", data: result });
    } catch (err) {
      return res
        .status(404)
        .json({ message: "gagal getMessagedetail controller" });
    }
  },
  //     updateMessagedetail: async (req, res, next) => {
  //     try {
  //         let { id_messagedetail } = req.params;
  //         // if(req.payload.otoritas !== "Admin"){
  //         //     return res.json({code: 404,messagedetail: "Hanya Admin yang bisa menambah data"})
  //         // }
  //         if (id_messagedetail === "") {
  //             return res.status(404).json({ message: "params id invalid" });
  //         }
  //         let { messagedetail_name } = req.body;
  //         let messagedetail = await getMessagedetailByIdModel(id_messagedetail);
  //         let resultMessagedetail = messagedetail.rows;
  //         if (!resultMessagedetail.length) {
  //             return res
  //                 .status(404)
  //                 .json({ message: "messagedetail not found or id invalid" });
  //         }
  //         let Messagedetail = resultMessagedetail[0];
  //         let data = {
  //             id_messagedetail,
  //             messagedetail_name: messagedetail_name || Messagedetail.messagedetail_name,
  //         };
  //         console.log(data)
  //         let result = await updateMessagedetailModel(data);
  //         if (result.rowCount === 1) {
  //             return res
  //                 .status(201)
  //                 .json({ code: 201, message: "success update data" });
  //         }
  //         return res.status(401).json({code:401,message:"failed update data"})
  //     } catch (err) {
  //         return res
  //             .status(404)
  //             .json({ message: "failed InputMessagedetail Controller" });
  //     }
  // },
  //     deleteMessagedetail: async (req,res,next) => {
  //     try{
  //         let { id_messagedetail } = req.params;
  //         if(req.payload.otoritas !== "Admin"){
  //             return res.json({code: 404,message: "Hanya Admin yang bisa menambah data"})
  //         }
  //         if (id_messagedetail === "") {
  //             return res.status(404).json({ message: "params id invalid" });
  //         }
  //         let messagedetail = await getMessagedetailByIdModel(id_messagedetail);
  //         let resultMessagedetail = messagedetail.rows;
  //         if (!resultMessagedetail.length) {
  //             return res
  //                 .status(404)
  //                 .json({ message: "messagedetail not found or id invalid" });
  //         }
  //         let result = await deleteMessagedetailModel(id_messagedetail)
  //         if (!result.length) {
  //             return res
  //                 .status(201)
  //                 .json({ code: 201, messagedetail: "success Delete data" });
  //         }
  //         return res.status(200).json({code:401,message:"failed Delete data"})

  //     }catch(err){
  //         return res
  //         .status(404)
  //         .json({ code: 404, message: "Delete messagedetail Controller Error"})
  //     }
  // }
};

module.exports = MessagedetailController;
