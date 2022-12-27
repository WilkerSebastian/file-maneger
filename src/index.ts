import App from "./App";

const PORT = process.env.PORT || 8080

const app = new App()

app.server.listen(PORT, () => {

    console.log(`servidor rodando, na porta ${PORT}`);

}) 