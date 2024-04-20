const Pool = require("../config/db");

const showWorkExperienceModel = async () => {
  console.log("model - showWorkExperience");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          work_experience.id,
          work_experience.position,
          work_experience.company_name,
          work_experience.working_start_at,
          work_experience.working_end_at,
          work_experience.description,
          work_experience.created_at,
          work_experience.updated_at
      FROM 
          work_experience
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

const showWorkExperienceByIdModel = async (id) => {
  console.log("model - showWorkExperienceById");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT
          work_experience.id,
          work_experience.position,
          work_experience.company_name,
          work_experience.working_start_at,
          work_experience.working_end_at,
          work_experience.description,
          work_experience.created_at,
          work_experience.updated_at
      FROM 
          work_experience
      WHERE
        work_experience.id = '${id}'
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

const getWorkExperienceByIdModel = async (id) => {
  console.log("model - getWorkExperienceById");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM work_experience WHERE id = '${id}'`, (err, res) => {
      if (!err) {
        return resolve(res);
      } else {
        console.log("error db -", err);
        reject(err);
      }
    })
  );
};

const searchWorkExperienceDetailModel = async (data) => {
  let { searchBy, search, sortBy, sort, limit, page } = data;
  console.log("model - searchWorkExperienceDetail");
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT 
          work_experience.id,
          work_experience.position,
          work_experience.company_name,
          work_experience.working_start_at,
          work_experience.working_end_at,
          work_experience.description,
          work_experience.created_at,
          work_experience.updated_at
      FROM 
          work_experience
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

const searchWorkExperienceCountModel = async (data) => {
  let { searchBy, search } = data;
  console.log("model - searchWorkExperienceCount");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM work_experience WHERE ${searchBy} ILIKE '%${search}%'`,
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

const inputWorkExperienceModel = async (data) => {
  console.log("model - inputWorkExperience");
  let { id, position, company_name, working_start_at, working_end_at, description, id_user } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      INSERT INTO 
          work_experience (id, position, company_name, working_start_at, working_end_at, description, created_at, id_user) 
      VALUES 
          ('${id}',
          '${position}',
          '${company_name}',
          TO_DATE('${working_start_at}', '%d-%m-%Y'),
          TO_DATE('${working_end_at}', '%d-%m-%Y'),
          '${description}',
          NOW()),
          '${id_user}';
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

const updateWorkExperienceModel = async (data) => {
  console.log("model - updateWorkExperience");
  let { id, position, company_name, working_start_at, working_end_at, description} = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      UPDATE 
          work_experience 
      SET 
          position='${position}',
          company_name='${company_name}',
          working_start_at=TO_DATE('${working_start_at}', '%d-%m-%Y'),
          working_end_at=TO_DATE('${working_end_at}', '%d-%m-%Y'),
          description='${description}',
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

const deleteWorkExperienceModel = async (id) => {
  console.log("model - deleteWorkExperience");
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM work_experience WHERE id='${id}';`, (err, res) => {
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
  showWorkExperienceModel,
  showWorkExperienceByIdModel,
  getWorkExperienceByIdModel,
  searchWorkExperienceDetailModel,
  searchWorkExperienceCountModel,
  inputWorkExperienceModel,
  updateWorkExperienceModel,
  deleteWorkExperienceModel,
};
