import axios from "axios";

export function LogInFunc(data, toast, navigate) {
  axios
    .post("http://localhost:8000/auth/login/", data)
    .then((response) => {
      if (response.status === 200 && response.data.access) {
        localStorage.setItem("cadastro_user", data.username);
        localStorage.setItem("token", response.data.token);
        navigate("/home", { replace: true });
      } else {
        toast({
          title: "Usuário ou senha incorretos",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function LogUpFunc(data, toast, navigate) {
  axios
    .post("http://localhost:8000/auth/cadastro/", data)
    .then((response) => {
      if (response.status === 200) {
        toast({
          title: "Usuário cadastrado com sucesso.",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        navigate("/", { replace: true });
      }
    })
    .catch((error) => {
      if (error.response) {
        const statusCode = parseInt(error.response.status);
        if (statusCode === 409) {
          toast({
            title: "Usuário ou email já cadastrados no sistema",
            status: "error",
            isClosable: true,
            duration: 3000,
          });
        } else if (statusCode === 400) {
          toast({
            title: "Dados de cadastro não estão nos parâmetros aceitos",
            status: "error",
            isClosable: true,
            duration: 3000,
          });
        }
      } else {
        console.log("Erro de solicitação:", error.message);
      }
    });
}


export function SendEmail(data, toast) {

}

export function ReplyEmail(data, toast) {

}

