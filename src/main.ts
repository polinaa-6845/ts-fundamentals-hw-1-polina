import { Library } from "./library";
import { Book } from "./book";

const library = new Library();

function logSection(title: string) {
  console.log(`\n=== ${title} ===`);
}

function logBooks(title: string) {
  logSection(title);
  for (const b of library.listAll()) {
    console.log(b.getInfo());
  }
}

function logAvailable(title: string) {
  logSection(title);
  for (const b of library.listAvailable()) {
    console.log(b.getInfo());
  }
}

const book1 = new Book({
  id: "1",
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  year: 1937,
  genre: "fantasy",
});

const book2 = new Book({
  id: "2",
  title: "1984",
  author: "George Orwell",
  year: 1949,
  genre: "dystopian",
});

const book3 = new Book({
  id: "3",
  title: "A Brief History of Time",
  author: "Stephen Hawking",
  year: 1988,
  genre: "science",
});

library.add(book1);
library.add(book2);
library.add(book3);

try {
  console.log("\n→ Try to add duplicate (id=2): expect 'Item already exists'");
  library.add(book2);
} catch (e) {
  console.log("Expected error:", (e as Error).message);
}

logBooks("All books (after add)");

console.log("\n→ Borrow book id=1 by 'Alice'");
library.borrow("1", "Alice");
logBooks("After borrowing book 1");
logAvailable("Available books (book 1 must be absent)");

try {
  console.log(
    "\n→ Borrow book id=1 again by 'Bob': expect 'Already borrowed by Alice'"
  );
  library.borrow("1", "Bob");
} catch (e) {
  console.log("Expected error:", (e as Error).message);
}

console.log("\n→ Return book id=1");
library.return("1");
logBooks("After returning book 1");
logAvailable("Available books (book 1 must be present)");

try {
  console.log("\n→ Return book id=1 again: expect 'Already available'");
  library.return("1");
} catch (e) {
  console.log("Expected error:", (e as Error).message);
}

console.log("\n→ Remove book id=2");
library.remove("2");
logBooks("After removing book 2");

try {
  console.log("\n→ Remove non-existing book id=999: expect 'Book not found'");
  library.remove("999");
} catch (e) {
  console.log("Expected error:", (e as Error).message);
}

console.log("\n→ Borrow book id=3 by 'Charlie'");
library.borrow("3", "Charlie");

try {
  console.log(
    "\n→ Remove borrowed book id=3: expect 'Cannot remove borrowed item'"
  );
  library.remove("3");
} catch (e) {
  console.log("Expected error:", (e as Error).message);
}

logBooks("Final state");