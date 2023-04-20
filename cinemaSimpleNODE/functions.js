// Movies used are: 'blackAdam', 'wakandaForever', 'avatar', 'scrooge', 'antMan3', 'matilda', 'marioBros', 'creed3', 'shazam2', 'johnWick4'

import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('cinema.sqlite');

// function to create a Database using SQLite3
function createCinemaDatabase(){
    // If the table already exists, drop it
    db.run('DROP TABLE IF EXISTS movies');
    // Create the table
    db.run('CREATE TABLE movies (name TEXT, releaseDate TEXT, starring TEXT, trailer TEXT, image TEXT, certification TEXT)');

    // Add movies:
    const stmt = db.prepare('INSERT INTO movies VALUES (?,?,?,?,?,?)');
    stmt.run('Black Adam', '2022-10-21', 'Dwayne Johnson, Sarah Shahi, Henry Cavill, Pierce Brosnan', 'https://www.youtube.com/watch?v=X0tOpBuY', 'images/blackAdamImg.jpg', 'https://www.imdb.com/title/tt6443346/parentalguide');
    stmt.run('Black Panther: Wakanda Forever', '2022-11-11', 'Tenoch Huerta, Letitia Wright, Michael B. Jordan, Angela Bassett', 'https://www.youtube.com/watch?v=RlOB3UALvrQ', 'images/wakandaForeverImg.jpg', 'https://m.imdb.com/title/tt9114286/parentalguide/certificates');
    stmt.run('Avatar: The Way of Water', '2022-12-16', 'Sam Worthington, Zoe Saldana, Sigourney Weaver, Kate Winslet', 'https://www.youtube.com/watch?v=d9MyW72ELq0', 'images/avatarImg.jpg', 'https://www.imdb.com/title/tt1630029/parentalguide');
    stmt.run('Scrooge: A Christmas Carol', '2022-11-18', 'Luke Evans, Olivia Colman, jessica Buckley, Fra Fee', 'https://www.youtube.com/watch?v=tZylTiyaWV8', 'images/scroogeImg.jpg', 'https://m.imdb.com/title/tt20917338/parentalguide/certificates?ref_=tt_ov_pg');
    stmt.run('Ant-Man & The Wasp: Quantumania', '2023-02-17', 'Paul Rudd, Jonathan Majors, Michelle Pfeiffer, Kathryn Newton', 'https://www.youtube.com/watch?v=ZlNFpri-Y40', 'images/antMan3Img.jpg', null);
    stmt.run('Matilda', '2022-11-25', 'Emma Thompson, Alisha Weir, Lashana Lynch, Stephen Graham', 'https://www.youtube.com/watch?v=lroAhsDr2vI', 'images/matildaImg.jpg', 'https://www.imdb.com/title/tt3447590/parentalguide');
    stmt.run('The Super Mario Bros. Movie', '2023-04-07', 'Chris Pratt, Charlie Day, Seth Rogan, Jack Black', 'https://www.youtube.com/watch?v=TnGl01FkMMo', 'images/mariosBrosImg.jpg', null);
    stmt.run('Creed III', '2023-03-03', 'Jonathan Majors, Michael B. Jordan, Tessa Thompson, Florian Munteanu', 'https://www.youtube.com/watch?v=AHmCH7iB_IM', 'images/creed3Img.jpg', null);
    stmt.run('Shazam! Fury of the gods', '2023-03-17', 'Zachary Levi, grace Fulton, Asher Angel, Rachel Zegler', 'https://www.youtube.com/watch?v=Zi88i4CpHe4', 'images/shazam2Img.jpg', null);
    stmt.run('John Wick: Chapter 4', '2023-03-24', 'Keanu Reeves, Donnie Yen, Scott Adkins, Nill Skarsgard', 'https://www.youtube.com/watch?v=qEVUtrk8_B4', 'images/johnWick4Img.jpg', null);

    stmt.finalize();

    db.close();
}

// function to add a movie to the database
function createMovie(name, releaseDate, starring, trailer, image, certification){
    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO movies VALUES (?,?,?,?,?,?)');
        stmt.run(name, releaseDate, starring, trailer, image, certification);
        stmt.finalize();
    })
    // and finally, close the database
    db.close();
}

// function for deleting a movie from the database:
function deleteMovie(name){
    const stmt = db.prepare("DELETE FROM movies WHERE name = (?)");
    stmt.run(name, (err) => {
        if(err) { // do something
            console.log("Error : " + err);
        }
        else { // ok
          console.log("row deleted");
        } 
    })
    stmt.finalize();
    db.close();
}

// function for reading movies from the database:
function readMovies(){
    db.each("SELECT rowid AS id, * FROM movies", function(err, row){
        console.log(`Movie -> ${row.id}: ${row.name}, ${row.releaseDate}, Starring ${row.starring}`);
    });
    db.close();
}

// function to print and return an individual movie:
function readMovie(name){
    db.each("SELECT rowid AS id, * FROM movies", function(err, row){
        if(row.name == name){
            console.log(`Movie -> ${row.id}: ${row.name}, ${row.releaseDate}, Starring ${row.starring}`);
            return {
                name: row.name,
                releaseDate: row.releaseDate,
                starring: row.starring, 
                trailer: row.trailer, 
                image: row.image, 
                certification : row.certification
            }
        }
    });
    db.close();
}

//function for updating old existing movie:
function updateMovie(oldMovieName, newMovieObj){
    db.serialize(() => {
        db.run(`UPDATE movies 
                    SET name = ${newMovieObj.name},
                        releaseDate = ${newMovieObj.releaseDate},
                        starring = ${newMovieObj.starring},
                        trailer = ${newMovieObj.trailer},
                        image = ${newMovieObj.image},
                        certification = ${newMovieObj.certification}
                    WHERE name = ${oldMovieName}`);
    })
    // and finally, close the database
    db.close();
}
