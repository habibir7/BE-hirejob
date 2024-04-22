-- Active: 1713049799905@@147.139.210.135@5432@b1801@public
SET TIME ZONE 'Asia/Jakarta';

ALTER DATABASE b1801 SET timezone TO 'Asia/Jakarta';

SHOW TIME ZONE;

-- TABLE user_auth
CREATE TABLE user_auth (
    id_user VARCHAR(50) NOT NULL PRIMARY KEY, 
    email VARCHAR(40) NOT NULL, 
    password VARCHAR(40) NOT NULL, 
    nama VARCHAR(40) NOT NULL, 
    phone VARCHAR(20) NOT NULL, 
    jabatan VARCHAR(30) DEFAULT NULL
);

SELECT * FROM user_auth

-- ===========================================
-- TABLE detail_profile_worker
-- ===========================================
CREATE TABLE detail_profile_worker (
    id VARCHAR UNIQUE PRIMARY KEY, 
    province VARCHAR NOT NULL, 
    city VARCHAR NOT NULL, 
    last_work VARCHAR DEFAULT NULL, 
    bio TEXT DEFAULT NULL, 
    created_at TIMESTAMP, 
    updated_at TIMESTAMP
)
-- !minus fk province_id, fk city_if, and fk user_id!

SELECT * FROM detail_profile_worker

SELECT
    detail_profile_worker.id,
    detail_profile_worker.province,
    detail_profile_worker.city,
    detail_profile_worker.last_work,
    detail_profile_worker.bio,
    detail_profile_worker.created_at,
    detail_profile_worker.updated_at
FROM detail_profile_worker
ORDER BY created_at DESC

SELECT
    *
FROM
    detail_profile_worker
JOIN user_auth ON detail_profile_worker.user_id = user_auth.id_user
JOIN skills ON detail_profile_worker.user_id = skills.id_user
JOIN work_experience ON detail_profile_worker.user_id = work_experience.id_user
JOIN portofolio ON detail_profile_worker.user_id = portofolio.id_user
WHERE
    detail_profile_worker.user_id = 'a1260e2f-fa0f-4d25-9b4d-96bde97af4c9'

SELECT
    *
FROM
detail_profile_worker
JOIN
    user_auth ON detail_profile_worker.user_id = user_auth.id_user
WHERE
    name
ILIKE '%%' AND user_auth.isverify='true'

SELECT 
    detail_profile_worker.id,
    detail_profile_worker.province,
    detail_profile_worker.city,
    detail_profile_worker.last_work,
    detail_profile_worker.bio,
    detail_profile_worker.created_at,
    detail_profile_worker.updated_at
FROM detail_profile_worker
WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}

INSERT INTO 
    detail_profile_worker (id, province, city, last_work, bio, created_at) 
VALUES ('${id}', '${province}', '${city}', '${last_work}', '${bio}', NOW());

UPDATE 
    detail_profile_worker 
SET 
    province='${province}', 
    city='${city}', 
    last_work='${last_work}', 
    bio='${bio}', 
    updated_at=NOW() 
WHERE id='${id}';

ALTER TABLE detail_profile_worker ADD COLUMN user_id VARCHAR;

ALTER TABLE detail_profile_worker
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_auth (id_user) ON DELETE CASCADE;

ALTER TABLE detail_profile_worker ADD COLUMN province_id VARCHAR;

ALTER TABLE detail_profile_worker
ADD CONSTRAINT fk_province_id FOREIGN KEY (province_id) REFERENCES province (id_province) ON DELETE CASCADE;

ALTER TABLE detail_profile_worker ADD COLUMN city_id VARCHAR;

ALTER TABLE detail_profile_worker
ADD CONSTRAINT fk_city_id FOREIGN KEY (city_id) REFERENCES city (id_city) ON DELETE CASCADE;

ALTER TABLE detail_profile_worker ADD COLUMN job_desk VARCHAR;

-- ===========================================
-- TABLE skills
-- ===========================================
CREATE TABLE skills (
    id VARCHAR UNIQUE PRIMARY KEY, 
    skill_name VARCHAR NOT NULL, 
    created_at TIMESTAMP, 
    updated_at TIMESTAMP
)

SELECT * FROM skills

SELECT
    skills.id,
    skills.skill_name,
    skills.created_at,
    skills.updated_at
FROM skills
ORDER BY created_at DESC

