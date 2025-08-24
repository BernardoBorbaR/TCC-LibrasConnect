import { useState, useEffect, useRef, useCallback } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export const useHandGestureRecognition = () => {
  const [handLandmarker, setHandLandmarker] = useState(null);
  const [detectedGesture, setDetectedGesture] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestRef = useRef();

  useEffect(() => {
    const initializeHandLandmarker = async () => {
      try {
        // --- MUDANÇA CHAVE 1: Usar a versão mais recente e estável ---
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );

        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            // --- MUDANÇA CHAVE 2: Usar um caminho de modelo versionado e estável ---
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: 'CPU',
          },
          runningMode: 'VIDEO',
          numHands: 1, // Detectar apenas uma mão para melhor performance
        });

        setHandLandmarker(landmarker);
        console.log('HandLandmarker inicializado com sucesso!');
      } catch (e) {
        console.error('Erro detalhado ao inicializar o HandLandmarker:', e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    initializeHandLandmarker();

    // Função de limpeza para fechar o landmarker quando o componente for desmontado
    return () => {
      handLandmarker?.close();
    };
  }, []); // O array de dependências vazio garante que isso rode apenas uma vez

  // A lógica de reconhecimento de gestos (pode ser substituída por um modelo de IA no futuro)
  const recognizeGesture = (landmarks) => {
    if (!landmarks || landmarks.length === 0) {
      return '';
    }
    const hand = landmarks[0];

    // Lógica para "Polegar para Cima"
    const isThumbsUp =
      hand[4].y < hand[3].y && hand[4].y < hand[2].y && // Polegar para cima
      hand[8].y > hand[6].y && // Indicador dobrado
      hand[12].y > hand[10].y && // Médio dobrado
      hand[16].y > hand[14].y && // Anelar dobrado
      hand[20].y > hand[18].y; // Mínimo dobrado
    if (isThumbsUp) return 'Polegar para Cima 👍';

    // Lógica para "Mão Aberta"
    const isOpenHand =
      hand[4].x < hand[5].x && // Polegar afastado (para mão direita)
      hand[8].y < hand[6].y && // Indicador esticado
      hand[12].y < hand[10].y && // Médio esticado
      hand[16].y < hand[14].y && // Anelar esticado
      hand[20].y < hand[18].y; // Mínimo esticado
    if (isOpenHand) return 'Mão Aberta ✋';

    return ''; // Nenhum gesto conhecido
  };

  const stopPrediction = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      setDetectedGesture('');
    }
  }, []);

  const predictWebcam = useCallback((video) => {
    if (!handLandmarker || !video) return;

    const animate = () => {
      if (video.readyState >= 2) { // Garante que o vídeo tem dados para exibir
        const startTimeMs = performance.now();
        const results = handLandmarker.detectForVideo(video, startTimeMs);

        if (results.landmarks && results.landmarks.length > 0) {
          const gesture = recognizeGesture(results.landmarks);
          setDetectedGesture(gesture);
        } else {
          setDetectedGesture('');
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
  }, [handLandmarker]);

  return { detectedGesture, loading, error, predictWebcam, stopPrediction };
};