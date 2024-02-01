import openai from './config/openai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log('Welcome to my Chatbot!'.bold.green);
    console.log('You can begin a conversation with the bot.'.bold.green);

    const chatHistory = []; // store conversation history

    while(true) {
        const userInput = readlineSync.question('You: '.yellow);

        try {
            // Construct messages using chat history
            const messages = chatHistory.map(([role, content]) => ({role, content}));

            // Add latest user input
            messages.push({role: 'user', content: userInput});

            // Call API with User Input
            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            })

            // Get API response
            const response = chatCompletion.choices[0].message.content;

            if (userInput.toLowerCase() === 'exit') {
                console.log('Bot: '.green + response);
                return;
            }

            console.log('Bot: '.green + response);

            // update history with user input and bot response
            chatHistory.push(['user', userInput], ['assistant', response]);

        } catch (error) {
            console.log(error.red);
        }

    }
}

main();