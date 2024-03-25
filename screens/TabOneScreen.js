import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import Colors from "../constants/Colors";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


export default function TabOneScreen() {

  const [p1, setP1] = useState();
  const [p2, setP2] = useState();
  const [p3, setP3] = useState();
  const [modalData, setModalData] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);

  const handlerP1 = (nota) =>
  {
    if(nota <= 10)
    {
      setP1(nota);
    }
  }

  const handlerP2 = (nota) =>
  {
    if(nota <= 10)
    {
      setP2(nota);
    }
  }

  const handlerP3 = (nota) =>
  {
    if(nota <= 10)
    {
      setP3(nota);
    }
  }

  const calculaMencao = (nota) =>
  {
    if(nota >= 9)
      return {sigla:'SS', mencao: 'Superior'};
    else if(nota >= 7)
      return {sigla:'MS', mencao: 'Médio Superior'};
    else if(nota >= 5)
      return {sigla:'MM', mencao: 'Médio'};
    else if(nota >= 3)
      return {sigla:'MI', mencao: 'Médio Inferior'};
    else if(nota >=0.1)
      return {sigla:'II', mencao: 'Inferior'}
    else
      return {sigla:'SR', mencao: 'Sem rendimento'}
  }

  const exibeModal = (notaFinal, mencao, status, necessarioP3, necessarioP2) =>
  {
    setModalData(
      {
        notaFinal: notaFinal,
        mencao: mencao,
        status: status,
        necessarioP3: necessarioP3,
        necessarioP2: necessarioP2
      }
    );

    setModalVisibility(true);
  }

  const Calcular = () =>
  {
    const notaP1 = isNaN(p1)?0:parseFloat(p1);
    const notaP2 = isNaN(p2)?0:parseFloat(p2);
    const notaP3 = isNaN(p3)?0:parseFloat(p3); 
    let notaFinal, mencao, status, necessarioP3=0, necessarioP2=0;

    if(notaP1*0.4 + notaP2*0.6 >= 5)
    {
      notaFinal = notaP1*0.4 + notaP2*0.6;
      mencao = calculaMencao(notaFinal);
      status = 'Aprovado';
      necessarioP3 = 0;
    }
    else
    {
      if(notaP1 != 0 && (isNaN(p2)) || p2 == '')
      {
        necessarioP2 = (5 - 0.4*notaP1)/0.6;

        notaFinal = notaP1;
        mencao = calculaMencao(notaP1);
        status = 'Pendente';
      }

      else if(notaP1 == 0 || notaP2 == 0)
      {
        notaFinal = notaP1*0.4 + notaP2*0.6;
        mencao = calculaMencao(notaFinal);
        status = 'Reprovado';
      }

      else if(isNaN(p3) || p3 == '')
      {
        const p1p3 = (5 - 0.4*notaP1)/0.6;
        const p3p2 = (5 - 0.6*notaP2)/0.4;

        if(p1p3 <= p3p2)
        {
          necessarioP3 = p1p3;
        }
        else
        {
          necessarioP3 = p3p2;
        }

        notaFinal = notaP1*0.4 + notaP2*0.6;
        mencao = calculaMencao(notaFinal);
        status = 'Pendente';

      }
      else
      {
        notaFinal = notaP1*0.4 + notaP2*0.6;
        notaFinal >= notaP1*0.4 + notaP3*0.6 ? null : notaFinal =  notaP1*0.4 + notaP3*0.6;
        notaFinal >= notaP3*0.4 + notaP2*0.6 ? null : notaFinal =  notaP3*0.4 + notaP2*0.6;

        mencao = calculaMencao(notaFinal);
        status = notaFinal >= 5? 'Aprovado' : 'Reprovado';
      }
    }
    exibeModal(notaFinal, mencao, status, necessarioP3, necessarioP2);
  }

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={{height: '90%'}}>
        <View style={[styles.container, {marginTop: -15}]}>
          <Text style={styles.title}>Nota P1</Text>
          <TextInput style={styles.input}
          placeholder="Digite uma nota"
          onChangeText={handlerP1}
          value={p1}
          keyboardType="numeric"
          maxLength={4}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Nota P2</Text>
          <TextInput style={styles.input}
          placeholder="Digite uma nota"
          onChangeText={handlerP2}
          value={p2}
          keyboardType="numeric"
          maxLength={4}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Nota P3</Text>
          <TextInput style={styles.input}
          placeholder="Digite uma nota"
          onChangeText={handlerP3}
          value={p3}
          keyboardType="numeric"
          maxLength={4}
          />
        </View>
      </View>

      <TouchableOpacity style={{width: '90%', backgroundColor: Colors.colors.red, borderRadius: 30, height: 50, justifyContent: 'center', alignItems: 'center', 
      alignSelf: 'center'}} onPress={Calcular}>
        <Text style={{color: Colors.colors.white, fontSize: 16, fontWeight: 'bold'}}>
          Calcular
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisibility} animationType="slide">
      <TouchableOpacity onPress={() => setModalVisibility(false)} style={{alignItems: 'flex-end', paddingRight: 5, width: '100%', height: '8%'}}>
          <Ionicons name="md-close-circle" size={40} color={Colors.colors.gray} />
        </TouchableOpacity>
        <Text style={styles.titleModal}>Nota Final</Text>
        <Text style={[styles.textModal, {backgroundColor: modalData.notaFinal >= 5 ? Colors.colors.lightGreen : Colors.colors.lightRed, 
      color: modalData.notaFinal >= 5 ? Colors.colors.green : Colors.colors.red, width: '20%'}]}>
          {modalData.notaFinal != undefined ? modalData.notaFinal.toFixed(2).replace('.', ','): null}</Text>
        <Text style={styles.titleModal}>Menção</Text>
        <Text style={[styles.textModal, , {backgroundColor: modalData.notaFinal >= 5 ? Colors.colors.lightGreen : Colors.colors.lightRed, 
      color: modalData.notaFinal >= 5 ? Colors.colors.green : Colors.colors.red, minWidth: '40%'}]}>{modalData.mencao != undefined ? modalData.mencao.sigla+" - "+modalData.mencao.mencao: ""}</Text>
        <Text style={styles.titleModal}>Status</Text>
        <Text style={[styles.textModal, {
      backgroundColor: modalData.status == 'Aprovado'? Colors.colors.lightGreen :  modalData.status == 'Pendente' ?  Colors.colors.lightYellow :Colors.colors.lightRed, 
      color: modalData.status == 'Aprovado'? Colors.colors.green :  modalData.status == 'Pendente' ?  Colors.colors.yellow :Colors.colors.red
      , minWidth: '40%'
      }]}>{modalData.status}</Text>
        <Text style={[styles.titleModal, {display: modalData.necessarioP3==0? 'none':'flex'}]}>
          Necessário na P3</Text>
        <Text style={[styles.textModal, {display: modalData.necessarioP3==0? 'none':'flex', backgroundColor: Colors.colors.lightGreen, color: Colors.colors.green
        , minWidth: '20%'}]}>
          {modalData.necessarioP3 != undefined ? modalData.necessarioP3.toFixed(2).replace('.', ',') : null}</Text>
        <Text style={[styles.titleModal, , {display: modalData.necessarioP2==0? 'none':'flex'}]}>Necessário na P2</Text>
        <Text style={[styles.textModal, {display: modalData.necessarioP2==0? 'none':'flex', backgroundColor: Colors.colors.lightGreen, color: Colors.colors.green
        , minWidth: '20%'}]}>
          {modalData.necessarioP2 != undefined ? modalData.necessarioP2.toFixed(2).replace('.', ',') : null}</Text>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
    marginTop: 30,
  },
  input:{
    width: '90%',
    backgroundColor: Colors.colors.gray,
    paddingLeft: 10,
    height: 50,
    alignSelf: 'center',
    borderRadius: 30,
    textAlign: 'center'
  },
  titleModal: {
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 10,
    marginTop: 30,
    textAlign: 'center',
    width: '100%',
    marginBottom: 5
  },
  textModal:
  {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    padding: 10,
    fontWeight: 'bold'
  }
});
