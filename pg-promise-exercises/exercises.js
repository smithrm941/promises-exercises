const pg = require('pg-promise')()
const assert = require('assert')

const postgresConfig = {
  host: 'localhost',
  port: 5432,
  database: 'pg-promise-exercises',
  user: 'ramonesweasel', // replace this with your username
  password: '' //  replace this if you have set a password for your username (this is unlikely)
};


const db = pg(postgresConfig);

/* -----------------------------------------
   Exercise 1
   -----------------------------------------

   This is an example function that finds all the books from the `books` table
   @function: `allBooks`
   @input params: None
   @output: [{id, title, author_id, subject_id}]

   The assertion fails, and you have to make it pass.

*/



const allBooks = db.any('select * from books')
/* This is calling the `then` function on the `allBooks` promise, and checks if
   we get back 15 rows. This assertion will fail. Make it PASS!*/
allBooks.then(books => {
  assert.deepEqual(books.length, 15)
  console.log('Hooray!')
}).catch(error => {
  console.log('Dang, my assertion failed.', error);
});

/* --------End of Exercise 1---------------- */





/* -----------------------------------------
           Exercise 2
   -----------------------------------------

   Implement the function `firstTenBooks` which returns just the names of the
   books, and make the assertion pass.
   @function: `firstTenBooks`
   @input params: None
   @output: [{id, title, author_id, subject_id}]


*/

let firstTenBooks = db.any('SELECT title FROM books LIMIT 10'); // = .... IMPLEMENT THIS FUNCTION
firstTenBooks.then(books => {
  assert.deepEqual(books.length, 10)
  console.log('OMG, 10 book titles!')
}).catch(error => {
  console.log('Whoops, my function doesnt behave as expected.', error);
});

/* --------End of Exercise 2---------------- */




/* -----------------------------------------
            Exercise 3
   -----------------------------------------

   Implement the function `findAuthorsOrderedByLastName` which returns all the
   authors from the the `authors` table, and the rows are ordered by the
   `last_name`.


   @function: `findAuthorsOrderedByLastName`
   @input params: None
   @output: [{id, first_name, last_name}]


*/

let findAuthorsOrderedByLastName = db.any('SELECT * FROM authors ORDER BY last_name ASC'); // = .... IMPLEMENT THIS FUNCTION
findAuthorsOrderedByLastName.then(authors => {
  assert.deepEqual(authors.length, 19)
    console.log('Returned 19 rows')
  assert.deepEqual(authors[0].last_name, 'Alcott')
    console.log('First author\'s last name is Alcott')
  assert.deepEqual(authors[18].last_name, 'Worsley')
    console.log('Last author\'s last name is Worsley')
}).catch(error => {
  console.log('Whoops, my function doesnt behave as expected.', error);
});

/* --------End of Exercise 3---------------- */



/* -----------------------------------------
   Exercise 4
   -----------------------------------------

   Implement the function `findBookAuthors` which returns the `first_name` and
   `last_name` from the `authors` table, and the `title` of the
   books(from the `books` table) that the authors have written.

   @function: `findBookAuthors`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
   [{first_name: 'John', last_name: 'Worsley', title: 'Practical PostgreSQL'}
   {first_name: 'Paulette', last_name: 'Bourgeois', title: 'Franklin in the Dark'}
   {first_name: 'Margery Williams', last_name: 'Bianco', title: 'The Velveteen Rabbit'}
   {first_name: 'Louisa May', last_name: 'Alcott', title: 'Little Women'}
   {first_name: 'Stephen', last_name: 'King', title: 'The Shining'}
   {first_name: 'Frank', last_name: 'Herbert', title: 'Dune'}
   {first_name: 'Burne', last_name: 'Hogarth', title: 'Dynamic Anatomy'}
   {first_name: 'Margaret Wise', last_name: 'Brown', title: 'Goodnight Moon'}
   {first_name: 'Edgar Allen', last_name: 'Poe', title: 'The Tell-Tale Heart'}
   {first_name: 'Mark', last_name: 'Lutz', title: 'Learning Python'}
   {first_name: 'Mark', last_name: 'Lutz', title: 'Programming Python'}
   {first_name: 'Tom', last_name: 'Christiansen', title: 'Perl Cookbook'}
   {first_name: 'Arthur C.', last_name: 'Clarke', title: '2001: A Space Odyssey'}
   {first_name: 'Theodor Seuss', last_name: 'Geisel', title: 'Bartholomew and the Oobleck'}
   {first_name: 'Theodor Seuss', last_name: 'Geisel', title: 'The Cat in the Hat'}]
*/

