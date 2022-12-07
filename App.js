import React, { useState } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

// Variável para a armazenar a cronometragem e a inicializo como NULA, porque, toda vez que o usuário inicializar ou atualizar a aplicação, o tempo será RESETADO, sendo NULO...
let timer = null

// Variável para armazenar os SEGUNDOS...
let segundos = 0

// Variável para armazenar os MINUTOS...
let minutos = 0

// Variável para armazenar as HORAS...
let horas = 0

export default function App() {
  // Criando um state para receber e trocar o valor cronometrado. Toda vez que o usuário clicar em "Limpar", se tiver um valor salvo, este valor será trocado...
  const [numero, setNumero] = useState(0)

  // Criando um state para mudar o valor/texto do botão. Quando o cronômetro estiver parado, deve aparecer o texto "Iniciar"; quando o cronômetro estiver rodando, deve aparecer "Limpar"...
  const [botao, setBotao] = useState("Iniciar")

  // Criando um state para que, quando o usuário iniciar ou atualizar a aplicação, o tempo cronometrado seja apagado.
  const [ultimoTempo, setUltimoTempo] = useState(null)

  function iniciar() {
    if(timer !== null) {
      // Aqui, temos que parar o cronômetro!
      clearInterval(timer)  // Limpa o cronômetro.
  
      // Se o cronômetro estiver parado, o tempo deve voltar a ser nulo...
      timer = null
  
      // Se o botão estiver parado, precisamos mudar o valor/texto do botão...
      setBotao("Iniciar")
    } else {
      // Faz a contagem de tempo...

      /*
        Quando a contagem iniciar, os segundos precisam ser acrescentados/aumentados de 1 em 1 segundo. Para isto, utilizo o 'setInterval'.

        Utilizo o 'setInterval' para que o tempo seja acrescentado/aumentado de 1 em 1 segundo - ou, então, de 1000 em 1000 milissegundos -, indefinidamente. Ou, pelo menos, até o usuário pausar/parar.
      */

      timer = setInterval(() => {
        segundos++

        if(segundos == 60) {
          segundos = 0
          minutos++
        }

        if(minutos == 60) {
          minutos = 0
          horas++
        }

        // Formatando as horas: se a hora for MENOR que 10, acrescenta um zero à esquerda. Senão - isto é, maior ou igual a 10 -, não coloca zero à esquerda e apenas mostra a hora...
        let horaFormatada = (
          (horas < 10 ? "0" + horas : horas) + ":"
          +
          (minutos < 10 ? "0" + minutos : minutos) + ":"
          +
          (segundos < 10 ? "0" + segundos : segundos)
        )

        // Mudando o tempo cronometrado para a hora formatada...
        setNumero(horaFormatada)
      }, 1000)

      // Mudando o valor/texto do botão...
      setBotao("Pausar")
    }
  }

  function limpar() {
    if(timer !== null) {
      // Aqui, temos que parar o cronômetro!
      clearInterval(timer)  // Limpa o intervalo de tempo.
  
      // Se o cronômetro estiver parado, o tempo deve voltar a ser nulo...
      timer = null
  
      // Se o botão estiver parado, precisamos mudar o valor/texto do botão...
      setBotao("Iniciar")
    }

    // Passando o último valor cronometrado para 'setUltimoTempo'...
    setUltimoTempo(numero)

    // Zerando o cronômetro...
    segundos = 0
    minutos = 0
    horas = 0

    // Mudando o valor/texto do botão...
    setBotao("Iniciar")
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          require("./src/cronometro.png")
        }
      />

      <Text style={styles.timer}>
        {numero}
      </Text>

      <View style={styles.btnArea}>
        {/*
          'TouchableOpacity' faz com que, quando pressionamos o botão, ocorra o efeito de opacidade neste botão.
        */}
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
