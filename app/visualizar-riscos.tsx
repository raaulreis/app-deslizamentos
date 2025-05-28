import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VisualizarRiscos() {
  const [alert, setAlert] = useState('Carregando...');

  useEffect(() => {
    const avaliarRisco = async () => {
      try {
        const data = await AsyncStorage.getItem('monitoramento');
        if (!data) {
          setAlert('Sem dados disponíveis.');
          return;
        }

        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          setAlert('Sem dados armazenados.');
          return;
        }

        const ultimo = parsed[parsed.length - 1];
        if (!ultimo || typeof ultimo.humidity !== 'number' || typeof ultimo.inclination !== 'number') {
          setAlert('Dados inválidos.');
          return;
        }

        const risco = ultimo.humidity > 80 && ultimo.inclination > 30;
        setAlert(risco ? '⚠️ Risco alto de deslizamento!' : 'Sem risco detectado.');
      } catch (e) {
        setAlert('Erro ao avaliar risco.');
        console.error(e);
      }
    };

    avaliarRisco();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>{alert}</Text>
    </View>
  );
}
