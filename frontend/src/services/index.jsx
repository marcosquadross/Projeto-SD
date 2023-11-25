import axios from "axios";

const address = "http://localhost:3000/api";

export function LogInFunc(data, toast, navigate) {
  axios
    .post(address + "/user/login", data)
    .then((response) => {
      if (response.status == 200) {
        let user_data = {
          user_id: response.data.user._id,
          username: response.data.user.username,
          telephone: response.data.user.telephone,
          token: response.data.token,
        };

        localStorage.setItem("user_data", JSON.stringify(user_data));
        localStorage.setItem("token", response.data.token);
        navigate("/home", { replace: true });
      } else {
        toast({
          title: response.data.msg,
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
    .post(address + "/user", data)
    .then((response) => {
      if (response.status === 201) {
        toast({
          title: response.data.msg,
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

export function UpdateUser(data, toast) {
}

export function DeleteUser(data, toast) {
}

export function SendEmail(data, toast) {

  axios
    .post(address + "/message", data)
    .then((response) => {
      if (response.status == 201) {
        toast({
          title: response.data.msg,
          status: "success",
          isClosable: true,
          duration: 3000,
        });
      } else {
        toast({
          title: response.data.msg,
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      }
    })

}

export function ReplyEmail(data, toast) {}

export function GetSentEmails(user_id, toast) {
  return axios
    .get(address + "/message/author/" + user_id) 
    .then((response) => {
      if (response.status == 404 || response.status == 500) {
        toast({
          title: response.data.msg,
          status: response.status == 404 ? "info" : "error",
          isClosable: true,
          duration: 3000,
        });
      } else {
        console.log("Deu certo os emails enviados", response.data);
        // console.log(response.data);
        return response.data;
      }
    })
 
}

export function GetReceivedEmails(data, toast) {}
