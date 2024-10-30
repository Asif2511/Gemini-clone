import { createContext, useState } from "react";
import run from "../config/gemini"; // Corrected path
export const Context = createContext();

const ContexProvider = (props) => {
    const [input, setinput] = useState('');
    const [recentprompt, setrecentprompt] = useState('');
    const [prevPrompt, setprevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');
    const [istyping, setIsTyping] = useState(false)

    const delaypara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };
    const newChat=()=>{
           setLoading(false)
           setShowResult(false)
    }


    const onSent = async (prompt) => {
        setIsTyping(false)
        setResultData("");
        setrecentprompt(input); // Set recent prompt before clearing input
        setinput("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt!==undefined) {
             response=await run(prompt)
            setrecentprompt(prompt)
        }
        else{
            response=await run(input)
            setrecentprompt(input)
            setprevPrompt(prev=>[...prev,input])
        }

        
        
        let responseArray = response.split("**");
        let newResponse = '';

        for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 0) { // Check if i is even
                newResponse += responseArray[i];
            } else {
                newResponse += `<b>${responseArray[i]}</b>`;
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(' ');

        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delaypara(i, nextWord + ' ');
        }

        console.log(responseArray);
        setLoading(false); // Ensure loading is set to false after processing
    };

    const contextValue = {
        input,
        setinput,
        recentprompt,
        setrecentprompt,
        prevPrompt,
        setprevPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        istyping, 
        setIsTyping,
        newChat
    };

   
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContexProvider;
