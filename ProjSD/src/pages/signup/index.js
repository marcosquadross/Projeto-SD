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

  const handleSignUp = () => {
    if(isEmpty() || !isEmailValid() || !isPasswordValid()){
      alert("Dados inválidos");
      return;
    } 

    axios.post("http://localhost:3000/users", {
      userName,
      email,
      password
    }).then(() => {
      alert("Usuário cadastrado com sucesso!");
      navigation.navigate("SignIn");
    }).catch(() => {
      alert("Erro ao cadastrar usuário");
    })
  };

  return (
    <View >
      <Text>Cadastre-se</Text>
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
      <TouchableOpacity onPress={handleSignUp}>
        <Text>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text>Já possui conta</Text>
      </TouchableOpacity>
    </View>
  );
}
