import Cookies from "js-cookie";
import Head from "next/head";

interface IAutentication{
  children?: React.ReactNode
}

// check if exist cookie to access other pages
export const Autentication = ({children}: IAutentication) => {

  //rediret to login page if cookie not exist
  const redirectUser = () => {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                                if(!document.cookie?.includes("livraria") ){
                                    window.location.href= "/login"
                                }
                            `,
            }}
          />
        </Head>
        {children}
      </>
    );
  };

  if (!Cookies.get("livraria")) {
    return redirectUser();
  } else {
    return <>{children}</>;
  }
}
