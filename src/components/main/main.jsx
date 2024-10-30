import { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

function Main() {
    const {
        input,
        setinput,
        recentprompt,
        showResult,
        loading,
        resultData,
        onSent,
        istyping,
        setIsTyping,
        setrecentprompt,
        setprevPrompt
    } = useContext(Context);

    function inputArea(e) {
        const inputValue = e.target.value;
        setinput(inputValue);
        setIsTyping(inputValue.trim().length > 0);
    }

    const loadCardPrompt = (prompt) => {
        setrecentprompt(prompt);
        setprevPrompt(prev => [...prev, prompt]);
        onSent(prompt);
    };

    return (
        <div id="main" className="flex-1 min-h-screen pb-[20vh] relative">
            {/* Navbar */}
            <div id="nav" className="flex items-center p-4 justify-between text-Navtext text-2xl fixed top-0 left-0 w-full z-10">
                <p id="name" className="md:block hidden">Gemini</p>
                <img src={assets.user_icon} alt="" className="w-10 rounded-full" />
            </div>

            {/* Main Container */}
            <div id="main-container" className="max-w-[900px] mx-auto mt-[80px] md:mt-[90px]">
                {/* Greeting Section */}
                {!showResult ? (
                    <>
                        <div id="greet" className="m-5 text-5xl font-medium p-4 text-GreetText">
                            <p>
                                <span className="bg-customgradient" style={{
                                    background: "linear-gradient(16deg, #4b90ff, #ff5543)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}>
                                    Hello, Asif.
                                </span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>

                        {/* Cards Section */}
                        <div id="cards" className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-4">
                            {[
                                { text: "Suggest beautiful places to see on an upcoming road trip", icon: assets.compass_icon },
                                { text: "Briefly summarize this concept: urban planning", icon: assets.bulb_icon },
                                { text: "Brainstorm team bonding activities for our work retreat", icon: assets.message_icon },
                                { text: "Improve the readability of the following code", icon: assets.code_icon }
                            ].map((card, index) => (
                                <div
                                    key={index}
                                    className="card h-52 p-4 bg-Cardbg relative cursor-pointer rounded-lg hover:bg-[#dfe4ea]"
                                    onClick={() => loadCardPrompt(card.text)}
                                >
                                    <p className="text-Navtext text-lg">{card.text}</p>
                                    <img src={card.icon} alt="" className="w-9 p-1 absolute bg-white rounded-full bottom-2.5 right-2.5" />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div id="result" className="px-0 py-20 max-h-[70vh] overflow-y-scroll no-scrollbar">
                        <div id="result-title" className="my-10 flex items-center gap-5">
                            <img src={assets.user_icon} alt="" className="w-10 rounded-full" />
                            <p>{recentprompt}</p>
                        </div>
                        <div id="result-data" className="flex items-start gap-5">
                            <img src={assets.gemini_icon} alt="" className="w-10 rounded-full" />
                            {loading ? (
                                <div id="loader" className="w-full flex gap-2.5 flex-col">
                                    {[...Array(3)].map((_, idx) => (
                                        <hr
                                            key={idx}
                                            className="rounded border-none bg-[#f6f7f8] h-5 animate-loader"
                                            style={{
                                                background: "linear-gradient(to right, #9ed7ff, #ffffff, #9ed7ff)",
                                                backgroundSize: "800px 50px"
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p id="result-text"
                                    dangerouslySetInnerHTML={{ __html: resultData }}
                                    className="text-lg font-light leading-relaxed"
                                ></p>
                            )}
                        </div>
                    </div>
                )}

                {/* Search Box and Footer */}
                <div id="main-bottom" className="absolute bottom-0 w-full max-w-[900px] m-auto px-0 py-4 fixed z-10">
                    <div id="search-box" className="flex items-center justify-between gap-5 bg-Cardbg py-1.5 px-5 rounded-full">
                        <textarea
                            placeholder="Enter a prompt here"
                            className="bg-transparent border-none outline-none p-2 text-lg flex-1 resize-none max-h-36 no-scrollbar"
                            rows="1"
                            onChange={inputArea}
                            value={input}
                        ></textarea>
                        <div className="flex gap-2.5">
                            <img src={assets.gallery_icon} alt="" className="w-6 cursor-pointer" />
                            <img src={assets.mic_icon} alt="" className="w-6 cursor-pointer" />
                            {istyping && <img src={assets.send_icon} alt="" className="w-6 cursor-pointer" onClick={() => input && onSent()} />}
                        </div>
                    </div>
                    <p className="text-sm text-center font-light mx-4">
                        Gemini can make mistakes, so double-check it
                    </p>
                </div>
            </div>

            {/* Media Query for Mobile View */}
            <style jsx>{`
                @media (max-width: 768px) {
                    #nav {
                        position: fixed;
                        top: 30px;
                        width: 100%;
                        z-index: 10;
                    }

                    #main-bottom {
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                        padding: 0 16px;
                        z-index: 10;
                    }

                    #result-text {
                        margin-right: 12px;
                    }

                    #loader {
                        width: 78%;
                    }

                    #result {
                        padding: 2rem 8px;
                    }

                    #main-container {
                        margin-top: 90px;
                    }

                    #name {
                        visibility: hidden;
                    }
                }
            `}</style>
        </div>
    );
}

export default Main;
