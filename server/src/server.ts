import app from './app'
import { prisma } from './lib/prisma'
const port = process.env.PORT || 3000
app.listen(port, async () => {
    console.log(`Servidor online e rodando na porta: ${port}`)

    console.log("Tentando conectar ao banco de dados...")

    await prisma.$connect()
        .then(() => {
            console.log("Conexão com o banco de dados estabelecida com sucesso!");
        })
        .catch((err) => {
            console.error("Erro ao conectar ao banco de dados:", err.message);
            process.exit(1); // Encerra o processo se a conexão falhar
        });
})