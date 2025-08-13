import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { ObterProdutoCodigo } from "../functions/RequisicaoServidor"
import Navegacao from "../components/Navegacao"
import Exibidor from "../components/Exibidor"
import ProdutosExemplo from "../datas/ProdutosExemplo"

const [produto, definirProduto] = useState({})

useEffect(function() {
  ObterProdutoCodigo(codigo)
    .then(function(resposta) {
      if (resposta.status === 200)
        definirProduto(resposta.data)
    })
    .catch(function(error){
      console.log(error)
    })
})

export default function Produto() {
  const {codigo} = useParams()
  return <>
    <Navegacao titulo="VITRINE">
      <a href="/">Inicio</a>
      <a href="/promocao">Promoção</a>
      <a href="/carrinho">Carrinho</a>
    </Navegacao>

    <Exibidor produto={produto}/>
  </>
}