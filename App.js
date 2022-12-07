import React, { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

export default function App() {
  const [img, setImg] = useState(require("./src/biscoito_fechado.png"))
  const [frase, setFrase] = useState("")
  const [disabled, setDisabled] = useState(false)

  let frases = [
    "Olhe ao passado para buscar sabedoria e ao futuro para ter esperança.",
    "Você nunca vai chegar no futuro enquanto seu passado for presente...",
    "É em meio a dificuldade que se encontra a oportunidade.",
    "O êxito é ir de frustração a frustração sem perder a animação.",
    "A maior prova de que você pode fazer o impossível, é superar circunstâncias difíceis.",
    "Qualquer dificuldade pode ser ultrapassada, já que para todo problema há uma solução...",
    "Suas pequenas vitórias são todas as dificuldades superadas durante sua vida, tenha orgulho delas.",
    "As dores não são eternas, se permita, o seu melhor é o suficiente!",
    "Mesmo que a jornada seja lenta, abrir mão não acelera.",
    "Que a expectativa por dias melhores nunca nos falte!",
    "A superação da dificuldade depende apenas de você.",
    "Superação é esquecer o ontem para um amanhã melhor e promitente.",
    "Seus medos morrerão de fome, se alimentar a sua motivação.",
    "Vencer momentos difíceis pede esforço, entretanto todos somos capacitados para isso, recomeçar e escolher um novo caminho...",
    "Não há outra forma de crescer, senão superar os desafios e os medos. Deixe-os vir!"
  ]

  function quebrarBiscoito() {
    let numeroAleatorio = Math.floor(Math.random() * frases.length)
    // 'Math.floor()' serve para gerar um número aleatório.

    // Imprimindo a frase...
    setFrase('"' + frases[numeroAleatorio] + '"')

    // Mudando o biscoito fechado para o biscoito aberto...
    setImg(require("./src/biscoito_aberto.png"))

    setDisabled(true)
  }

  function reiniciarBiscoito() {
    // Limpando a frase...
    setFrase("")

    // Mudando o biscoito aberto para o biscoito fechado...
    setImg(require("./src/biscoito_fechado.png"))

    setDisabled(false)
  }

  return (
    <View style={styles.container}>
      <Image
        source={img}
        style={styles.img}
      />

      <Text style={styles.textoFrase}>
        {frase}
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={quebrarBiscoito}
        disabled={disabled}
      >
        <View style={styles.btnArea}>
          <Text style={styles.btnTexto}>
            Quebrar biscoito
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.botao,
          {
            marginTop: 15, borderColor: '121212'
          }
        ]}
        onPress={reiniciarBiscoito}
        >
        <View style={styles.btnArea}>
          <Text style={[
            styles.btnTexto,
            {
              color: '121212'
            }
          ]}
          >
            Quero abrir outro biscoito
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,  // A View "mãe" ocupará toda a nossa tela.
    justifyContent: "center",  // Centralizando VERTICALMENTE, ou seja, na COLUNA.
    alignItems: "center",  // Centralizando VERTICALMENTE, ou seja, na LINHA.
    backgroundColor: '#B0B7C0'
  },

  img:{
    width: 230,
    height: 230
  },

  textoFrase:{
    fontSize: 20,
    fontStyle: "italic",
    color: '#dd7b22',
    textAlign: "center",
    margin: 30
  },

  botao:{
    borderColor: '#dd7b22',
    borderWidth: 2,
    borderRadius: 25,
    width: 230,
    height: 50
  },

  btnArea:{
    flex: 1,  // A View do botão tentará ocupar todo o espaço disponível dentro do botão.
    justifyContent: "center",  // Centralizando VERTICALMENTE, ou seja, na COLUNA.
    alignItems: "center"  // Centralizando HORIZONTALMENTE, ou seja, na LINHA.
  },

  btnTexto:{
    fontSize: 17,
    fontWeight: "bold",
    color: '#dd7b22',
  }
})
