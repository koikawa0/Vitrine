import React, { useState, useEffect } from "react";
import Navegacao from "../components/Navegacao";
import Principal from "../components/Principal";
import { ObterProdutos } from "../functions/RequisicaoServidor";

export default function Vitrine() {
  const [produtos, definirProdutos] = useState([]);

  useEffect(() => {
    ObterProdutos()
      .then((resposta) => {
        if (resposta.status === 200) {
          definirProdutos(resposta.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navegacao titulo="VITRINE">
        <a href="/">Início</a>
        <a href="/promocao">Promoção</a>
        <a href="/carrinho">Carrinho</a>
      </Navegacao>
      {produtos.length > 0 && (
        <Principal produtos={produtos} />
      )}
    </>
  );
}
