import { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import { api } from "../../server/api";

import styles from "../../styles/Home.module.scss";

//book type
type book = {
  id: string;
  name: string;
  author: string;
  brand: string;
  year_edition: string;
};

//Home Book List
export const Books = () => {
  const [books, setBooks] = useState<book[]>([]);
  const [bookSearched, setBookSearched] = useState<book[]>([]);

  // search book by name
  const handleSearchBook = useCallback(
    (searchedInput: string) => {
      const searchedBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchedInput.toLowerCase())
      );
      setBookSearched(searchedBooks);
    },
    [books]
  );

  // rent book
  const handleRent = useCallback(async (id: string) => {
    const response = await api.patch(`/book/rent/:${id}`);
    const { data } = response;

    setBooks(data.books);
    setBookSearched(data.books);
  }, []);

  // get books
  const getBooks = useCallback(async () => {
    const response = await api.get("/book");
    const { data } = response;
    setBooks(data.books);
    setBookSearched(data.books);
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <main className={styles.home}>
      <div className={styles.search}>
        <input
          type="search"
          placeholder="pesquisar livro..."
          onChange={(e) => handleSearchBook(e.target.value)}
        />
        <span className={styles.iconSearch}>🔍</span>
      </div>
      <div className={styles.books}>
        {books.length != 0 || bookSearched.length != 0 ? (
          bookSearched.length != 0 ? (
            bookSearched.map((book: any) => (
              <div key={book.id} className={styles.book}>
                <div className={styles.image}>
                  <Image
                    width={100}
                    height={100}
                    src={book.image}
                    alt={book.name}
                    layout={"responsive"}
                  />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{book.name}</p>
                  <p className={styles.author}>Autor: {book.author}</p>
                  <p className={styles.brand}>Marca: {book.brand}</p>
                  <p className={styles.year_edition}>
                    Data: {book.year_edition}
                  </p>
                </div>
                <div className={styles.buttons}>
                  {book.status === "available" ? (
                    <button onClick={() => handleRent(book.id)}>Alugar</button>
                  ) : (
                    <span>Indisponivel</span>
                  )}
                </div>
              </div>
            ))
          ) : books.length === 0 ? (
            <p className={styles.unavailableBooks}>
              Infelismente não temos livros disponiveis para alugar :({" "}
            </p>
          ) : (
            <p className={styles.notFound}>
              Infelismente não temos o livro que procura :({" "}
            </p>
          )
        ) : null}
      </div>
    </main>
  );
};
