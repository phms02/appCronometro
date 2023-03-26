import React, { useState } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

let timer = null;
let segundos = 0;
let minutos = 0;
let horas = 0;

export default function App() {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState("Iniciar");
  const [ultimoTempo, setUltimoTempo] = useState(null);

  function iniciar() {
    if(timer !== null) {
      clearInterval(timer);  // Limpa o cronômetro.
      timer = null;
      setBotao("Iniciar")
    } else {
      timer = setInterval(() => {
        segundos++;

        if(segundos == 60) {
          segundos = 0;
          minutos++;
        }

        if(minutos == 60) {
          minutos = 0;
          horas++;
        }

        let horaFormatada = (
          (horas < 10 ? "0" + horas : horas) + ":"
          +
          (minutos < 10 ? "0" + minutos : minutos) + ":"
          +
          (segundos < 10 ? "0" + segundos : segundos)
        );

        setNumero(horaFormatada);
      }, 1000);

      setBotao("Pausar");
    }
  }

  function limpar() {
    if(timer !== null) {
      clearInterval(timer);
      
      timer = null;
      
      setBotao("Iniciar");
    }
    
    setUltimoTempo(numero);

    segundos = 0;
    minutos = 0;
    horas = 0;

    setBotao("Iniciar");
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          require("./src/cronometro.png");
        }
      />

      <Text style={styles.timer}>
        {numero}
      </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnText}>
            {botao}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnText}>
            Limpar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaImpressao}>
        <Text style={styles.tempoDecorrido}>
          {ultimoTempo ? "Último tempo registrado: " + ultimoTempo : ""}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",  // Alinhamento HORIZONTAL (alinhamento na LINHA)! Isto porque, por padrão, o alinhamento do React Native é colmun, e eu estou utilizando este padrão.
    justifyContent: "center", // Alinhamento VERTICAL (alinhamento na COLUNA)! Isto porque, por padrão, o alinhamento do React Native é colmun, e eu estou utilizando este padrão.
    backgroundColor: "#2B6AD0"
  },

  timer: {
    fontSize: 40,
    fontWeigth: "bold",
    marginTop: -160,
    color: "#FFFFFF"
  },

  btnArea: {
    flexDirection: "row",  // Deixando os botões na MESMA linha.
    marginTop: 130,
    heigth: 45
  },

  btn: {
    flex: 1,
    alignItems: "center",  // Alinhamento HORIZONTAL (alinhamento na LINHA)! Isto porque, por padrão, o alinhamento do React Native é colmun, e eu estou utilizando este padrão.
    justifyContent: "center", // Alinhamento VERTICAL (alinhamento na COLUNA)! Isto porque, por padrão, o alinhamento do React Native é colmun, e eu estou utilizando este padrão.
    heigth: 40,
    margin: 20,
    backgroundColor: '#1560ea',
    borderRadius: 10
  },

  btnText: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#11c411'
  },

  areaImpressao: {
    marginTop: 20
  },

  tempoDecorrido: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    color: '#1bc8e4'
  }
})
