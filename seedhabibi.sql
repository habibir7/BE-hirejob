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

SELECT * FROM detail_profile_recruiter

DROP TABLE detail_profile_recruiter

ALTER TABLE detail_profile_recruiter ADD CONSTRAINT fk_recruiter_users FOREIGN KEY (id_user) REFERENCES user_auth (id_user) ON DELETE CASCADE


SELECT detail_profile_recruiter.*, user_auth.email FROM detail_profile_recruiter JOIN user_auth ON detail_profile_recruiter.id_user = user_auth.id_user

CREATE TABLE city(
    id_city VARCHAR(50) NOT NULL,
    city_name VARCHAR(30) NOT NULL
)

SELECT * FROM city WHERE id_city='5ccd507e-337b-4c31-a4e2-57a3d211f756'

CREATE TABLE province(
    id_province VARCHAR(50) NOT NULL,
    province_name VARCHAR(30) NOT NULL
)

ALTER TABLE city 
ADD PRIMARY KEY (id_city);

SELECT user_auth.name, user_auth.position, user_auth.email, detail_profile_recruiter.* FROM detail_profile_recruiter JOIN user_auth ON detail_profile_recruiter.id_user = user_auth.id_user where id_user='b24f9b0e-54a2-462f-add9-1e7f40d2089f'
