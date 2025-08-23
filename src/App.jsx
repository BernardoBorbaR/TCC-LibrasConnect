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
  // --- MODIFICAÇÃO AQUI ---
  const [highContrast, setHighContrast] = useState(false)
  // --- FIM DA MODIFICAÇÃO ---

  return (
    <Router>
      {/* --- MODIFICAÇÃO AQUI --- */}
      {/* Adicionamos a classe highContrast dinamicamente */}
      <div
        className={`min-h-screen bg-background ${darkMode ? 'dark' : ''} ${
          largeText ? 'large-text' : ''
        } ${highContrast ? 'high-contrast' : ''}`}
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
                // --- MODIFICAÇÃO AQUI ---
                highContrast={highContrast}
                setHighContrast={setHighContrast}
                // --- FIM DA MODIFICAÇÃO ---
              />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App