const Pool = require("../config/db");

const showPortofolioModel = async () => {
  console.log("model - showPortofolio");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          *
      FROM portofolio
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

const showPortofolioByIdModel = async (id_user) => {
  console.log("model - showPortofolioById");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          *
      FROM
          portofolio
      WHERE
          portofolio.id_user = '${id_user}'
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

const getPortofolioByIdModel = async (id) => {
  console.log("model - getPortofolioById");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM portofolio WHERE id = '${id}'`, (err, res) => {
      if (!err) {
        return resolve(res);
      } else {
        console.log("error db -", err);
        reject(err);
      }
    })
  );
};

const searchPortofolioDetailModel = async (data) => {
  let { searchBy, search, sortBy, sort, limit, page } = data;
  console.log("model - searchPortofolioDetail");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT 
          *
      FROM
          portofolio
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

const searchPortofolioCountModel = async (data) => {
  let { searchBy, search } = data;
  console.log("model - searchPortofolioCount");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM portofolio WHERE ${searchBy} ILIKE '%${search}%'`,
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

const inputPortofolioModel = async (data) => {
  console.log("model - inputPortofolio");
  let { id, link_repo, type, photo, id_user } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      INSERT INTO 
          portofolio (id, link_repo, type, photo, created_at, id_user) 
      VALUES
          ('${id}', 
          '${link_repo}', 
          '${type}', 
          '${photo}', 
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

const updatePortofolioModel = async (data) => {
  console.log("model - updatePortofolio");
  let { id, link_repo, type, photo} = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      UPDATE 
          portofolio 
      SET 
          link_repo='${link_repo}',
          type='${type}',
          photo='${photo}',
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

const deletePortofolioModel = async (id) => {
  console.log("model - deletePortofolio");
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM portofolio WHERE id='${id}';`, (err, res) => {
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
  showPortofolioModel,
  showPortofolioByIdModel,
  getPortofolioByIdModel,
  searchPortofolioDetailModel,
  searchPortofolioCountModel,
  inputPortofolioModel,
  updatePortofolioModel,
  deletePortofolioModel,
};
