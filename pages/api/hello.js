import { google } from "googleapis";

async function handler(req, res) {
  res
    .status(200)
    .json({
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
}

export default handler;
