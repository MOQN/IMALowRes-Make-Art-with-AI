const apiKey = 'YOUR_OPENAI_API';  // replace with your OpenAI API key

import express from "express";
import OpenAI from "openai";
import bodyParser from "body-parser";
import cors from "cors";

///// Express Server /////
const app = express();
const port = 3000;
app.use(express.static("public"));
app.get('/', (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

///// OpenAI ChatGPT API /////
const openai = new OpenAI({
  apiKey: apiKey,
});

app.use(cors());  // Using the cors middleware to enable cross-origin resource sharing, , allowing any origin to access your resources.
app.use(bodyParser.json());  // Parsing JSON data in the request body

app.post("/api/chat", async (req, res) => {  // Handling POST requests to "/api/chat"
  const { prompt } = req.body;  // Extracting the "prompt" property from the request body

  try {
    const response = await openai.chat.completions.create({  // Making a chat completion request to OpenAI
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 150,  // Adjust the max tokens as needed
      temperature: 0.7,  // Adjust the temperature as needed
    });

    res.json({ message: response.choices[0].message.content });  // Sending the response from OpenAI as JSON
  } catch (error) {
    console.error("Error fetching response:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({ error: "Error fetching response" });
  }
});
