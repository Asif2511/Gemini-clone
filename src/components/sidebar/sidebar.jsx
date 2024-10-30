import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

function Sidebar() {
    const [extended, setExtend] = useState(false);
    const [isMobileOpen, setMobileOpen] = useState(false); // Toggle sidebar on mobile
    const {
        onSent,
        prevPrompt,
        setrecentprompt,
        newChat
    } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setrecentprompt(prompt);
        onSent(prompt);
    };

    const renderMenuItem = (icon, label) => (
        <div
            className={`bottom-item inline-flex ${extended ? 'px-[15px] py-[10px] justify-center items-center' : 'p-2.5 pr-[40px] gap-[10px] items-end'} rounded-[50px] text-ReceentText cursor-pointer hover:bg-Recenthover`}
        >
            <img src={icon} alt="" className='w-5 h-5' />
            <p className={extended ? 'hidden' : ''}>{label}</p>
        </div>
    );

    return (
        <>
            {/* Sidebar for larger screens */}
            <div id="sidebar" className="hidden md:inline-flex flex-col justify-between min-h-screen bg-SideNavColor py-[25px] px-[15px]">
                <div id="top">
                    <img
                        src={assets.menu_icon}
                        alt="Menu"
                        className='w-5 block ml-2.5 cursor-pointer'
                        onClick={() => setExtend(!extended)}
                    />
                    <div id="new-chat" className='mt-[50px] inline-flex items-center gap-2.5 px-[15px] py-[10px] bg-NewChatbg rounded-[60px] text-sm text-gray-400 cursor-pointer' onClick={newChat}>
                        <img src={assets.plus_icon} alt="Plus" className='w-5' />
                        <p className={extended ? 'hidden' : ''}>New chat</p>
                    </div>
                    <div id="recent" className={`flex flex-col animate-fadeIn ${extended ? 'hidden' : ''}`}>
                        <p id="recent-title" className='mt-[30px] mb-[20px]'>Recent</p>
                        {
                            prevPrompt.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => loadPrompt(item)}
                                        key={index}
                                        id="recent-entry"
                                        className="flex items-end gap-[10px] p-2.5 pr-[40px] rounded-[50px] text-ReceentText cursor-pointer hover:bg-Recenthover"
                                    >
                                        <img src={assets.message_icon} alt="Message" className="w-5" />
                                        <p>{item.slice(0, 18)}....</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div id="bottom" className='flex flex-col'>
                    {renderMenuItem(assets.question_icon, 'Help')}
                    {renderMenuItem(assets.history_icon, 'Activity')}
                    {renderMenuItem(assets.setting_icon, 'Settings')}
                </div>
            </div>

            {/* Mobile Sidebar Button */}
            <div className="md:hidden fixed top-[3.25rem] left-5 z-50">
                <button onClick={() => setMobileOpen(!isMobileOpen)}>
                    <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="md:hidden fixed inset-0 bg-SideNavColor bg-opacity-90 z-50 flex flex-col justify-between p-[25px]">
                    <div id="top">
                    <div className="md:hidden fixed top-[3.5rem] left-5 z-50">
                <button onClick={() => setMobileOpen(!isMobileOpen)}>
                    <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
                </button>
            </div>
                       
                        <div id="new-chat" className='mt-[65px] inline-flex items-center gap-2.5 px-[15px] py-[10px] bg-NewChatbg rounded-[60px] text-sm text-gray-400 cursor-pointer' onClick={newChat}>
                            <img src={assets.plus_icon} alt="Plus" className='w-5' />
                            <p>New chat</p>
                        </div>
                        <div id="recent" className="flex flex-col mt-[30px] animate-fadeIn">
                            <p id="recent-title" className='mb-[20px]'>Recent</p>
                            {
                                prevPrompt.map((item, index) => (
                                    <div
                                        onClick={() => loadPrompt(item)}
                                        key={index}
                                        id="recent-entry"
                                        className="flex items-end gap-[10px] p-2.5 pr-[40px] rounded-[50px] text-ReceentText cursor-pointer hover:bg-Recenthover"
                                    >
                                        <img src={assets.message_icon} alt="Message" className="w-5" />
                                        <p  className="hidden sm:block">{item.slice(0, 18)}....</p>
                                        <p className="block sm:hidden">{item.slice(0,35)}....</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div id="bottom" className='flex flex-col'>
                        {renderMenuItem(assets.question_icon, 'Help')}
                        {renderMenuItem(assets.history_icon, 'Activity')}
                        {renderMenuItem(assets.setting_icon, 'Settings')}
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;
