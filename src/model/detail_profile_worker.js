const Pool = require("../config/db");

const showDetailProfileWorkerModel = async () => {
  console.log("model - showDetailProfileWorker");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          *
      FROM
          detail_profile_worker
      ORDER BY
          created_at DESC
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

const showDetailProfileWorkerByIdModel = async (id) => {
  console.log("model - showDetailProfileWorkerById");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          detail_profile_worker.id,
          detail_profile_worker.last_work,
          detail_profile_worker.bio,
          detail_profile_worker.created_at,
          detail_profile_worker.updated_at
      FROM
          detail_profile_worker
      WHERE
          detail_profile_worker.id = '${id}'
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

const getDetailProfileWorkerByIdModel = async (id) => {
  console.log("model - getDetailProfileWorkerById");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM detail_profile_worker WHERE id = '${id}'`,
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

const searchDetailProfileWorkerDetailModel = async (data) => {
  let { searchBy, search, sortBy, sort, limit, page } = data;
  console.log("model - searchDetailProfileWorkerDetail");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT 
          detail_profile_worker.id,
          detail_profile_worker.province,
          detail_profile_worker.city,
          detail_profile_worker.last_work,
          detail_profile_worker.bio,
          detail_profile_worker.created_at,
          detail_profile_worker.updated_at
      FROM
          detail_profile_worker
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

const searchDetailProfileWorkerCountModel = async (data) => {
  let { searchBy, search } = data;
  console.log("model - searchDetailProfileWorkerCount");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM detail_profile_worker WHERE ${searchBy} ILIKE '%${search}%'`,
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

const inputDetailProfileWorkerModel = async (data) => {
  console.log("model - inputDetailProfileWorker");
  let { id, id_user } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      INSERT INTO 
          detail_profile_worker (id, user_id, created_at) 
      VALUES
          ('${id}','${id_user}', NOW());
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

const updateDetailProfileWorkerModel = async (data) => {
  console.log("model - updateDetailProfileWorker");
  let { id, province_id, city_id, last_work, bio, photo } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      UPDATE 
          detail_profile_worker 
      SET 
          province_id='${province_id}', 
          city_id='${city_id}', 
          last_work='${last_work}', 
          bio='${bio}',
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

const deleteDetailProfileWorkerModel = async (id) => {
  console.log("model - deleteDetailProfileWorker");
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM detail_profile_worker WHERE id='${id}';`,
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

module.exports = {
  showDetailProfileWorkerModel,
  showDetailProfileWorkerByIdModel,
  getDetailProfileWorkerByIdModel,
  searchDetailProfileWorkerDetailModel,
  searchDetailProfileWorkerCountModel,
  inputDetailProfileWorkerModel,
  updateDetailProfileWorkerModel,
  deleteDetailProfileWorkerModel,
};
