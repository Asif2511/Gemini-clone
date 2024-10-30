import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  // Assuming the API key is stored in an environment variable named REACT_APP_API_KEY
  const apiKey = 'AIzaSyAh-J54o_IaXW2CBQygo8ZCB80yC182-14';
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
  
    const result = await chatSession.sendMessage(prompt);
    
    const data=result.response.text()
    console.log(data)
    
    return data
  }
  
  export default run;