import React, {useState, useEffect} from "react"
import Navegacao from "../components/Navegacao"
import Principal from "../components/Principal"
import ProdutosExemplo from "../datas/ProdutosExemplo"
import {ObterProduto} from "../functions/RequisicaoServidor"

const [produtos, definirProdutos] = useState([])

useEffect(function(){
ObterProdutos()
.then(function(resposta){
  if (resposta.status === 200)
    definirProdutos(resposta.data)
})
.catch(function(error){
  console.log(error)
})
}, [])

export default function Vitrine() {
  return <>
    <Navegacao titulo="VITRINE">
      <a href="/">Início</a>
      <a href="/promocao">Promoção</a>
      <a href="/carrinho">Carrinho</a>
    </Navegacao>
    {
      produtos.lenght > 0 && 
      <Principal produtos={ProdutosExemplo}/>
    }
  </>
}