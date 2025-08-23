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
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        );

        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/latest/hand_landmarker.task`,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        });

        setHandLandmarker(landmarker);
        console.log('HandLandmarker inicializado com sucesso!');
      } catch (e) {
        console.error('Erro ao inicializar o HandLandmarker:', e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    initializeHandLandmarker();

    return () => {
      handLandmarker?.close();
    };
  }, []);

  // --- MODIFICAÇÃO AQUI ---
  const recognizeGesture = (landmarks) => {
    if (!landmarks || landmarks.length === 0) {
      return '';
    }

    const hand = landmarks[0]; // Estamos tratando apenas uma mão

    // Lógica para "Polegar para Cima" (👍)
    const isThumbsUp =
      hand[4].y < hand[3].y && hand[4].y < hand[2].y && // Ponta do polegar acima das juntas
      hand[8].y > hand[6].y &&   // Indicador dobrado
      hand[12].y > hand[10].y && // Dedo médio dobrado
      hand[16].y > hand[14].y && // Anelar dobrado
      hand[20].y > hand[18].y;   // Mínimo dobrado

    if (isThumbsUp) {
      return 'Polegar para Cima 👍';
    }

    // Lógica para "Mão Aberta" (✋)
    const isOpenHand =
      hand[4].x < hand[5].x && // Polegar aberto (considerando mão direita)
      hand[8].y < hand[6].y &&   // Indicador esticado
      hand[12].y < hand[10].y && // Dedo médio esticado
      hand[16].y < hand[14].y && // Anelar esticado
      hand[20].y < hand[18].y;   // Mínimo esticado

    if (isOpenHand) {
      return 'Mão Aberta ✋';
    }

    return ''; // Nenhum gesto conhecido
  };
  // --- FIM DA MODIFICAÇÃO ---

  const stopPrediction = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      setDetectedGesture(''); // Limpa o gesto ao parar
    }
  }, []);

  const predictWebcam = useCallback((video) => {
    if (!handLandmarker || !video) return;

    const animate = () => {
      if (video.currentTime > 0) {
        const startTimeMs = performance.now();
        const results = handLandmarker.detectForVideo(video, startTimeMs);

        // --- MODIFICAÇÃO AQUI ---
        if (results.landmarks && results.landmarks.length > 0) {
          const gesture = recognizeGesture(results.landmarks);
          setDetectedGesture(gesture);
        } else {
          setDetectedGesture(''); // Limpa se nenhuma mão for detectada
        }
        // --- FIM DA MODIFICAÇÃO ---
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
  }, [handLandmarker]);

  return { detectedGesture, loading, error, predictWebcam, stopPrediction };
};