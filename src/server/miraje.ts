import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,
    //modelo de banco de dados.
    models: {
      book: Model,
      user: Model,
    },

    seeds(server) {
      server.db.loadData({
        books: [
          {
            id: 1,
            name: "A Garota do Lago",
            author: "Donlea,Charlie",
            brand: "Faro Editorial",
            year_edition: "2017",
            image:
              "https://lojasaraiva.vteximg.com.br/arquivos/ids/12109069/1006574337.jpg?v=637142248039070000",
            status: "available",
          },
          {
            id: 2,
            name: "Do Mil Ao Milhão",
            author: "Nigro,Thiago",
            brand: "Harpercollins",
            year_edition: "2018",
            image:
              "https://lojasaraiva.vteximg.com.br/arquivos/ids/12113964/1006831025.jpg?v=637142266314730000",
            status: "available",
          },
          {
            id: 3,
            name: "O Milagre Da Manhã",
            author: "Elrod,Hal",
            brand: "Best Seller",
            year_edition: "2016",
            image:
              "https://lojasaraiva.vteximg.com.br/arquivos/ids/12107927/1008997059.jpg?v=637142244051200000",
            status: "available",
          },
          {
            id: 4,
            name: "Mais Esperto Que o Diabo",
            author: "Hill,Napoleon",
            brand: "Citadel",
            year_edition: "2014",
            image:
              "https://lojasaraiva.vteximg.com.br/arquivos/ids/12104802/1009575881.jpg?v=637142231559930000",
            status: "available",
          },
          {
            id: 5,
            name: "Os Segredos da Mente Milionária ",
            author: "Eker,T. Harv",
            brand: "Sextante / Gmt",
            year_edition: "1992",
            image:
              "https://lojasaraiva.vteximg.com.br/arquivos/ids/12100776/1009412203.jpg?v=637142217795870000",
            status: "unavailable",
          },
        ],
        users: [
          {
            email: "test@gmail.com",
            password: "123456",
          },
        ],
      });
    },

    routes() {
      this.namespace = "api";

      //check if user is registered
      this.get("/user/:user", (schema, request) => {
        
        const params = request.params.user.split(":");

        const user = {
          email: params[0],
          password: params[1],
        };

        return schema.db.users.findBy(user);
      });

      //update only rent book
      this.patch("/book/rent/:id", (schema, request) => {
        const id = request.params.id.replace(":", "");

        let book = schema.db.books.find(id);
        book.status = "unavailable";
        
        schema.db.books.update(id, book);
        return this.schema.all("book");
      });

      //get all books
      this.get("/book", () => {
        return this.schema.all("book");
      });

      //get book by id
      this.get("/book/:id", (schema, request) => {
        const id = request.params.id.replace(":", "");
        return this.schema.find("book", id);
      });

      //update book by id
      this.patch("/book/:id", (schema, request) => {
        const id = request.params.id.replace(":", "");
        const book = JSON.parse(request.requestBody);
        schema.db.books.update(id, book);
        return this.schema.all("book");
      });

      //create book
      this.post("/book", (schema, request) => {
        const data = JSON.parse(request.requestBody);

        return schema.create("book", data);
      });

      //delete book by id
      this.del("/book/:id", (schema, request) => {
        const id = request.params.id.replace(":", "");
        schema.find("book", id)?.destroy()
        return this.schema.all("book");
      });

      // resets the namespace to the root
      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
