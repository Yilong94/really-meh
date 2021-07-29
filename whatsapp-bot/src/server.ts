import dotenv from "dotenv";
import express, { Request, Response } from "express";
import twilo from "twilio";
import axios from "axios";
import { Command } from "./entities";
import { cache, mockThreads, contacts } from "./constants";
import { delay } from "./utils";

dotenv.config();

const app = express();

// Environment variables
const PORT = process.env.PORT;
const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER;

app.use(express.urlencoded({ extended: false }));

/*
 * Webhook endpoint for handling incoming Whatsapp messages
 * Message content and metadata can be found in request body
 */
app.post("/message", async (req: Request, res: Response) => {
  const twiml = new twilo.twiml.MessagingResponse();

  const { Body: inMessage, To: sender } = req.body;

  switch (inMessage) {
    case Command.VERIFY:
      cache[sender] = Command.VERIFY;
      twiml.message("Copy and paste the message here");
      break;
    default:
      if (cache[sender] === Command.VERIFY) {
        // Fire API request to get list of similar therads
        try {
          // const res = await axios.post(BACKEND_ENDPOINT, {
          //   inMessage,
          // });
          // const threads = res.data;
          const threads = mockThreads;

          if (threads.length > 0) {
            twiml.message("Here are the top 3 posts");
            delay(1000);
            threads.forEach((thread: string) => {
              twiml.message(thread);
            });
          } else {
            twiml.message(
              "Sorry, we couldn't find any similar post. You can create a new post at https://www.reallymeh.gov.sg"
            );
          }
        } catch (err) {}

        delete cache[sender];
      } else {
        twiml.message(
          "👋 Hi there!\n\n🤖 I am a chatbot made by the _ReallyMeh?_ team\n\n📥 If you have received a message that you are aren't sure is true, you can send the message to me\n\n💬 If there are similar posts being discussed on _ReallyMeh?_, I will post the links to the posts here and you can view what people are saying\n\n🤩 If there are no similar posts, you can create a new post on our platform at https://www.reallymeh.gov.sg"
        );
        delay(1000);
        twiml.message("Here are the list of possible commands:\n\n• /verify");
      }
  }

  res.status(200).set("Content-Type", "text/xml").end(twiml.toString());
});

/*
 *  Endpoint for sending push notifications to all known contacts
 */
app.post("/notification", (req: Request, res: Response) => {
  try {
    const client = twilo(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    const { message } = req.body;

    contacts.forEach((contact) => {
      client.messages.create({
        from: WHATSAPP_NUMBER,
        to: contact,
        body: message,
      });
    });

    res.status(200).json({ text: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ text: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
