import twilio from "twilio";

const accountSid = "ACaa4168915c54f353376e26a91565316b";
const authTocken = "2da7e9ac423a2f0553a782943c90899e";

const client = twilio(accountSid, authTocken);

const number = process.argv[2];
const message = process.argv[3];

try {
  const mensaje = await client.messages.create({
    body: message,
    from: "whatsapp:+14155238886",
    to: `whatsapp:${number}`,
  });

  console.log(mensaje.sid);
} catch (err) {
  console.log(err.message);
}
