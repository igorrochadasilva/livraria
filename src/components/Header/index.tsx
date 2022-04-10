import { useState } from "react";
import Router from "next/router";
import Link from "next/link";

import Cookies from "js-cookie";

import { iconLivraria, iconLogout, iconMenu } from "../../assets/icons/icons";
import styles from "../../styles/Header.module.scss";

export const Header = () => {
  const [isMenuMobOpen, setIsMenuMobOpen] = useState(false);

  //event logout
  const handleLogout = () => {
    Cookies.remove("livraria");
    Router.push("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.icon}>
          {iconLivraria}
          <p>Livraria </p>
        </div>
        <div className={`${styles.menu} ${isMenuMobOpen && styles.show}`}>
          <ul>
            <li className={styles.close}>
              <span onClick={() => setIsMenuMobOpen(!isMenuMobOpen)}>
                &times;
              </span>
            </li>
            <li>
              <Link href={"/"} passHref>
                <a>Livros</a>
              </Link>
            </li>
            <li>
              <Link href={"/cadastrar"} passHref>
                <a>Cadastrar</a>
              </Link>
            </li>
            <li>
              <a className={styles.logout} onClick={handleLogout}>
                Logout {iconLogout}
              </a>
            </li>
          </ul>
        </div>
        <div
          className={styles.menuMob}
          onClick={() => setIsMenuMobOpen(!isMenuMobOpen)}
        >
          {iconMenu}
        </div>
      </nav>
    </header>
  );
};
