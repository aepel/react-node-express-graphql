import './App.css'
import Form from './Form'
import { ApolloClient, InMemoryCache } from '@apollo/client'

import { ApolloProvider } from '@apollo/react-hooks'
import Skeleton from './Skeleton'
import BookList from './BookList'
const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'http://localhost:3100/graphql',
  cache,
  fetchOptions: {
    mode: 'no-cors',
  },
})

function App() {
  const onSubmit = values => console.log(values)
  return (
    <ApolloProvider client={client}>
      <Skeleton>
        <BookList></BookList>
        {/* <Form name="" author="" year="" isbn="" publisher="" onHandleSubmit={onSubmit} /> */}
      </Skeleton>
    </ApolloProvider>
  )
}

export default App
