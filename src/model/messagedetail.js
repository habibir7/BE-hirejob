const Koneksi = require("../config/db");

const getMessagedetailByIdWorkerModel = async (id_user) => {
  console.log(id_user);
  return new Promise((resolve, reject) =>
    Koneksi.query(
      `SELECT messagedetail.*, detail_profile_recruiter.company_name, detail_profile_recruiter.photo  FROM messagedetail JOIN detail_profile_recruiter ON messagedetail.id_recruiter = detail_profile_recruiter.id_user  WHERE messagedetail.id_worker='${id_user}'`,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getMessagedetailByIdRecruiterModel = async (id_user) => {
  console.log(id_user);
  return new Promise((resolve, reject) =>
    Koneksi.query(
      `SELECT messagedetail.*, user_auth.name, detail_profile_worker.photo FROM messagedetail JOIN detail_profile_worker ON messagedetail.id_worker = detail_profile_worker.user_id JOIN user_auth ON messagedetail.id_worker = user_auth.id_user WHERE messagedetail.id_recruiter='${id_user}'`,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getMessagedetailModel = async () => {
  return new Promise((resolve, reject) => {
    Koneksi.query("SELECT * FROM messagedetail", (err, res) => {
      if (!err) {
        return resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

const createMessagedetailModel = async (data) => {
  let { id_messagedetail, position, recruiter, id_user } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Koneksi.query(
      `INSERT INTO messagedetail (id_messagedetail, position, id_recruiter, id_worker) VALUES ('${id_messagedetail}', '${position}', '${recruiter}', '${id_user}')`,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          reject(err);
        }
      }
    )
  );
};

const updateMessagedetailModel = async (data) => {
  let { id_messagedetail, messagedetail_name } = data;
  return new Promise((resolve, reject) =>
    Koneksi.query(
      `UPDATE messagedetail SET messagedetail_name='${messagedetail_name}' WHERE id_messagedetail='${id_messagedetail}'`,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log(`error db -`, err);
          reject(err);
        }
      }
    )
  );
};

const deleteMessagedetailModel = async (id_messagedetail) => {
  return new Promise((resolve, reject) =>
    Koneksi.query(
      `DELETE FROM messagedetail where id_messagedetail ='${id_messagedetail}'`,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log(`error db - `, err);
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  createMessagedetailModel,
  getMessagedetailModel,
  getMessagedetailByIdWorkerModel,
  getMessagedetailByIdRecruiterModel,
  updateMessagedetailModel,
  deleteMessagedetailModel,
};
