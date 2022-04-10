import Head from "next/head";

export function HeadComponent() {
  return (
    <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <title>Livraria</title>
      <meta name="description" content="Livraria" />
      <link rel="icon" href="/book.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
