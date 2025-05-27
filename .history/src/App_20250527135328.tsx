import { useGetProdutosQuery } from './store/produtosApi'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './store/store'
import { adicionarAoCarrinho } from './store/carrinhoSlice'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const { data: produtos = [], isLoading, error } = useGetProdutosQuery()
  const carrinho = useSelector((state: RootState) => state.carrinho.itens)
  const dispatch = useDispatch<AppDispatch>()

  function handleAdicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(adicionarAoCarrinho(produto))
    }
  }

  // Para favoritos, você pode criar outro slice similar se desejar

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={[]} itensNoCarrinho={carrinho} />
        {isLoading && <p>Carregando produtos...</p>}
        {error && <p>Erro ao carregar produtos</p>}
        {!isLoading && !error && (
          <Produtos
            produtos={produtos}
            favoritos={[]}
            favoritar={() => {}}
            adicionarAoCarrinho={handleAdicionarAoCarrinho}
          />
        )}
      </div>
    </>
  )
}

export default App
