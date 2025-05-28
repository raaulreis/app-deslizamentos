import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Historico() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('monitoramento');
      try {
        const parsed = result ? JSON.parse(result) : [];
        if (Array.isArray(parsed)) {
          setData(parsed);
        } else {
          setData([parsed]); // caso seja um objeto único
        }
      } catch (e) {
        console.error("Erro ao carregar histórico:", e);
        setData([]);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Histórico de Monitoramento:</Text>
      {data.map((item, index) => (
        <Text key={index}>
          {item.date?.split('T')[0]} - Umidade: {item.humidity}% | Inclinação: {item.inclination}°
        </Text>
      ))}
    </ScrollView>
  );
}
