const Pool = require("../config/db");

// const getRecuiterModel = async () => {
//   return new Promise((resolve, reject) => {
//     Pool.query(
//       "SELECT user_auth.name, user_auth.position, user_auth.email, detail_profile_recruiter.* FROM detail_profile_recruiter JOIN user_auth ON detail_profile_recruiter.id_user = user_auth.id_user",
//       (err, res) => {
//         if (!err) {
//           return resolve(res);
//         } else {
//           reject(err);
//         }
//       }
//     );
//   });
// };

const getRecuiterModel = async () => {
  return new Promise((resolve, reject) => {
    Pool.query(
      "SELECT * FROM detail_profile_recruiter",
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

// const getRecuiterByIdModel = async (id_user) => {
//   return new Promise((resolve, reject) => {
//     Pool.query(
//       `SELECT 
//           user_auth.name,
//           user_auth.position,
//           user_auth.email,
//           detail_profile_recruiter.*
//       FROM
//           detail_profile_recruiter
//       JOIN
//           user_auth ON detail_profile_recruiter.id_user = user_auth.id_user
//       WHERE
//           detail_profile_recruiter.id_user='${id_user}'`,
//       (err, res) => {
//         if (!err) {
//           return resolve(res);
//         } else {
//           reject(err);
//         }
//       }
//     );
//   });
// };

const getRecuiterByIdModel = async (id_recruiter) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM detail_profile_recruiter WHERE id_recruiter='${id_recruiter}'`,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const createRecruiterModel = async (data) => {
  let { id_recruiter, company_name, id_user } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO detail_profile_recruiter (id_recruiter, company_name, id_user, created_at, updated_at) VALUES ('${id_recruiter}', '${company_name}', '${id_user}', NOW(), NULL)`,
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

// const updateRecruiterModel = async (data) => {
//   let {
//     company_name,
//     company_field,
//     company_info,
//     company_email,
//     company_phone,
//     id_city,
//     id_province,
//     id_user,
//   } = data;
//   return new Promise((resolve, reject) =>
//     Pool.query(
//       `UPDATE detail_profile_recruiter SET updated_at=NOW(), company_name='${company_name}', company_field='${company_field}', company_info='${company_info}', company_email='${company_email}', company_phone='${company_phone}', id_city='${id_city}', id_province='${id_province}' WHERE id_user='${id_user}'`,
//       (err, res) => {
//         if (!err) {
//           return resolve(res);
//         } else {
//           console.log(`error db -`, err);
//           reject(err);
//         }
//       }
//     )
//   );
// };

const updateRecruiterModel = async (data) => {
  let {
    company_name,
    company_field,
    company_info,
    company_email,
    company_phone,
    id_recruiter,
    province_id,
    city_id,
    photo
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE 
          detail_profile_recruiter
      SET
          updated_at=NOW(),
          company_name='${company_name}', 
          company_field='${company_field}', 
          company_info='${company_info}', 
          company_email='${company_email}', 
          company_phone='${company_phone}', 
          city_id='${city_id}', 
          province_id='${province_id}', 
          photo='${photo}' 
      WHERE
          id_recruiter='${id_recruiter}'`,
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

module.exports = {
  getRecuiterModel,
  createRecruiterModel,
  updateRecruiterModel,
  getRecuiterByIdModel,
};
