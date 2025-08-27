import React, { useState, useEffect } from "react";
import Navegacao from "../components/Navegacao";
import ProdutosExemplo from "../datas/ProdutosExemplo";
import Janela from "../components/Janela";
import ObterCarrinho from "../functions/obterCarrinho";
import Pagamento from "../functions/Pagamento";
import { ObterProdutos } from "../functions/RequisicaoServidor";

export default function Carrinho() {
  const [produtos, definirProdutos] = useState([]);
  const [carrinho, definirCarrinho] = useState([]);
  const [preco, definirPreco] = useState(0);

  // Get products from server once
  useEffect(() => {
    ObterProdutos()
      .then((resposta) => {
        if (resposta.status === 200) definirProdutos(resposta.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Get cart items each time products update
  useEffect(() => {
    const resultado = ObterCarrinho();
    definirCarrinho(resultado);
  }, [produtos]);

  useEffect(() => {
    let total = 0;
    // Para cada item do carrinho, pegue o produto real da lista de produtos (do backend)
    carrinho.forEach((codigo) => {
      const produto = produtos.find((produto) => produto.codigo === codigo);
      if (produto) {
        total += parseInt(produto.preco, 10);
      }
    });
    definirPreco(total);
  }, [produtos, carrinho]);

  // Render cart product lines
  const linhas = carrinho.map((codigo, indice) => {
    for (const produto of produtos) {
      if (produto.codigo === codigo)
        return (
          <tr key={indice}>
            <td>{produto.codigo}</td>
            <td>{produto.modelo}</td>
            <td>R$ {produto.preco}.00</td>
          </tr>
        );
    }
    return null;
  });

  return (
    <>
      <Navegacao titulo="VITRINE">
        <a href="/">Inicio</a>
        <a href="/promocao">Promoção</a>
        <a href="/carrinho">Carrinho</a>
      </Navegacao>

      {produtos.length > 0 && (
        <Janela>
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  <b>Código</b>
                </td>
                <td>
                  <b>Modelo do Produto</b>
                </td>
                <td>
                  <b>Preço</b>
                </td>
              </tr>
              {linhas}
            </tbody>
          </table>
          <h1>Total R$ {preco},00</h1>
          <button onClick={Pagamento}>Pagamento por PIX</button>
        </Janela>
      )}
    </>
  );
}
