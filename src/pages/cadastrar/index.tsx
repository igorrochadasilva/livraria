import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Autentication } from "../../components/auth/Autentication";
import { BookModal } from "../../components/Modal/BookModal";

import { api } from "../../server/api";

import styles from "../../styles/Cadastro.module.scss";

type book = {
  id?: string;
  name: string;
  author: string;
  brand: string;
  year_edition: string;
  image: string;
  status: string;
};

type postBook = Omit<book, "id">;

const Cadastrar: NextPage = () => {
  const [books, setBooks] = useState<book[]>([]);
  const [isBookModalOpen, setisBookModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedBook, setSelectedBook] = useState({} as book);

  // delete book by id
  const deleteBook = useCallback(async (id: string | undefined) => {
    const response = await api.delete(`/book/:${id}`);
    const { data } = response;
    setBooks(data.books);
  }, []);

  // get all books
  const getBooks = useCallback(async () => {
    const response = await api.get("/book");
    const { data } = response;
    setBooks(data.books);
  }, []);

  //get book by id
  const getBookById = useCallback(async (id: string) => {
    const response = await api.get(`/book/:${id}`);
    const { data } = response;
    return data.book;
  }, []);

  //update book
  const updateBook = useCallback(
    async (id: string | undefined, bookUpdated: book) => {
      const response = await api.patch(`/book/:${id}`, bookUpdated);
      const { data } = response;

      setBooks(data.books);
    },
    []
  );

  //send new book
  const postBook = useCallback(
    async (newBook: postBook) => {
      await api.post("/book", newBook);
      getBooks();
    },
    [getBooks]
  );

  //open modal
  const handleOpenBookModal = () => {
    setisBookModalOpen(true);
  };

  //close modal
  const handleCloseBookModal = () => {
    setisBookModalOpen(false);
  };

  //open modal update
  const handleUpdateBook = async (bookId: string | undefined) => {
    const data = bookId && (await getBookById(bookId));
    setModalType("update");
    setSelectedBook(data);
    handleOpenBookModal();
  };

  //opne modal create
  const handleCreateBook = () => {
    setModalType("create");
    handleOpenBookModal();
  };

  //get all books
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <Autentication>
      <BookModal
        selectedBook={selectedBook}
        modalType={modalType}
        isBookModalOpen={isBookModalOpen}
        handleCloseBookModal={handleCloseBookModal}
        postBook={postBook}
        updateBook={updateBook}
      />

      <Header />

      <div className={styles.cadastro}>
        <div className={styles.add}>
          <button onClick={handleCreateBook}>Adicionar</button>
        </div>
        <div className={styles.books}>
          {books.map((book: book) => {
            const { id, name, author, brand, year_edition, image, status } =
              book;

            return (
              <div key={id} className={styles.book}>
                <div className={styles.image}>
                  <Image
                    width={100}
                    height={100}
                    src={image}
                    alt={name}
                    layout={"responsive"}
                  />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{name}</p>
                  <p className={styles.author}>Autor: {author}</p>
                  <p className={styles.brand}>Marca: {brand}</p>
                  <p className={styles.year_edition}>Data: {year_edition}</p>
                  <p className={styles.status}>
                    {status === "available"
                      ? `Status: Disponivel`
                      : `Status:Indisponivel`}
                  </p>
                </div>
                <div className={styles.buttons}>
                  <button
                    className={`${
                      book.status === "unavailable" && styles.unavailable
                    }`}
                    onClick={() => handleUpdateBook(id)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${
                      book.status === "unavailable" && styles.unavailable
                    }`}
                    onClick={() => deleteBook(id)}
                  >
                    Exluir
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </Autentication>
  );
};

export default Cadastrar;
