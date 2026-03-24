import "dotenv/config";

const getGroqAPIResponse = async(message) => {
    const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{
           role: "user",
           content: message
        }]
    })
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;//reply
    console.log("AI Reply:", reply);
    return reply;

  } catch(err) {
    console.log("Groq Error:", err);
    return null;
  }
}

export default getGroqAPIResponse;