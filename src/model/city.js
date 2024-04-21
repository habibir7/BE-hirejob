const Koneksi = require("../config/db");

const getCityByIdModel = async (id_city) => {
  console.log(id_city);
  return new Promise((resolve, reject) =>
    Koneksi.query(
      `SELECT 
          city.id_city,
          city.city_name,
          province.province_name
      FROM
          city
      JOIN province ON city.province_id = province.id_province
      WHERE id_city='${id_city}'`,
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

const getCityModel = async () => {
  return new Promise((resolve, reject) => {
    Koneksi.query("SELECT * FROM city", (err, res) => {
      if (!err) {
        return resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

const searchCityModel = async (data) => {
  let { searchBy, search, sortBy, sort, limit, page } = data;
  console.log("model - searchCityDetail");
  return new Promise((resolve, reject) =>
  Koneksi.query(
      `
		SELECT 
			city.id_city,
			city.city_name,
			city.province_id
		FROM
			city
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

const searchCityCountModel = async (data) => {
  let { searchBy, search } = data;
  console.log("model - searchCityCount");
  return new Promise((resolve, reject) =>
  Koneksi.query(
      `SELECT * FROM city WHERE ${searchBy} ILIKE '%${search}%'`,
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

const createCityModel = async (data) => {
  let { city_name, province_id } = data;
  return new Promise((resolve, reject) =>
    Koneksi.query(
      `INSERT INTO city (city_name, province_id) VALUES ('${city_name}', '${province_id}')`,
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

const updateCityModel = async (data) => {
  let { id_city, city_name } = data;
  return new Promise((resolve, reject) =>
    Koneksi.query(
      `UPDATE city SET city_name='${city_name}' WHERE id_city='${id_city}'`,
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

const deleteCityModel = async (id_city) => {
  return new Promise((resolve, reject) =>
    Koneksi.query(
      `DELETE FROM city where id_city ='${id_city}'`,
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
  createCityModel,
  getCityModel,
  getCityByIdModel,
  updateCityModel,
  deleteCityModel,
  searchCityModel,
  searchCityCountModel
};
