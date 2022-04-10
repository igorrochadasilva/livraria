import type { NextPage } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Books } from "../components/Books";
import { Autentication } from "../components/auth/Autentication";

const Home: NextPage = () => {
  return (
    <>
      <Autentication>
        <Header />
        <Books />
        <Footer />
      </Autentication>
    </>
  );
};

export default Home;
