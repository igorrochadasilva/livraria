import Cookies from "js-cookie";
import { NextPage } from "next";
import Router from "next/router";

import { useCallback, useState } from "react";
import { api } from "../../server/api";

import styles from "../../styles/Login.module.scss";

interface ILoginProps {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [msgErro, setMsgErro] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  //login user
  const handleLogin = useCallback(async () => {
    email === "" || senha === "" ? setMsgErro(true) : setMsgErro(false);

    const response = await api.get(`/user/${email}:${senha}`);
    const { data } = response;

    data
      ? (Cookies.set("livraria", data.email), Router.push("/"))
      : setMsgErro(true);
  }, [email, senha]);

  return (
    <section className={styles.login}>
      <div>
        <h1>
          Login
          <span>.</span>
        </h1>
        <label htmlFor="">E-mail</label>
        <input
          type="text"
          placeholder="email@gmail.com..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="">Senha</label>
        <input
          type="password"
          placeholder="12345...."
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button onClick={handleLogin}>Login</button>
        {msgErro && <p>Email ou senha inválido.</p>}
      </div>
    </section>
  );
};

export default Login;
