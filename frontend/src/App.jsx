import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <BrowserRouter>
      {/* <div className='w-[100vw] h-[100vh] bg-gray-100 p-5'>
        <Seller />
      </div> */}
      {/* <h1>I am the react router</h1>
      <Link to='/chat'>Chat</Link>
      <Link to='/seller'>seller</Link> */}
      {/* <Routes>
        <Route path="chat" element={<Chat />} />
        <Route path="seller/*" element={<Seller />} />
      </Routes> */}
      <AppRoutes/>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App
