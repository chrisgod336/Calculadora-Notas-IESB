import { View, StyleSheet, Text, ActivityIndicator} from "react-native";
import WebView from "react-native-webview";
import { useState, useEffect} from "react";
import Colors from "../constants/Colors";


export default function TabThreeScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
            () => {
                setTimeout(() => {
                    setIsLoading(false);
                  }, 6000);
            }
        );


  return (
        <>
            <View style={{display: isLoading? 'flex':'none', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={Colors.colors.red} />
                <Text style={{textAlign: 'center', fontSize: 14}}>
                    Carregando ...
                </Text>
            </View>
            <WebView
            style={[styles.container, {display: isLoading? 'none':'flex'}]}
            source={{ uri: 'https://aluno.iesb.br/aluno/#/login' }}
            />
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
