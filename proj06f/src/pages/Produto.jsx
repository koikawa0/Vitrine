import React from "react"
import { useParams } from "react-router-dom"

import Navegacao from "../components/Navegacao"
import Exibidor from "../components/Exibidor"
import ProdutosExemplo from "../datas/ProdutosExemplo"

export default function Produto() {
  return <>
    <Navegacao titulo="VITRINE">
      <a href="/">Inicio</a>
      <a href="/promocao">Promoção</a>
      <a href="/carrinho">Carrinho</a>
    </Navegacao>

    <Exibidor produto={ProdutosExemplo.find((produto) => produto.codigo == codigo)}/>

    const {codigo} = useParams()
  </>
}