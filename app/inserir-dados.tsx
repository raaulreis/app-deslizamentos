import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function InserirDados() {
  const [humidity, setHumidity] = useState('');
  const [inclination, setInclination] = useState('');

  const salvarDados = async () => {
    if (!humidity || !inclination) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const parsedHumidity = parseFloat(humidity);
    const parsedInclination = parseFloat(inclination);

    if (isNaN(parsedHumidity) || isNaN(parsedInclination)) {
      Alert.alert('Erro', 'Insira valores numéricos válidos.');
      return;
    }

    const newData = {
      date: new Date().toISOString(),
      humidity: parsedHumidity,
      inclination: parsedInclination,
    };

    try {
      const existing = await AsyncStorage.getItem('monitoramento');
      let parsed = [];

      if (existing) {
        const parsedData = JSON.parse(existing);
        parsed = Array.isArray(parsedData) ? parsedData : [parsedData];
      }

      parsed.push(newData);
      await AsyncStorage.setItem('monitoramento', JSON.stringify(parsed));

      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      setHumidity('');
      setInclination('');
    } catch (e) {
      console.error('Erro ao salvar dados:', e);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Umidade do Solo (%):</Text>
      <TextInput
        value={humidity}
        onChangeText={setHumidity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Inclinação (°):</Text>
      <TextInput
        value={inclination}
        onChangeText={setInclination}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Salvar Dados" onPress={salvarDados} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});
