import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import RealTimeTranslator from './components/RealTimeTranslator'
import LibrasDictionary from './components/LibrasDictionary'
import Settings from './components/Settings'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [largeText, setLargeText] = useState(false)

  return (
    <Router>
      {/* --- MODIFICAÇÃO AQUI --- */}
      {/* Trocamos 'bg-gray-50' por 'bg-background' para que o tema funcione */}
      <div
        className={`min-h-screen bg-background ${darkMode ? 'dark' : ''} ${
          largeText ? 'large-text' : ''
        }`}
      >
      {/* --- FIM DA MODIFICAÇÃO --- */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/translator" element={<RealTimeTranslator />} />
          <Route path="/dictionary" element={<LibrasDictionary />} />
          <Route
            path="/settings"
            element={
              <Settings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                largeText={largeText}
                setLargeText={setLargeText}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App