import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

const main = async () => {
  console.log(colors.bold.green("Welcome to the Chat-bot"));
  console.log(colors.bold.green("Start Chatting"));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));
      // calling the api

      messages.push({ role: "user", content: userInput });

      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completionText = chatCompletion.data.choices[0].message.content;
      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + completionText);
        return;
      }

      console.log(colors.green("Bot: ") + completionText);

      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
};

main();
