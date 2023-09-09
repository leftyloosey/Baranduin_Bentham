import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Clients from './components/Clients'
import Projects from './components/Projects'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import AddClientModal from './components/AddClientModal'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='container'>
            <Projects />
            <AddClientModal />
            <Clients />
          </div>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App
