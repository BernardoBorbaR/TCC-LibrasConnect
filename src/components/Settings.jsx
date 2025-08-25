import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react' // Mantemos o useState para configurações locais

// --- MODIFICAÇÃO PRINCIPAL ---
// O componente agora recebe e usa diretamente as props do App.jsx
// para controlar o estado global.
const Settings = ({ darkMode, setDarkMode, largeText, setLargeText, highContrast, setHighContrast }) => {
  // Mantemos o estado local APENAS para configurações que não afetam o app inteiro,
  // como tamanho do gesto e qualidade da câmera.
  const [gestureSize, setGestureSize] = useState([50])
  const [cameraQuality, setCameraQuality] = useState('high')

  // A função de reset agora chama diretamente os setters globais e locais.
  const resetSettings = () => {
    setDarkMode(false)
    setLargeText(false)
    setHighContrast(false)
    setGestureSize([50])
    setCameraQuality('high')
    alert('Configurações restauradas para o padrão.')
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
              {/* --- MODIFICAÇÃO: CONTROLES LIGADOS DIRETAMENTE ÀS PROPS --- */}
              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-card-foreground">Modo Escuro</h3>
                  <p className="text-sm text-muted-foreground">Reduz o brilho da tela para ambientes escuros</p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode} // Aplica a mudança imediatamente
                />
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-card-foreground">Alto Contraste</h3>
                  <p className="text-sm text-muted-foreground">Aumenta o contraste para melhor visibilidade</p>
                </div>
                <Switch
                  checked={highContrast}
                  onCheckedChange={setHighContrast} // Aplica a mudança imediatamente
                />
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-card-foreground">Texto Grande</h3>
                  <p className="text-sm text-muted-foreground">Aumenta o tamanho dos textos</p>
                </div>
                <Switch
                  checked={largeText}
                  onCheckedChange={setLargeText} // Aplica a mudança imediatamente
                />
              </div>

              {/* Gesture Size (continua local) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-card-foreground">Tamanho dos Gestos: {gestureSize[0]}%</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Ajusta o tamanho da área de detecção de gestos</p>
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
              <p className="text-sm text-muted-foreground mt-1">
                Qualidade mais baixa melhora a performance
              </p>
            </div>
          </div>
        </div>

        {/* --- MODIFICAÇÃO: REMOÇÃO DA SEÇÃO DE SALVAR --- */}
        {/* A seção inteira de "Salvar Alterações" foi removida. */}
        {/* Adicionamos o botão de restaurar aqui em um local mais simples. */}
        <div className="mt-8 flex items-center gap-4">
          <Button onClick={resetSettings} variant="outline">
            Restaurar Padrões
          </Button>
          <p className="text-sm text-muted-foreground">
            Restaura todas as configurações para os valores iniciais.
          </p>
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