CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(155) NOT NULL UNIQUE,
    CHECK (
        email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
    ),
    password VARCHAR(60) NOT NULL
);

CREATE TABLE categories(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    sap_cat_id uuid
);

CREATE TABLE videos (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    files VARCHAR(500) [] NOT NULL,
    user_id uuid REFERENCES users(id),
    category_id uuid REFERENCES categories(id),
    date VARCHAR(155) DEFAULT now()
);

CREATE TABLE comments (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    video_id uuid REFERENCES videos(id),
    comment text
);