CREATE TABLE IF NOT EXISTS users(
    "user_id" VARCHAR(36) PRIMARY KEY,
    "username" VARCHAR(100) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "user_email" VARCHAR(100) NOT NULL,
    "password_encrypted" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS floods (
    "flood_id" VARCHAR(36) PRIMARY KEY,
    "flood_center_location" POINT NOT NULL,
    "date" DATE NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users_contribution (
    "flood_id" VARCHAR(36) PRIMARY KEY,
    "user_location" POINT NOT NULL,
    "user_description" VARCHAR(300),
    "water_level" INT NOT NULL,
    "flood_datetime" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW()
);
