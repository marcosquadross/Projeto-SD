import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function SignIn({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = () => {
    return password.length >= 6;
  }

  const isEmpty = () => {
    return userName === "" || email === "" || password === "";
  }

  const handleSignIn = () => {
    /* TODO: Implementar lógica de login */
  };

  return (
    <View style={styles.container}>

      <TextInput 
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignIn}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      <Text>Ainda não tem uma conta? </Text>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={{ color: 'blue' }}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
