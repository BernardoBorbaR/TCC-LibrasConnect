import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Camera, Volume2, Trash2, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
// --- MODIFICAÇÃO AQUI ---
import { useHandGestureRecognition } from '@/hooks/useHandGestureRecognition'
// --- FIM DA MODIFICAÇÃO ---

const RealTimeTranslator = () => {
  const [isDetecting, setIsDetecting] = useState(false)
  // --- MODIFICAÇÃO AQUI ---
  // O estado do texto agora será controlado pelo hook, mas mantemos um estado local para a UI
  const [translatedText, setTranslatedText] = useState('Aponte a câmera para sua mão para começar.')
  // --- FIM DA MODIFICAÇÃO ---
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  // --- MODIFICAÇÃO AQUI ---
  // Usando o hook e desestruturando seus retornos
  const { detectedGesture, loading, error, predictWebcam, stopPrediction } = useHandGestureRecognition();
  // --- FIM DA MODIFICAÇÃO ---

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
        // Inicia a predição assim que a câmera estiver pronta
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
    stopPrediction(); // Para o loop de detecção
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsCameraActive(false)
      setIsDetecting(false)
    }
  }

  // --- MODIFICAÇÃO AQUI ---
  // Simplificando a função startDetection
  const handleDetectionClick = () => {
    if (isDetecting) {
      stopCamera();
    } else {
      setIsDetecting(true);
      startCamera();
    }
  }
  // --- FIM DA MODIFICAÇÃO ---

  const clearText = () => {
    setTranslatedText('Aponte a câmera para sua mão para começar.')
  }

  const speakText = () => {
    const textToSpeak = translatedText.replace(/👍|✋/g, '').trim(); // Remove emojis para a fala
    if ('speechSynthesis' in window && textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.lang = 'pt-BR'
      speechSynthesis.speak(utterance)
    }
  }

  // --- MODIFICAÇÃO AQUI ---
  // Efeito para atualizar o texto da UI com base no gesto detectado
  useEffect(() => {
    if (isDetecting) {
      if (detectedGesture) {
        setTranslatedText(detectedGesture);
      } else {
        setTranslatedText('...'); // Feedback visual de que a detecção está ativa
      }
    } else {
      setTranslatedText('Aponte a câmera para sua mão para começar.');
    }
  }, [detectedGesture, isDetecting]);
  // --- FIM DA MODIFICAÇÃO ---

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
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1">Tradutor em Tempo Real</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Câmera Frontal</h2>
            
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

            {/* --- MODIFICAÇÃO AQUI --- */}
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
            {/* --- FIM DA MODIFICAÇÃO --- */}
          </div>

          {/* Translation Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Texto Traduzido</h2>
            
            <div className="bg-muted rounded-lg p-4 min-h-32 mb-4">
              <p className="text-muted-foreground">{translatedText}</p>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={clearText}
                variant="outline"
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
              <Button 
                onClick={speakText}
                variant="outline"
                className="flex-1"
                disabled={!translatedText || translatedText.startsWith('Aponte') || translatedText === '...'}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Falar Texto
              </Button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Como usar:</h3>
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