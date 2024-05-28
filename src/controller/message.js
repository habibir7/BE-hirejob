const { v4: uuidv4 } = require("uuid");
const {
  getMessageByIdMessageDetailModel,
  createMessageModel,
  getMessageModel,
  updateMessageModel,
  deleteMessageModel,
} = require("../model/message");
const { getMessagedetailByIdModel } = require("../model/messagedetail");

const MessageController = {
  getMessageById: async (req, res, next) => {
    try {
      let { id_messagedetail } = req.params;
      if (id_messagedetail === "") {
        return res.status(404).json({ message: "params id invalid" });
      }
      let message = await getMessageByIdMessageDetailModel(id_messagedetail);
      let result = message.rows;
      console.log(result);
      return res
        .status(200)
        .json({ message: "success getMessageByIdMessageDetail", data: result });
    } catch (err) {
      return res
        .status(404)
        .json({ message: "failed getMessageById Controller" });
    }
  },

  createMessage: async (req, res, next) => {
    try {
      let { id_messagedetail, message_value } = req.body;
      // if(req.payload.otoritas !== "Admin"){
      //     return res.json({code: 404,message: "Hanya Admin yang bisa menambah data"})
      // }
      if (
        !id_messagedetail ||
        id_messagedetail === "" ||
        !message_value ||
        message_value === ""
      ) {
        return res.json({
          code: 404,
          message: "Harap masukkan Message Dengan lengkap",
        });
      }
      let cek = await getMessageByIdMessageDetailModel(id_messagedetail);
      let id = req.payload.id_user;
      let data = { id_message: uuidv4(), id_messagedetail, message_value, id };
      let result = await createMessageModel(data);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "Data berhasil Di input" });
      }
      return res
        .status(401)
        .json({ code: 401, message: "Maaf data tidak berhasil Di input" });
    } catch (err) {
      return res
        .status(404)
        .json({ code: 404, message: "CreateMessage Controller Error" });
    }
  },

  getMessage: async (req, res, next) => {
    try {
      let resep = await getMessageModel();
      let result = resep.rows;
      return res
        .status(200)
        .json({ message: "sukses getMessage ", data: result });
    } catch (err) {
      return res.status(404).json({ message: "gagal getMessage controller" });
    }
    // },
    //     updateMessage: async (req, res, next) => {
    //     try {
    //         let { id_message } = req.params;
    //         // if(req.payload.otoritas !== "Admin"){
    //         //     return res.json({code: 404,message: "Hanya Admin yang bisa menambah data"})
    //         // }
    //         if (id_message === "") {
    //             return res.status(404).json({ message: "params id invalid" });
    //         }
    //         let { message_name } = req.body;
    //         let message = await getMessageByIdModel(id_message);
    //         let resultMessage = message.rows;
    //         if (!resultMessage.length) {
    //             return res
    //                 .status(404)
    //                 .json({ message: "message not found or id invalid" });
    //         }
    //         let Message = resultMessage[0];
    //         let data = {
    //             id_message,
    //             message_name: message_name || Message.message_name,
    //         };
    //         console.log(data)
    //         let result = await updateMessageModel(data);
    //         if (result.rowCount === 1) {
    //             return res
    //                 .status(201)
    //                 .json({ code: 201, message: "success update data" });
    //         }
    //         return res.status(401).json({code:401,message:"failed update data"})
    //     } catch (err) {
    //         return res
    //             .status(404)
    //             .json({ message: "failed InputMessage Controller" });
    //     }
    // },
    //     deleteMessage: async (req,res,next) => {
    //     try{
    //         let { id_message } = req.params;
    //         if(req.payload.otoritas !== "Admin"){
    //             return res.json({code: 404,message: "Hanya Admin yang bisa menambah data"})
    //         }
    //         if (id_message === "") {
    //             return res.status(404).json({ message: "params id invalid" });
    //         }
    //         let message = await getMessageByIdModel(id_message);
    //         let resultMessage = message.rows;
    //         if (!resultMessage.length) {
    //             return res
    //                 .status(404)
    //                 .json({ message: "message not found or id invalid" });
    //         }
    //         let result = await deleteMessageModel(id_message)
    //         if (!result.length) {
    //             return res
    //                 .status(201)
    //                 .json({ code: 201, message: "success Delete data" });
    //         }
    //         return res.status(200).json({code:401,message:"failed Delete data"})

    //     }catch(err){
    //         return res
    //         .status(404)
    //         .json({ code: 404, message: "Delete message Controller Error"})
    //     }
  },
};

module.exports = MessageController;
