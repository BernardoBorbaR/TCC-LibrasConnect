import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Camera, Volume2, Trash2, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useHandGestureRecognition } from '@/hooks/useHandGestureRecognition'

const RealTimeTranslator = () => {
  const [isDetecting, setIsDetecting] = useState(false)
  const [translatedText, setTranslatedText] = useState('Aponte a câmera para sua mão para começar.')
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const { detectedGesture, loading, error, predictWebcam, stopPrediction } = useHandGestureRecognition();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
        videoRef.current.onloadedmetadata = () => {
          predictWebcam(videoRef.current);
        };
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error)
      alert('Não foi possível acessar a câmera. Verifique as permissões.')
    }
  }

  const stopCamera = () => {
    stopPrediction();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsCameraActive(false)
      setIsDetecting(false)
    }
  }

  const handleDetectionClick = () => {
    if (isDetecting) {
      stopCamera();
    } else {
      setIsDetecting(true);
      startCamera();
    }
  }

  const clearText = () => {
    setTranslatedText('Aponte a câmera para sua mão para começar.')
  }

  const speakText = () => {
    const textToSpeak = translatedText.replace(/👍|✋/g, '').trim();
    if ('speechSynthesis' in window && textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.lang = 'pt-BR'
      speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    if (isDetecting) {
      if (detectedGesture) {
        setTranslatedText(detectedGesture);
      } else {
        setTranslatedText('...');
      }
    } else {
      setTranslatedText('Aponte a câmera para sua mão para começar.');
    }
  }, [detectedGesture, isDetecting]);

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center text-foreground hover:text-foreground/80">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1 text-foreground">Tradutor em Tempo Real</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Câmera Frontal</h2>
            
            <div className="relative bg-black rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
              {!isCameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <Camera className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            <Button 
              onClick={handleDetectionClick}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Camera className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Carregando IA...' : (isDetecting ? 'Parar Detecção' : 'Iniciar Detecção')}
            </Button>
            {error && <p className="text-destructive text-sm mt-2">Erro ao carregar modelo de IA.</p>}
          </div>

          {/* Translation Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Texto Traduzido</h2>
            
            <div className="bg-muted rounded-lg p-4 min-h-32 mb-4">
              <p className="text-muted-foreground">{translatedText}</p>
            </div>

            {/* --- MODIFICAÇÃO AQUI --- */}
            <div className="flex gap-2">
              <Button 
                onClick={clearText}
                variant="outline"
                className="flex-1 text-foreground"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
              <Button 
                onClick={speakText}
                variant="outline"
                className="flex-1 text-foreground"
                disabled={!translatedText || translatedText.startsWith('Aponte') || translatedText === '...'}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Falar Texto
              </Button>
            </div>
            {/* --- FIM DA MODIFICAÇÃO --- */}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">Como usar:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Clique em "Iniciar Detecção" para ligar a câmera e começar o reconhecimento.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Posicione-se de frente para a câmera com boa iluminação.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Faça os sinais de libras de forma clara e pausada.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              O texto traduzido aparecerá em tempo real na tela.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Use "Falar Texto" para reproduzir o áudio da tradução.
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default RealTimeTranslator