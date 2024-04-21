const Pool = require("../config/db");

const showContactModel = async () => {
  console.log("model - showContact");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          *
      FROM contact
      ORDER BY created_at DESC
      `,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log("error db -", err);
          reject(err);
        }
      }
    )
  );
};

const showContactByIdModel = async (id_user) => {
  console.log("model - showContactById");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          *
      FROM
          contact
      WHERE
          contact.id_user = '${id_user}'
      `,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log("error db -", err);
          reject(err);
        }
      }
    )
  );
};

const getContactByIdModel = async (id_user) => {
  console.log("model - getContactById");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM contact WHERE id_user = '${id_user}'`, (err, res) => {
      if (!err) {
        return resolve(res);
      } else {
        console.log("error db -", err);
        reject(err);
      }
    })
  );
};

const searchContactDetailModel = async (data) => {
  let { searchBy, search, sortBy, sort, limit, page } = data;
  console.log("model - searchContactDetail");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT 
          *
      FROM
          contact
      WHERE
          ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}
      `,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log("error db -", err);
          reject(err);
        }
      }
    )
  );
};

const searchContactCountModel = async (data) => {
  let { searchBy, search } = data;
  console.log("model - searchContactCount");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM contact WHERE ${searchBy} ILIKE '%${search}%'`,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log("error db -", err);
          reject(err);
        }
      }
    )
  );
};

const inputContactModel = async (data) => {
  console.log("model - inputContact");
  let { id, email, instagram, github, gitlab, id_user } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      INSERT INTO 
          contact (id, email, instagram, github, gitlab, created_at, id_user) 
      VALUES 
          ('${id}', 
          '${email}', 
          '${instagram}', 
          '${github}', 
          '${gitlab}', 
          NOW(),
          '${id_user}');
      `,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log("error db -", err);
          reject(err);
        }
      }
    )
  );
};

const updateContactModel = async (data) => {
  console.log("model - updateContact");
  let { id, email, instagram, github, gitlab } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      UPDATE 
          contact 
      SET 
          email='${email}',
          instagram='${instagram}',
          github='${github}',
          gitlab='${gitlab}',
          updated_at=NOW() 
      WHERE 
          id='${id}';
      `,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log("error db -", err);
          reject(err);
        }
      }
    )
  );
};

const deleteContactModel = async (id) => {
  console.log("model - deleteContact");
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM contact WHERE id='${id}';`, (err, res) => {
      if (!err) {
        return resolve(res);
      } else {
        console.log("error db -", err);
        reject(err);
      }
    })
  );
};

module.exports = {
  showContactModel,
  showContactByIdModel,
  getContactByIdModel,
  searchContactDetailModel,
  searchContactCountModel,
  inputContactModel,
  updateContactModel,
  deleteContactModel,
};
