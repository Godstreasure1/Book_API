exports.emailTemplate = (firstName, verificationUrl) => {
  return `
    <h1>Hello ${firstName}</h1> <p>welcome to the best Book API, please click the link below to verify your account</p>
    <h3>${verificationUrl}</h3>
    `;
};
