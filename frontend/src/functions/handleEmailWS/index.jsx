const handleEmailExiste = (receivedEmails, receivedData, user_data) => {
    return (
      !receivedEmails.some((email) => email._id === receivedData._id) &&
      receivedData.recipients.includes(user_data.username)
    );
  };


const handleSentWS = (sentEmails, receivedData, user_data) => {
  return (
    !sentEmails.some((email) => email._id === receivedData._id) &&
    receivedData.author === user_data.username
  );
}
  
export { handleEmailExiste, handleSentWS }
