const Pool = require("../config/db");

const showWorkerModel = async () => {
  console.log("model - showWorker");
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

const showWorkerByIdModel = async (id) => {
  console.log("model - showWorkerById");
  console.log(id);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          *
      FROM
          detail_profile_worker
      JOIN
          user_auth ON detail_profile_worker.user_id = user_auth.id_user
      JOIN
          city ON detail_profile_worker.city_id = city.id_city
      JOIN
          province ON city.province_id = province.id_province
      WHERE
          detail_profile_worker.user_id = '${id}'
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

const showWorkerAllDataByIdModel = async (user_id) => {
  console.log("model - showWorkerById");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          *
      FROM
          detail_profile_worker
      JOIN user_auth ON detail_profile_worker.user_id = user_auth.id_user
      JOIN skills ON detail_profile_worker.user_id = skills.id_user
      JOIN work_experience ON detail_profile_worker.user_id = work_experience.id_user
      JOIN portofolio ON detail_profile_worker.user_id = portofolio.id_user
      JOIN contact ON detail_profile_worker.user_id = contact.id_user
      WHERE
          detail_profile_worker.user_id = '${user_id}'
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

const getWorkerByIdModel = async (id) => {
  console.log("model - getWorkerById");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT
        detail_profile_worker.*,
        user_auth.name,
        user_auth.email,
        user_auth.phone
      FROM
        detail_profile_worker JOIN user_auth 
      ON
        detail_profile_worker.user_id = user_auth.id_user 
      WHERE
      detail_profile_worker.user_id = '${id}'`,
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

const searchWorkerDetailModel = async (data) => {
  let { searchBy, search, sortBy, sort, limit, page } = data;
  console.log("model - searchWorkerDetail");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT 
          detail_profile_worker.user_id,
          detail_profile_worker.photo,
          user_auth.name,
          detail_profile_worker.last_work,
          detail_profile_worker.job_desk,
          province.province_name,
          city.city_name,
          skills.skill_name,
          detail_profile_worker.created_at,
          detail_profile_worker.updated_at
      FROM
          detail_profile_worker
      JOIN
          user_auth ON detail_profile_worker.user_id = user_auth.id_user
      JOIN
          province ON detail_profile_worker.province_id = province.id_province
      JOIN
          city ON detail_profile_worker.city_id = city.id_city
      JOIN
          skills ON detail_profile_worker.user_id = skills.id_user
      WHERE
          ${searchBy} ILIKE '%${search}%' AND user_auth.isverify='true' 
      ORDER BY
          ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}
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

const searchWorkerCountModel = async (data) => {
  let { searchBy, search } = data;
  console.log("model - searchWorkerCount");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
      *
      FROM
      detail_profile_worker
      JOIN
          user_auth ON detail_profile_worker.user_id = user_auth.id_user
      JOIN
          province ON detail_profile_worker.province_id = province.id_province
      JOIN
          city ON detail_profile_worker.city_id = city.id_city
      JOIN
          skills ON detail_profile_worker.user_id = skills.id_user
      WHERE
          ${searchBy} 
      ILIKE
          '%${search}%' AND user_auth.isverify='true'
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

const inputWorkerModel = async (data) => {
  console.log("model - inputWorker");
  let { id, id_user, city_id } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      INSERT INTO 
          detail_profile_worker (id, user_id, city_id, created_at) 
      VALUES
          ('${id}','${id_user}', '${city_id}', NOW());
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

const updateWorkerModel = async (data) => {
  console.log("model - updateWorker");
  let { id, city_id, last_work, bio, photo, job_desk, province, city } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      UPDATE 
          detail_profile_worker 
      SET  
          city_id='${city_id}', 
          last_work='${last_work}', 
          bio='${bio}',
          photo='${photo}',
          job_desk='${job_desk}',
          province='${province}',
          city='${city}',
          updated_at=NOW() 
      WHERE
          user_id='${id}';
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

const deleteWorkerModel = async (id) => {
  console.log("model - deleteWorker");
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
  showWorkerModel,
  showWorkerByIdModel,
  getWorkerByIdModel,
  searchWorkerDetailModel,
  searchWorkerCountModel,
  inputWorkerModel,
  updateWorkerModel,
  deleteWorkerModel,
  showWorkerAllDataByIdModel,
};
