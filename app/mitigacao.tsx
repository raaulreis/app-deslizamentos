import { Text, View } from 'react-native';

export default function Mitigacao() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Ações de Mitigação:</Text>
      <Text>- Alerta á Defesa Civil.</Text>
      <Text>- Evacuação preventiva de áreas críticas.</Text>
      <Text>- Comunicação com moradores via SMS.</Text>
      <Text>- Vistorias e análises técnicas em campo.</Text>
    </View>
  );
}