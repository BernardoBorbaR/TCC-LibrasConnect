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
        // --- MODIFICAÇÃO AQUI ---
        // Atualizando para a versão mais recente e estável da CDN
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );
        // --- FIM DA MODIFICAÇÃO ---

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
        // --- MODIFICAÇÃO AQUI ---
        // Logando o erro completo para uma depuração mais eficaz
        console.error('Erro detalhado ao inicializar o HandLandmarker:', e);
        // --- FIM DA MODIFICAÇÃO ---
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

  const recognizeGesture = (landmarks) => {
    if (!landmarks || landmarks.length === 0) {
      return '';
    }

    const hand = landmarks[0];

    const isThumbsUp =
      hand[4].y < hand[3].y && hand[4].y < hand[2].y &&
      hand[8].y > hand[6].y &&
      hand[12].y > hand[10].y &&
      hand[16].y > hand[14].y &&
      hand[20].y > hand[18].y;

    if (isThumbsUp) {
      return 'Polegar para Cima 👍';
    }

    const isOpenHand =
      hand[4].x < hand[5].x &&
      hand[8].y < hand[6].y &&
      hand[12].y < hand[10].y &&
      hand[16].y < hand[14].y &&
      hand[20].y < hand[18].y;

    if (isOpenHand) {
      return 'Mão Aberta ✋';
    }

    return '';
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
      if (video.currentTime > 0) {
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