SELECT 
    skills.id,
    skills.skill_name,
    skills.created_at,
    skills.updated_at
FROM skills
WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}

INSERT INTO 
    skills (id, skill_name, created_at) 
VALUES ('${id}', '${skill_name}', NOW());

UPDATE 
    skills 
SET 
    skill_name='${skill_name}', 
    updated_at=NOW() 
WHERE id='${id}';

ALTER TABLE skills ADD COLUMN user_id VARCHAR;

ALTER TABLE skills
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_auth (id_user) ON DELETE CASCADE;

-- ===========================================
-- TABLE work_experience
-- ===========================================
CREATE TABLE work_experience (
    id VARCHAR UNIQUE PRIMARY KEY, 
    position VARCHAR NOT NULL, 
    company_name VARCHAR NOT NULL, 
    working_start_at DATE NOT NULL, 
    working_end_at DATE, 
    description TEXT, 
    created_at TIMESTAMP, 
    updated_at TIMESTAMP
)

INSERT INTO 
    work_experience (id, position, company_name, working_start_at, working_end_at, description, created_at)
VALUES (
    2, 
    'Software Engineer', 
    'ABC Company', 
    TO_DATE('14-04-2023', '%d-%m-%Y'),
    TO_DATE('14-04-2024', '%d-%m-%Y'),
    'Working on software projects',
    NOW()
);

SELECT * FROM work_experience

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

INSERT INTO 
    work_experience (id, position, company_name, working_start_at, working_end_at, description, created_at) 
VALUES 
    ('${id}',
    '${position}',
    '${company_name}',
    TO_DATE('${working_start_at}', '%d-%m-%Y'),
    TO_DATE('${working_end_at}', '%d-%m-%Y'),
    '${description}',
    NOW());

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

ALTER TABLE work_experience ADD COLUMN user_id VARCHAR;

ALTER TABLE work_experience
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_auth (id_user) ON DELETE CASCADE;

-- ===========================================
-- TABLE portofolio
-- ===========================================
CREATE TABLE portofolio (
    id VARCHAR UNIQUE PRIMARY KEY, 
    link_repo VARCHAR NOT NULL, 
    type VARCHAR NOT NULL, 
    photo VARCHAR DEFAULT NULL,  
    created_at TIMESTAMP, 
    updated_at TIMESTAMP
)

INSERT INTO 
    portofolio (id, link_repo, type, photo, created_at)
VALUES (
    2, 
    'http://', 
    'type', 
    'http://',
    NOW()
);

SELECT * FROM portofolio

SELECT
    portofolio.id,
    portofolio.link_repo,
    portofolio.type,
    portofolio.photo,
    portofolio.created_at,
    portofolio.updated_at
FROM 
    portofolio
ORDER BY 
    created_at DESC

SELECT 
    portofolio.id,
    portofolio.link_repo,
    portofolio.type,
    portofolio.photo,
    portofolio.created_at,
    portofolio.updated_at
FROM 
    portofolio
WHERE 
    ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}

INSERT INTO 
    portofolio (id, link_repo, type, photo, created_at) 
VALUES 
    ('${id}',
    '${link_repo}',
    '${type}',
    '${photo}',
    NOW());

UPDATE 
    portofolio 
SET 
    link_repo='${link_repo}',
    type='${type}',
    photo='${photo}',
    updated_at=NOW() 
WHERE
    id='${id}';

ALTER TABLE portofolio ADD COLUMN user_id VARCHAR;

ALTER TABLE portofolio
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_auth (id_user) ON DELETE CASCADE;

ALTER TABLE portofolio ADD COLUMN porto_name VARCHAR;

-- ===========================================
-- TABLE province
-- ===========================================
CREATE TABLE province(
    id_province SERIAL PRIMARY KEY,
    province_name VARCHAR
)

INSERT INTO 
    province (province_name)
