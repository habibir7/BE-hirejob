-- Active: 1712328349345@@147.139.210.135@5432@b1801@public
CREATE TABLE user_auth(  
    id_user VARCHAR(50) NOT NULL PRIMARY KEY,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(40) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    position VARCHAR(30) DEFAULT NULL,
    role VARCHAR(10) NOT NULL,
    otp VARCHAR(10) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL
);

SELECT * FROM user_auth

ALTER TABLE user_auth ADD COLUMN verifyotp VARCHAR(50) DEFAULT NULL

ALTER TABLE user_auth ADD COLUMN isverify BOOLEAN DEFAULT FALSE


CREATE TABLE detail_profile_recruiter(
    id_recruiter VARCHAR(50) NOT NULL PRIMARY KEY,
    company_name VARCHAR(50) NOT NULL,
    company_email VARCHAR(40),
    company_phone VARCHAR(15),
    company_field VARCHAR(40),
    company_info VARCHAR(50),
    id_city VARCHAR(50),
    id_province VARCHAR(50),
    id_user VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

SELECT
       user_auth.nama, user_auth.email, user_auth.phone, user_auth.position , detail_profile_recruiter.* 
      FROM
       detail_profile_recruiter JOIN user_auth ON detail_profile_worker.id_user = user_auth.id_user 
      WHERE
       detail_profile_recruiter.id_user='165aa6d0-66b6-4988-bc1f-10c814e82864'

SELECT * FROM detail_profile_recruiter

DROP TABLE detail_profile_recruiter

ALTER TABLE detail_profile_recruiter ADD CONSTRAINT fk_recruiter_users FOREIGN KEY (id_user) REFERENCES user_auth (id_user) ON DELETE CASCADE


SELECT detail_profile_recruiter.*, user_auth.email FROM detail_profile_recruiter JOIN user_auth ON detail_profile_recruiter.id_user = user_auth.id_user

CREATE TABLE city(
    id_city VARCHAR(50) NOT NULL,
    city_name VARCHAR(30) NOT NULL
)

SELECT * FROM city 

CREATE TABLE province(
    id_province VARCHAR(50) NOT NULL,
    province_name VARCHAR(30) NOT NULL
)

ALTER TABLE city 
ADD PRIMARY KEY (id_city);

SELECT user_auth.name, user_auth.position, user_auth.email, detail_profile_recruiter.* FROM detail_profile_recruiter JOIN user_auth ON detail_profile_recruiter.id_user = user_auth.id_user where id_user='b24f9b0e-54a2-462f-add9-1e7f40d2089f'


CREATE TABLE messagedetail(
    id_messagedetail VARCHAR(50) PRIMARY KEY NOT NULL,
    position VARCHAR(40) NOT NULL,
    id_recruiter VARCHAR(50) NOT NULL,
    id_worker VARCHAR(50) NOT NULL
)

SELECT * FROM messagedetail

CREATE TABLE message(
    id_message VARCHAR(50) NOT NULL,
    id_messagedetail VARCHAR(50) NOT NULL,
    id_user VARCHAR(50) NOT NULL,
    message_value TEXT NOT NULL,
    created_at TIMESTAMP
)

INSERT INTO messagedetail (id_messagedetail, position, id_recruiter, id_worker) VALUES ('2123123', 'TEST', '123123', '3123')

