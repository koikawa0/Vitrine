import mongoose from "mongoose"
import "dotenv/config"

const endereco = process.env.MONGO_URI 

const configuracao = {
     useNewUrlParser: true,
     useUnifiedTopology: true
}

mongoose.connect(endereco, configuracao)
  .then(() => {
    console.log("CONECTADO COM O BANCO DE DADOS!");
  })
  .catch((err) => {
    console.error("ERRO AO CONECTAR NO BANCO DE DADOS:", err);
  });
