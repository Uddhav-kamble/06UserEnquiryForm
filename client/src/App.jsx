import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Enquiry from './Enquiry/Enquiry';

import 'sweetalert2/src/sweetalert2.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Enquiry></Enquiry>
    </>
  )
}

export default App
