import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";


export default function TabTwoScreen() {

  const color = Colors.colors;
  const [isVisible, setIsVisible] = useState(false);
  const [template, setTemplate] = useState();

  const formulas = () =>
  (
    <View>
      <Text style={styles.modalTitle}>Fórmulas</Text>
      <Text style={styles.modalText}>A fórmala utilizada para calcular a média final é: </Text>
      <Text style={[styles.modalText, {color: color.red, fontWeight: 'bold'}]}>P1 * 0,4 + P2 * 0,6</Text>
      <Text style={styles.modalText}>Caso a média final seja maior ou igual a cinco então o aluno está aprovado. Mas caso o contrário será necessária realizar a P3, sendo que a nota dessa irá
        substituir a nota da P1 ou da P2 de acordo com a maior média possível resultante.
      </Text>
      <Text style={styles.modalText}>A fórmula para o cálculo da nota da P3 é:</Text>
      <Text style={[styles.modalText, {color: color.red, fontWeight: 'bold'}]}>P1 * 0,4 + P3 * 0,6</Text>
      <Text style={styles.modalText}>ou</Text>
      <Text style={[styles.modalText, {color: color.red, fontWeight: 'bold'}]}>P3 * 0,4 + P2 * 0,6</Text>
      <Text style={styles.modalText}>Caso, mesmo após a realização da P3 a média final permeneça abaixo de cinco então o aluno é reprovado na matéria.</Text>
    </View>
  )

  const mencoes = () =>
  (
    <View>
      <Text style={styles.modalTitle}>Menções</Text>
      <Text style={styles.modalText}>Lista com todas a menções possíveis e suas notas equvalentes: </Text>
      <Text style={styles.modalText}>SS - Superior: 9 a 10</Text>
      <Text style={styles.modalText}>MS - Médio Superior: 7 a 8,9</Text>
      <Text style={styles.modalText}>MM - Médio: 5 a 6,9</Text>
      <Text style={styles.modalText}>MI - Médio Inferior: 3 a 4,9</Text>
      <Text style={styles.modalText}>II - Inferior : 0,1 a 2,9</Text>
      <Text style={styles.modalText}>SR - Sem Rendimento: 0</Text>
      <Text style={styles.modalText}>Caso o aluno tenha obtido a menção SS, MS ou MM significa que este foi aprovado na matéria. Caso contrário o aluno está de P3 ou reprovado.</Text>
    </View>
  )

  const calculos = () =>
  (
    <View>
    <Text style={styles.modalTitle}>Cálculos</Text>
    <Text style={styles.modalText}>A seguir estão listados as possibilidades de cálculos na calculadora de notas.</Text>
    <Text style={styles.modalText}>1. Apenas P1 preenchida: Calcula a nota mínima necessária para passar na P2 com MM.</Text>
    <Text style={styles.modalText}>2. P1 e P2 ou só P2 preechidas: exibe a média final e a menção obtida, caso a média final seja menor que cinco então a nota necessária para passar na P3
    com menção MM é calculada.</Text>
    <Text style={styles.modalText}>3. P1,P2 e P3 preenchidas: calcula a média e menção final.</Text>
    </View>
  )


  const options =
  [
    {
      id:0,
      name: "Fórmulas",
      template: formulas
    },
    {
      id:1,
      name: "Menções",
      template: mencoes
    },
    {
      id:2,
      name: "Cálculos",
      template: calculos
    }
  ];

  const handlerTemplate = (template) =>
  {
    setIsVisible(true);
    setTemplate(template);
  }

  const card = ({item}) =>
  (
    <TouchableOpacity style={{flexDirection: 'row', backgroundColor: color.white, width: '90%', height: 80, justifyContent: 'flex-start', alignItems: 'center',
    margin:5, borderRadius: 10, alignSelf: 'center', paddingLeft: 10}} onPress={() => handlerTemplate(item.template)}>
      <Ionicons name="md-help-outline" size={30} color={color.red} />
      <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 15, width: '70%'}}>{item.name}</Text>
      <View style={{width: '15%', alignItems: 'flex-end'}}>
        <Ionicons name="md-chevron-forward" size={24} color={color.red} />
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Modal visible={isVisible} animationType="slide">
        <TouchableOpacity onPress={() => setIsVisible(false)} style={{alignItems: 'flex-end', paddingRight: 5, width: '100%', height: '8%'}}>
          <Ionicons name="md-close-circle" size={40} color={color.gray} />
        </TouchableOpacity>
        {template}
      </Modal>
      <Text style={styles.title}> Qual é sua dúvida?</Text>
      <FlatList
      style={{width: '100%'}}
      data={options}
      renderItem={card}
      keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: 'left',
    width: '90%',
  },
  modalTitle:
  {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  modalText:
  {
    fontSize:16, 
    textAlign: 'center',
    marginBottom: 10,
    maxWidth: '98%',
    alignSelf: 'center'
  }
});
