const { v4: uuidv4 } = require("uuid");
const { getRecuiterModel,getRecuiterByIdModel,updateRecruiterModel } = require("../model/recruiter")


const recuiterController = {
    getRecruiter: async (req,res,next) =>{
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
    updateRecruiter: async (req,res,next) => {
        try{
        let {id_user} = req.params
        if (id_user === "") {
            return res.status(404).json({ message: "params id invalid" });
        }
        let { company_name, company_field, company_info, email, company_email, company_phone, id_city, id_province } = req.body;
        let recruiter = await getRecuiterByIdModel(id_user);
        let resultRecruiter = recruiter.rows;
        if (!resultRecruiter.length) {
            return res
                .status(404)
                .json({ message: "recruiter not found or id invalid" });
        }
        let Recruiter = resultRecruiter[0];
        let data = {
            id_user,
            company_name: company_name || Recruiter.company_name,
            company_field: company_field || Recruiter.company_field,
            company_info: company_info || Recruiter.company_info,
            email: email || Recruiter.email,
            company_email: company_email || Recruiter.company_email,
            company_phone: company_phone || Recruiter.company_phone,
            id_city: id_city || Recruiter.id_city,
            id_province: id_province || Recruiter.id_province
        };
        let result = await updateRecruiterModel(data)
        if (result.rowCount === 1) {
            return res
                .status(201)
                .json({ code: 201, message: "success update data" });
        }

        return res.status(404).json({code:404, message: "Error Update Data"})
        }catch(err){
            console.log("users controller error");
            console.log(err);
            return res.status(404).json({ message: "gagal getUsers controller" });
        }
    }
}

module.exports = recuiterController