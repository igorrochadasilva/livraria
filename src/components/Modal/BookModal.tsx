import Modal from "react-modal";
import styles from "../../styles/BookModal.module.scss";
import { closeModal } from "../../assets/icons/icons";
import { useEffect, useState } from "react";

//type book
type book = {
  id?: string;
  name: string;
  author: string;
  brand: string;
  year_edition: string;
  image: string;
  status: string;
};

//type book without id
type postBook = Omit<book, "id">;

//interface Book Modal
interface IBookModal {
  selectedBook: book;
  modalType: string;
  isBookModalOpen: boolean;
  handleCloseBookModal: () => void;
  postBook: (newBook: postBook) => void;
  updateBook: (id: string | undefined, bookUpdate: book) => void;
}

export const BookModal = ({
  selectedBook,
  modalType,
  isBookModalOpen,
  handleCloseBookModal,
  postBook,
  updateBook,
}: IBookModal) => {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookBrand, setBookBrand] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [bookYearEdition, setBookYearEdition] = useState("");

  //create or update book
  const handleCreateOrUpdateBook = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    const newBook = {
      name: bookName,
      author: bookAuthor,
      brand: bookBrand,
      year_edition: bookYearEdition,
      image: bookImage,
      status: "available",
    };

    modalType === "create"
      ? postBook(newBook)
      : updateBook(selectedBook.id, newBook);

    setBookName("");
    setBookAuthor("");
    setBookBrand("");
    setBookYearEdition("");
    setBookImage("");
    handleCloseBookModal();
  };

  //update inputs with book selected
  const updateInputs = () => {
    const { name, author, brand, year_edition, image } = selectedBook;
    setBookName(name);
    setBookAuthor(author);
    setBookBrand(brand);
    setBookImage(image);
    setBookYearEdition(year_edition);
  };

  //get bookie by id
  useEffect(() => {
    modalType === "update" && updateInputs();
  }, [modalType, selectedBook]);

  return (
    <Modal
      isOpen={isBookModalOpen}
      onRequestClose={handleCloseBookModal}
      overlayClassName="react-modal-overlay"
      className="react-modal"
      ariaHideApp={false}
    >
      <button
        type="button"
        onClick={handleCloseBookModal}
        className="react-modal-close"
      >
        {closeModal}
      </button>
      <div className={styles.bookModal}>
        <h1>
          {modalType === "create" ? `Cadastrar novo Livro` : `Atualizar Livro`}
        </h1>
        <form className={styles.form} onSubmit={handleCreateOrUpdateBook}>
          <input
            type="text"
            placeholder="Nome do livro"
            required
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Autor"
            required
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Marca"
            required
            value={bookBrand}
            onChange={(e) => setBookBrand(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ano edição"
            required
            value={bookYearEdition}
            onChange={(e) => setBookYearEdition(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link de imagem do livro"
            required
            value={bookImage}
            onChange={(e) => setBookImage(e.target.value)}
          />
          <button type="submit">
            {modalType === "create" ? `Cadastrar` : `Atualizar`}
          </button>
        </form>
      </div>
    </Modal>
  );
};
