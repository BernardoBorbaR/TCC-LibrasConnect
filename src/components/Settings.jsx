import { useState, useEffect } from 'react' // Adicionado useEffect
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Settings = ({ darkMode, setDarkMode, largeText, setLargeText, highContrast, setHighContrast }) => {
  // --- MODIFICAÇÃO AQUI: ESTADO LOCAL PARA MUDANÇAS PENDENTES ---
  // Criamos um estado local para cada configuração. Eles são inicializados com os valores
  // do estado global (que vêm via props).
  const [localDarkMode, setLocalDarkMode] = useState(darkMode)
  const [localLargeText, setLocalLargeText] = useState(largeText)
  const [localHighContrast, setLocalHighContrast] = useState(highContrast)
  const [localGestureSize, setLocalGestureSize] = useState([50])
  const [localCameraQuality, setLocalCameraQuality] = useState('high')

  // Este efeito garante que se as props mudarem, o estado local seja atualizado.
  // Útil para manter a consistência.
  useEffect(() => {
    setLocalDarkMode(darkMode)
    setLocalLargeText(largeText)
    setLocalHighContrast(highContrast)
  }, [darkMode, largeText, highContrast])
  // --- FIM DA MODIFICAÇÃO ---

  const saveSettings = () => {
    // --- MODIFICAÇÃO AQUI: APLICAR AS MUDANÇAS ---
    // Agora, o botão "Salvar" pega os valores do estado local e os envia
    // para o estado global em App.jsx, aplicando as mudanças em todo o site.
    setDarkMode(localDarkMode)
    setLargeText(localLargeText)
    setHighContrast(localHighContrast)
    // (As outras configurações como gestureSize e cameraQuality já eram locais,
    // mas poderiam ser salvas em localStorage aqui no futuro)
    alert('Configurações salvas e aplicadas com sucesso!')
  }

  const resetSettings = () => {
    // --- MODIFICAÇÃO AQUI: RESETAR O ESTADO LOCAL ---
    // O reset agora afeta apenas o estado local. O usuário ainda precisa
    // clicar em "Salvar" para que os padrões sejam aplicados globalmente.
    setLocalDarkMode(false)
    setLocalLargeText(false)
    setLocalHighContrast(false)
    setLocalGestureSize([50])
    setLocalCameraQuality('high')
    alert('Configurações restauradas para o padrão. Clique em "Salvar" para aplicar.')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1 text-foreground">Configurações de Acessibilidade</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Visual Accessibility */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 mr-3 text-foreground" />
              <h2 className="text-xl font-semibold text-card-foreground">Acessibilidade Visual</h2>
            </div>

            <div className="space-y-6">
              {/* --- MODIFICAÇÃO AQUI: USAR ESTADO LOCAL NOS CONTROLES --- */}
              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-card-foreground">Modo Escuro</h3>
                  <p className="text-sm text-muted-foreground">Reduz o brilho da tela para ambientes escuros</p>
                </div>
                <Switch
                  checked={localDarkMode}
                  onCheckedChange={setLocalDarkMode}
                />
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-card-foreground">Alto Contraste</h3>
                  <p className="text-sm text-muted-foreground">Aumenta o contraste para melhor visibilidade</p>
                </div>
                <Switch
                  checked={localHighContrast}
                  onCheckedChange={setLocalHighContrast}
                />
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-card-foreground">Texto Grande</h3>
                  <p className="text-sm text-muted-foreground">Aumenta o tamanho dos textos</p>
                </div>
                <Switch
                  checked={localLargeText}
                  onCheckedChange={setLocalLargeText}
                />
              </div>

              {/* Gesture Size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-card-foreground">Tamanho dos Gestos: {localGestureSize[0]}%</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Ajusta o tamanho da área de detecção de gestos</p>
                <Slider
                  value={localGestureSize}
                  onValueChange={setLocalGestureSize}
                  max={100}
                  min={25}
                  step={5}
                  className="w-full"
                />
              </div>
              {/* --- FIM DA MODIFICAÇÃO --- */}
            </div>
          </div>
        </div>

        {/* Camera Settings */}
        <div className="mt-8 bg-card rounded-lg border border-border p-6">
          <div className="flex items-center mb-6">
            <Camera className="w-6 h-6 mr-3 text-foreground" />
            <h2 className="text-xl font-semibold text-card-foreground">Configurações da Câmera</h2>
          </div>

          <div className="max-w-md">
            <div className="mb-4">
              <h3 className="font-medium mb-2 text-card-foreground">Qualidade da Câmera</h3>
              {/* --- MODIFICAÇÃO AQUI: USAR ESTADO LOCAL --- */}
              <Select value={localCameraQuality} onValueChange={setLocalCameraQuality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Alta (1080p) - Melhor qualidade</SelectItem>
                  <SelectItem value="medium">Média (720p) - Balanceado</SelectItem>
                  <SelectItem value="low">Baixa (480p) - Melhor performance</SelectItem>
                </SelectContent>
              </Select>
              {/* --- FIM DA MODIFICAÇÃO --- */}
              <p className="text-sm text-muted-foreground mt-1">
                Qualidade mais baixa melhora a performance
              </p>
            </div>
          </div>
        </div>

        {/* Save Settings */}
        <div className="mt-8 bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">Salvar Alterações</h3>
          <p className="text-muted-foreground mb-4">
            Suas alterações não serão aplicadas até que você clique em salvar.
          </p>
          
          <div className="flex gap-4">
            <Button onClick={saveSettings}>
              Salvar Configurações
            </Button>
            <Button onClick={resetSettings} variant="outline">
              Restaurar Padrões
            </Button>
          </div>
        </div>

        {/* Accessibility Tip */}
        <div className="mt-8 bg-accent border border-border rounded-lg p-6">
          <h3 className="font-semibold text-accent-foreground mb-2">Dica de Acessibilidade</h3>
          <p className="text-accent-foreground/80">
            Para uma melhor experiência, use fones de ouvido em ambientes barulhentos e 
            certifique-se de que há boa iluminação para a detecção de gestos.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Settings