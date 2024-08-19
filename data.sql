CREATE DATABASE `movie_store`;

CREATE TABLE
    `users` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `role` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'USER',
        `email` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `phone` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `email` (`email`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
    `movies` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `title` varchar(100) NOT NULL DEFAULT '' COMMENT '标题',
        `poster` varchar(255) NOT NULL DEFAULT '海报',
        `genre` varchar(255) NOT NULL DEFAULT '' COMMENT '类型',
        `release_date` int COMMENT '发布时间',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

INSERT INTO `movies`
VALUES (
        1,
        'Beetlejuice',
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
        'Comedy, Fantasy',
        1988,
        NOW(),
        NOW()
    );

INSERT INTO `movies`
VALUES (
        2,
        'The Cotton Club',
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
        'Crime, Drama, Music',
        1984,
        NOW(),
        NOW()
    );

INSERT INTO `movies`
VALUES (
        3,
        'Crocodile Dundee',
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg',
        'Adventure, Comedy',
        1986,
        NOW(),
        NOW()
    );

INSERT INTO `movies`
VALUES (
        4,
        'The Intouchables',
        'http://ia.media-imdb.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg',
        'Biography, Comedy, Drama',
        2011,
        NOW(),
        NOW()
    );

CREATE TABLE
    `movie_ratings` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `movie_id` bigint NOT NULL,
        `rating` decimal(10,1) NOT NULL DEFAULT '0.0' COMMENT '评分',
        `version` bigint NOT NULL DEFAULT '1' COMMENT '版本号',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
