import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "react-native-elements";
import dictionary from "./database";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      isSearchPressed: true,
    };
  }
  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    try {
      var word = dictionary[text]["word"];
      var lexicalCategory = dictionary[text]["lexicalCategory"];
      var definition = dictionary[text]["definition"];
      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
    } catch (err) {
      Alert.alert("Not Found");
      this.setState({
        text: "",
        isSearchPressed: false,
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: "Dictionary",
            style: { color: "#fff", fontSize: 30 },
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: "Loading...",
              lexicalCategory: "",
              examples: [],
              definition: "",
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}
        >
          <Text style={{ color: "#f1f1f1" }}>Search</Text>
        </TouchableOpacity>
        <View style={(styles.container, { margin: 20, marginTop: -15 })}>
          <Text>Word : {this.state.word}</Text>
          <Text>Type : {this.state.lexicalCategory}</Text>
          <Text>Definition : {this.state.definition}</Text>
        </View>
        <StatusBar style="light" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputBox: {
    height: 40,
    width: "70%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
  },
  searchButton: {
    marginLeft: "77.5%",
    borderRadius: 5,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "20%",
    marginTop: "-15.25%",
    margin: 20,
    backgroundColor: "#1F89DC",
  },
});
