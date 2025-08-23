import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, Volume2, Camera, Vibrate } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// --- MODIFICAÇÃO AQUI ---
// Recebendo as novas props highContrast e setHighContrast
const Settings = ({ darkMode, setDarkMode, largeText, setLargeText, highContrast, setHighContrast }) => {
  // Removendo o useState local para highContrast
  // --- FIM DA MODIFICAÇÃO ---
  const [gestureSize, setGestureSize] = useState([50])
  const [audioFeedback, setAudioFeedback] = useState(true)
  const [vibration, setVibration] = useState(true)
  const [cameraQuality, setCameraQuality] = useState('high')

  const testVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200)
    }
  }

  const saveSettings = () => {
    alert('Configurações salvas com sucesso!')
  }

  const resetSettings = () => {
    setDarkMode(false)
    setLargeText(false)
    // --- MODIFICAÇÃO AQUI ---
    // Resetando o estado global de alto contraste
    setHighContrast(false)
    // --- FIM DA MODIFICAÇÃO ---
    setGestureSize([50])
    setAudioFeedback(true)
    setVibration(true)
    setCameraQuality('high')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1">Configurações de Acessibilidade</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visual Accessibility */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 mr-3 text-slate-700" />
              <h2 className="text-xl font-semibold">Acessibilidade Visual</h2>
            </div>

            <div className="space-y-6">
              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Modo Escuro</h3>
                  <p className="text-sm text-gray-600">Reduz o brilho da tela para ambientes escuros</p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Alto Contraste</h3>
                  <p className="text-sm text-gray-600">Aumenta o contraste para melhor visibilidade</p>
                </div>
                {/* --- MODIFICAÇÃO AQUI --- */}
                {/* Este Switch agora controla o estado que vem de App.jsx */}
                <Switch
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
                {/* --- FIM DA MODIFICAÇÃO --- */}
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Texto Grande</h3>
                  <p className="text-sm text-gray-600">Aumenta o tamanho dos textos</p>
                </div>
                <Switch
                  checked={largeText}
                  onCheckedChange={setLargeText}
                />
              </div>

              {/* Gesture Size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Tamanho dos Gestos: {gestureSize[0]}%</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Ajusta o tamanho da área de detecção de gestos</p>
                <Slider
                  value={gestureSize}
                  onValueChange={setGestureSize}
                  max={100}
                  min={25}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Volume2 className="w-6 h-6 mr-3 text-slate-700" />
              <h2 className="text-xl font-semibold">Configurações de Áudio</h2>
            </div>

            <div className="space-y-6">
              {/* Audio Feedback */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Feedback de Áudio</h3>
                  <p className="text-sm text-gray-600">Sons de confirmação e notificações</p>
                </div>
                <Switch
                  checked={audioFeedback}
                  onCheckedChange={setAudioFeedback}
                />
              </div>

              {/* Vibration */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Vibrate className="w-4 h-4 mr-2" />
                    <h3 className="font-medium">Vibração</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={testVibration}
                      className="ml-auto"
                    >
                      Testar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">Feedback tátil em dispositivos móveis</p>
                </div>
                <Switch
                  checked={vibration}
                  onCheckedChange={setVibration}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Camera Settings */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Camera className="w-6 h-6 mr-3 text-slate-700" />
            <h2 className="text-xl font-semibold">Configurações da Câmera</h2>
          </div>

          <div className="max-w-md">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Qualidade da Câmera</h3>
              <Select value={cameraQuality} onValueChange={setCameraQuality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Alta (1080p) - Melhor qualidade</SelectItem>
                  <SelectItem value="medium">Média (720p) - Balanceado</SelectItem>
                  <SelectItem value="low">Baixa (480p) - Melhor performance</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600 mt-1">
                Qualidade mais baixa melhora a performance
              </p>
            </div>
          </div>
        </div>

        {/* Save Settings */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Configurações Salvas</h3>
          <p className="text-gray-600 mb-4">
            Suas preferências são salvas automaticamente em cookies
          </p>
          
          <div className="flex gap-4">
            <Button onClick={saveSettings} className="bg-slate-800 hover:bg-slate-700">
              Salvar Configurações
            </Button>
            <Button onClick={resetSettings} variant="outline">
              Restaurar Padrões
            </Button>
          </div>
        </div>

        {/* Accessibility Tip */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Dica de Acessibilidade</h3>
          <p className="text-blue-800">
            Para uma melhor experiência, use fones de ouvido em ambientes barulhentos e 
            certifique-se de que há boa iluminação para a detecção de gestos.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Settings