let findBookAuthors = db.any('SELECT first_name, last_name, title FROM authors JOIN books ON authors.id = author_id');

findBookAuthors.then(authorAndBook => {
  assert.deepEqual(authorAndBook.length, 15)
    console.log('Correct number of books')
  assert.deepEqual(authorAndBook[14].last_name, 'Geisel')
    console.log('Last author\'s name is Geisel')
  assert.deepEqual(authorAndBook[0].title, 'Practical PostgreSQL')
    console.log('First book\'s title is Practical PostgreSQL')
}).catch(error => {
  console.log('Try again', error);
})
/* --------End of Exercise 4---------------- */





/* -----------------------------------------
   Exercise 5
   -----------------------------------------

   Implement the function `authorIdWithTwoBooks` which returns the
   `author_id` of authors who have 2 books. (HINT: you have to use a SUBQUERY)

   @function: `authorIdWithTwoBooks`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
     [{author_id: 1809},
      {author_id: 7805}]


*/
let authorIdWithTwoBooks = db.any('SELECT author_id FROM books GROUP BY author_id HAVING COUNT(books.author_id) = 2');

authorIdWithTwoBooks.then(twoBookAuthors => {
  assert.deepEqual(twoBookAuthors.length, 2)
    console.log('There are two authors with two books')
  assert.deepEqual(twoBookAuthors[0].author_id, 1809)
    console.log('1809 is the first author_id with two books')
  assert.deepEqual(twoBookAuthors[1].author_id, 7805)
    console.log('7805 is the second author_id with two books')
}).catch(error => {
  console.log('Whoops!', error);
});

/* --------End of Exercise 5---------------- */





/* -----------------------------------------
   Exercise 6
   -----------------------------------------

   Implement the function `bookTitlesWithMultipleEditions` which returns the
   `title` of books which have more than 2 editions. (HINT: you have to use a join)

   @function: `bookTitlesWithMultipleEditions`
   @input params: None
   @output: [{title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
     [{title: 'The Shining'},
      {title: 'The Cat in the Hat'},
      {title: 'Dune'}
      {title: '2001: A Space Odyssey'}
      {title: 'The Tell-Tale Heart'}]

*/
let bookTitlesWithMultipleEditions = db.any('SELECT title FROM books JOIN editions ON books.id = editions.book_id WHERE edition > 1 GROUP BY title');

bookTitlesWithMultipleEditions.then(multipleEditionTitles => {
  assert.deepEqual(multipleEditionTitles.length, 5)
    console.log('There are 5 books with multiple editions')
  assert.deepEqual(multipleEditionTitles[2].title, 'Dune')
    console.log('The third title in the table is Dune')
}).catch(error => {
  console.log('Whoopsie Daisy', error);
})



/* --------End of Exercise 6---------------- */




/* -----------------------------------------
   Exercise 7
   -----------------------------------------

   Implement the function `findStockedBooks` which returns the `title` & the
   author's `first_name` & `last_name` of all books which are stocked as
   represented in the `daily_inventory` table.

   @function: `findStockedBooks`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
   [ {first_name: 'Frank',  title: 'Dune', last_name: 'Herbert'},
     {title: 'The Cat in the Hat', first_name: 'Theodor Seuss', last_name: 'Geisel'}]

*/
let findStockedBooks = db.any('SELECT title, first_name, last_name FROM books JOIN authors ON books.author_id = authors.id JOIN editions ON books.id = editions.book_id JOIN daily_inventory ON editions.isbn = daily_inventory.isbn WHERE daily_inventory.is_stocked = TRUE GROUP BY books.title, authors.last_name, authors.first_name');

findStockedBooks.then(stockedBooks => {
  assert.deepEqual(stockedBooks.length, 2)
    console.log('Correct number of stocked books')
}).catch(error => {
    console.log('Wrong!', error)
})
//books has id & title & author_id
//editions has isbn & book_id
//authors has id & last_name & first_name
//daily_inventory has isbn & true/false for is_stocked


/* --------End of Exercise 7---------------- */




console.log('Reached the end!');
pg.end();
