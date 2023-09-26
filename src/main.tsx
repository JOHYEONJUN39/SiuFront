import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './store/'
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from 'react-query'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
)
