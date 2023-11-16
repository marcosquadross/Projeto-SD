import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function SignIn() {
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
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignIn}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>Ainda não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
