import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import { ThemeProvider } from './context/ThemeContext'
import { SmoothScroll } from './components/SmoothScroll'

function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </Router>
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App
