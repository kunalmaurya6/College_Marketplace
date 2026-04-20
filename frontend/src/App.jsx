import logo from './assets/logo.png'
import Seller from './components/seller/Seller'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Chat from './components/chat/Chat'
function App() {

  return (
    <BrowserRouter>
      {/* <div className='w-[100vw] h-[100vh] bg-gray-100 p-5'>
        <Seller />
      </div> */}
      <h1>I am the react router</h1>
      <Link to='/chat'>Chat</Link>
      <Routes>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
