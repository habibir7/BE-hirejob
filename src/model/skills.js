const Pool = require("../config/db");

const showSkillsModel = async () => {
  console.log("model - showSkills");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          *
      FROM skills
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

const showSkillsByIdModel = async (user_id) => {
  console.log("model - showSkillsById");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          *
      FROM
          skills
      WHERE
          id_user = '${user_id}'
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

const getSkillsByIdModel = async (id) => {
  console.log("model - getSkillsById");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM skills WHERE id = '${id}'`, (err, res) => {
      if (!err) {
        return resolve(res);
      } else {
        console.log("error db -", err);
        reject(err);
      }
    })
  );
};

const searchSkillsDetailModel = async (data) => {
  let { searchBy, search, sortBy, sort, limit, page } = data;
  console.log("model - searchSkillsDetail");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT 
          skills.id,
          skills.skill_name,
          skills.created_at,
          skills.updated_at
      FROM
          skills
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

const searchSkillsCountModel = async (data) => {
  let { searchBy, search } = data;
  console.log("model - searchSkillsCount");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM skills WHERE ${searchBy} ILIKE '%${search}%'`,
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

const inputSkillsModel = async (data) => {
  console.log("model - inputSkills");
  let { id, skill_name, id_user } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      INSERT INTO 
          skills (id, skill_name, created_at, id_user) 
      VALUES
          ('${id}', '${skill_name}', NOW(), '${id_user}')
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

const updateSkillsModel = async (data) => {
  console.log("model - updateSkills");
  let { id, skill_name} = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      UPDATE 
          skills 
      SET 
          skill_name='${skill_name}',  
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

const deleteSkillsModel = async (id) => {
  console.log("model - deleteSkills");
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM skills WHERE id='${id}';`, (err, res) => {
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
  showSkillsModel,
  showSkillsByIdModel,
  getSkillsByIdModel,
  searchSkillsDetailModel,
  searchSkillsCountModel,
  inputSkillsModel,
  updateSkillsModel,
  deleteSkillsModel,
};
