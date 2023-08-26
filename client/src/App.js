import React from 'react'
import Navbar from './components/Navbar'
import Abstract from './pages/Abstract'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className='container main'>
        <Abstract />
      </div>
      <Footer />
    </div>
  )
}

export default App