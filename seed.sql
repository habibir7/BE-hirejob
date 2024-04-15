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

-- ===========================================
-- TABLE skills
-- ===========================================
CREATE TABLE skills (
    id VARCHAR UNIQUE PRIMARY KEY, 
    skill_name VARCHAR NOT NULL, 
    created_at TIMESTAMP, 
    updated_at TIMESTAMP
)
-- !minus fk user_id!

SELECT * FROM detail_profile_worker

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
-- !minus fk user_id!

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
-- !minus fk user_id!

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