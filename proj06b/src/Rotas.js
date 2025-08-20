import express from "express";
import { produto } from "./database/Produto.js";

const routes = express.Router();

routes.get("/produtos", async function (req, res) {
  try {
    const results = await produto.find();
    if (results.length > 0) res.status(200).json(results);
    else res.sendStatus(404);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

routes.get("/produto/:codigo", async function (req, res) {
  const { codigo } = req.params;
  try {
    const result = await produto.findOne({ codigo: codigo });
    if (result) res.status(200).json(result);
    else res.sendStatus(404);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

routes.get("/promocao", async function (req, res) {
  try {
    const results = await produto.find({ promocao: true });
    if (results.length > 0) res.status(200).json(results);
    else res.sendStatus(404);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

routes.post("/catalogar", async function (req, res) {
  try {
    const novoProduto = new produto({
      codigo: req.body.codigo,
      marca: req.body.marca,
      modelo: req.body.modelo,
      preco: parseInt(req.body.preco),
      descricao: req.body.descricao,
      imagens: req.body.imagens,
      promocao: req.body.promocao,
    });
    const results = await novoProduto.save();
    res.status(201).json(results);
  } catch (err) {
    console.error("Error saving produto:", err); // Logs full error object
    res.status(500).json({ error: err.message, full: err }); // Sends error info in response (for debugging)
  }
});

routes.get("/*other", function (req, res) {
  res.sendStatus(400);
});

export default routes;
