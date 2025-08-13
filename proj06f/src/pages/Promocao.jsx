import React, { useState, useEffect } from "react";
import { ObterPromocao } from "../functions/RequisicaoServidor";
import Navegacao from "../components/Navegacao";
import Exibidor from "../components/Exibidor";
import ProdutosExemplo from "../datas/ProdutosExemplo";

const [promocao, definirPromocao] = useState([]);

useEffect(function () {
  ObterPromocao()
    .then(function (resposta) {
      if (resposta.status === 200) definirPromocao(resposta.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

export default function Promocao() {
  return (
    <>
      <Navegacao titulo="VITRINE">
        <a href="/">Início</a>
        <a href="/promocao">Promoção</a>
        <a href="/carrinho">Carrinho</a>
      </Navegacao>

      {promocao.length > 0 &&
        promocao.map(function (produto, indice) {
          if (produto.promocao == true)
            return <Exibidor key={indice} produto={produto} />;
        })}
    </>
  );
}