VALUES
    ('Aceh'),
    ('Sumatera Utara'),
    ('Sumatera Barat'),
    ('Riau'),
    ('Jambi'),
    ('Sumatera Selatan'),
    ('Bengkulu'),
    ('Lampung'),
    ('Kepulauan Bangka Belitung'),
    ('Kepulauan Riau'),
    ('DKI Jakarta'),
    ('Jawa Barat'),
    ('Jawa Tengah'),
    ('DI Yogyakarta'),
    ('Jawa Timur'),
    ('Banten'),
    ('Bali'),
    ('Nusa Tenggara Barat'),
    ('Nusa Tenggara Timur'),
    ('Kalimantan Barat'),
    ('Kalimantan Tengah'),
    ('Kalimantan Selatan'),
    ('Kalimantan Timur'),
    ('Kalimantan Utara'),
    ('Sulawesi Utara'),
    ('Sulawesi Tengah'),
    ('Sulawesi Selatan'),
    ('Sulawesi Tenggara'),
    ('Gorontalo'),
    ('Sulawesi Barat'),
    ('Maluku'),
    ('Maluku Utara'),
    ('Papua'),
    ('Papua Barat');

-- ===========================================
-- TABLE city
-- ===========================================
CREATE TABLE city(
    id_city SERIAL PRIMARY KEY,
    city_name VARCHAR
)

-- ADD FK province_id
ALTER TABLE city ADD COLUMN province_id INTEGER;

ALTER TABLE city
ADD CONSTRAINT fk_province_id FOREIGN KEY (province_id) REFERENCES province (id_province) ON DELETE CASCADE;

-- GET/SHOW city join with province_name from province
SELECT city.id_city, city.city_name, province.province_name
FROM city
    JOIN province ON city.province_id = province.id_province

-- ADD DATA
INSERT INTO 
    city (city_name, province_id)
VALUES
    ('Kota Sorong', 34),      
    ('Kab. Pegunungan Arfak', 34),
    ('Kab. Manokwari Selatan', 34),
    ('Kab. Maybrat', 34),
    ('Kab. Tambrauw', 34),
    ('Kab. Kaimana', 34),
    ('Kab. Teluk Wondama', 34),
    ('Kab. Teluk Bintuni', 34),
    ('Kab. Raja Ampat', 34),
    ('Kab. Sorong Selatan', 34),
    ('Kab. Fak Fak', 34),
    ('Kab. Manokwari', 34),
    ('Kab. Sorong', 34)

-- RESET SERIAL
SELECT pg_get_serial_sequence('city', 'id_city');

SELECT setval('city_id_city_seq', 116);

SELECT 
    city.id_city,
    city.city_name,
    city.province_id
FROM
    city
WHERE
    city_name ILIKE '%kota%' ORDER BY city_name ASC 

-- ===========================================
-- TABLE contact
-- ===========================================
CREATE TABLE contact (
    id VARCHAR UNIQUE PRIMARY KEY, 
    email VARCHAR,
    instagram VARCHAR,
    github VARCHAR,
    gitlab VARCHAR,
    created_at TIMESTAMP, 
    updated_at TIMESTAMP
)

SELECT * FROM contact

SELECT
    contact.id,
    contact.email,
    contact.instagram,
    contact.github,
    contact.gitlab,
    contact.created_at,
    contact.updated_at
FROM contact
ORDER BY created_at DESC

SELECT 
    contact.id,
    contact.email,
    contact.instagram,
    contact.github,
    contact.gitlab,
    contact.created_at,
    contact.updated_at
FROM contact
WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}

INSERT INTO 
    contact (id, email, instagram, github, gitlab, created_at) 
VALUES 
    ('${id}', 
    '${email}', 
    '${instagram}', 
    '${github}', 
    '${gitlab}', 
    NOW());

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

ALTER TABLE contact ADD COLUMN user_id VARCHAR;

-- ===========================================
-- optional
-- ===========================================
ALTER TABLE contact
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_auth (id_user) ON DELETE CASCADE;

ALTER TABLE detail_profile_recruiter ADD COLUMN province_id INTEGER;
ALTER TABLE detail_profile_recruiter ADD COLUMN city_id INTEGER;

ALTER TABLE detail_profile_recruiter
ADD CONSTRAINT fk_province_id FOREIGN KEY (province_id) REFERENCES province (id_province) ON DELETE CASCADE;

ALTER TABLE detail_profile_recruiter
ADD CONSTRAINT fk_city_id FOREIGN KEY (city_id) REFERENCES city (id_city) ON DELETE CASCADE;

ALTER TABLE detail_profile_recruiter ADD COLUMN photo VARCHAR DEFAULT NULL;
ALTER TABLE detail_profile_worker ADD COLUMN photo VARCHAR DEFAULT NULL;

ALTER TABLE work_experience ADD COLUMN photo VARCHAR DEFAULT NULL;