-- Genres
INSERT INTO genre (name) VALUES ('Action');
INSERT INTO genre (name) VALUES ('Drama');
INSERT INTO genre (name) VALUES ('Crime');
INSERT INTO genre (name) VALUES ('Sci-Fi');
INSERT INTO genre (name) VALUES ('Animation');
INSERT INTO genre (name) VALUES ('Thriller');

-- Directors
INSERT INTO director (name, nationality) VALUES ('Christopher Nolan', 'British');
INSERT INTO director (name, nationality) VALUES ('Martin Scorsese', 'American');
INSERT INTO director (name, nationality) VALUES ('Quentin Tarantino', 'American');
INSERT INTO director (name, nationality) VALUES ('Denis Villeneuve', 'Canadian');
INSERT INTO director (name, nationality) VALUES ('Hayao Miyazaki', 'Japanese');
INSERT INTO director (name, nationality) VALUES ('David Fincher', 'American');
INSERT INTO director (name, nationality) VALUES ('Ridley Scott', 'British');
INSERT INTO director (name, nationality) VALUES ('Bong Joon-ho', 'South Korean');

-- Movies
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('The Dark Knight', 2008, 9.0, 1, 1);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Inception', 2010, 8.8, 4, 1);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Interstellar', 2014, 8.6, 4, 1);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('The Prestige', 2006, 8.5, 6, 1);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Goodfellas', 1990, 8.7, 3, 2);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('The Departed', 2006, 8.5, 3, 2);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Taxi Driver', 1976, 8.2, 2, 2);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Pulp Fiction', 1994, 8.9, 3, 3);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Inglourious Basterds', 2009, 8.3, 2, 3);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Django Unchained', 2012, 8.4, 1, 3);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Kill Bill Vol. 1', 2003, 8.1, 1, 3);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Blade Runner 2049', 2017, 8.0, 4, 4);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Arrival', 2016, 7.9, 4, 4);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Dune', 2021, 8.0, 4, 4);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Dune: Part Two', 2024, 8.5, 4, 4);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Spirited Away', 2001, 8.6, 5, 5);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Princess Mononoke', 1997, 8.4, 5, 5);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('My Neighbor Totoro', 1988, 8.1, 5, 5);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Fight Club', 1999, 8.8, 2, 6);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Se7en', 1995, 8.6, 3, 6);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Zodiac', 2007, 7.7, 6, 6);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('The Girl with the Dragon Tattoo', 2011, 7.8, 6, 6);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Gladiator', 2000, 8.5, 1, 7);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('The Martian', 2015, 8.0, 4, 7);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Black Hawk Down', 2001, 7.7, 1, 7);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Parasite', 2019, 8.5, 6, 8);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('Memories of Murder', 2003, 8.1, 3, 8);
INSERT INTO movie (title, release_year, rating, genre_id, director_id) VALUES ('The Host', 2006, 7.9, 4, 8);