import Header from "./components/Header";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
})
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <h2>Hello react</h2>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
