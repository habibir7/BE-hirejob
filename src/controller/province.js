const { v4: uuidv4 } = require("uuid");
const {
  getProvinceByIdModel,
  createProvinceModel,
  getProvinceModel,
  updateProvinceModel,
  deleteProvinceModel,
} = require("../model/province");

const ProvinceController = {
  getProvinceById: async (req, res, next) => {
    try {
      let { id_province } = req.params;
      if (id_province === "") {
        return res.status(404).json({ message: "params id invalid" });
      }
      let province = await getProvinceByIdModel(id_province);
      let result = province.rows;
      if (!result.length) {
        return res
          .status(404)
          .json({ message: "province not found or id invalid" });
      }
      console.log(result);
      return res
        .status(200)
        .json({ message: "success getProvinceById", data: result[0] });
    } catch (err) {
      return res
        .status(404)
        .json({ message: "failed getProvinceById Controller" });
    }
  },

  createProvince: async (req, res, next) => {
    try {
      let { province_name } = req.body;
      // if(req.payload.otoritas !== "Admin"){
      //     return res.json({code: 404,message: "Hanya Admin yang bisa menambah data"})
      // }
      if (!province_name || province_name === "") {
        return res.json({
          code: 404,
          message: "Harap masukkan Province Dengan lengkap",
        });
      }
      let data = { id_province: uuidv4(), province_name };
      let result = await createProvinceModel(data);
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
        .json({ code: 404, message: "CreateProvince Controller Error" });
    }
  },

  getProvince: async (req, res, next) => {
    try {
      let resep = await getProvinceModel();
      let result = resep.rows;
      return res
        .status(200)
        .json({ message: "sukses getProvince ", data: result });
    } catch (err) {
      return res.status(404).json({ message: "gagal getProvince controller" });
    }
  },

  updateProvince: async (req, res, next) => {
    try {
      let { id_province } = req.params;
      // if(req.payload.otoritas !== "Admin"){
      //     return res.json({code: 404,message: "Hanya Admin yang bisa menambah data"})
      // }
      if (id_province === "") {
        return res.status(404).json({ message: "params id invalid" });
      }
      let { province_name } = req.body;
      let province = await getProvinceByIdModel(id_province);
      let resultProvince = province.rows;
      if (!resultProvince.length) {
        return res
          .status(404)
          .json({ message: "province not found or id invalid" });
      }
      let Province = resultProvince[0];
      let data = {
        id_province,
        province_name: province_name || Province.province_name,
      };
      console.log(data);
      let result = await updateProvinceModel(data);
      if (result.rowCount === 1) {
        return res
          .status(201)
          .json({ code: 201, message: "success update data" });
      }
      return res.status(401).json({ code: 401, message: "failed update data" });
    } catch (err) {
      return res
        .status(404)
        .json({ message: "failed InputProvince Controller" });
    }
  },

  deleteProvince: async (req, res, next) => {
    try {
      let { id_province } = req.params;
      if (req.payload.otoritas !== "Admin") {
        return res.json({
          code: 404,
          message: "Hanya Admin yang bisa menambah data",
        });
      }
      if (id_province === "") {
        return res.status(404).json({ message: "params id invalid" });
      }
      let province = await getProvinceByIdModel(id_province);
      let resultProvince = province.rows;
      if (!resultProvince.length) {
        return res
          .status(404)
          .json({ message: "province not found or id invalid" });
      }
      let result = await deleteProvinceModel(id_province);
      if (!result.length) {
        return res
          .status(201)
          .json({ code: 201, message: "success Delete data" });
      }
      return res.status(200).json({ code: 401, message: "failed Delete data" });
    } catch (err) {
      return res
        .status(404)
        .json({ code: 404, message: "Delete province Controller Error" });
    }
  },
};

module.exports = ProvinceController;
