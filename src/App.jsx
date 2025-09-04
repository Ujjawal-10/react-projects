import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./pages/Home"

function App() {

  return (
    <>
    <QueryClientProvider client={new QueryClient}>
      <Home/>   
    </QueryClientProvider>
    </>
  )
}

export default App
