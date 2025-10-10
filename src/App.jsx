import { useState, useRef, useEffect  } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdVerifiedUser } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { RiCloseLargeLine } from "react-icons/ri";


export default function App() {

   const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showInbox, setShowInbox] = useState(false);
   const [messages, setMessages] = useState([
    { sender: 'AI', text: "Hello Thembiswa! I'm here to help facilitate communication between students and tutors." }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending message
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'You', text: input.trim() };
    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'AI', text: "Thanks for your message! I'll help you connect with a tutor shortly." }
      ]);
    }, 1000);

    setInput('');
  };


  return (
      <div className={`${darkMode ? "bg-black text-white" : "bg-white text-gray-900"} font-sans min-w-screen `}>
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-violet-500 via-purple-900 to-black">
        {/* Logo */}
        <div className="text-2xl font-bold">TutorFinder</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-indigo-400">About Us</a>
          <a href="#tutors" className="hover:text-indigo-400">Tutors</a>
          <a href="#contact" className="hover:text-indigo-400">Contact Us</a>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          <button
          onClick={()=> setShowInbox(true)}
          className="p-2 rounded-full bg-purple-900 hover:bg-purple-900/75 transition"
          aria-label="Toggle Chat"
          
          >
          
          {showInbox ? <IoChatbubbleOutline size={20} /> : !showInbox ? <IoChatbubbleOutline size={20} /> : <IoChatbubbleOutline size={20} />}
          </button>

        
         


          {/* Day/Night toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-black/20 hover:bg-white/30"
          >
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>

          {/* Burger Icon for Mobile */}
          <button
            className="md:hidden text-2xl text"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 py-4 bg-gradient-to-b from-violet-800 to-black">
          <a href="#about" className="hover:text-indigo-400">About Us</a>
          <a href="#tutors" className="hover:text-indigo-400">Tutors</a>
          <a href="#contact" className="hover:text-indigo-400">Contact Us</a>
        </div>
      )}

       {showInbox && ( 
        
            <div className="fixed inset-0 bg-purple-800/75 bg-opacity-60 flex justify-center items-center z-50 flex flex-col h-[90vh]">
              <div className="bg-purple-900 w-[400px] min-h-120 rounded-lg shadow-xl p-10 overflow-y-auto w-20">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Tutor-student Chat</h2>
                  <button
                  onClick={()=> setShowInbox(false)}
                  className="text-sm text-white hover:text-red-500"
                  >
                    <RiCloseLargeLine />
                  </button>

                </div>
             

              <h3 className="font-semibold mb-2">Recent Conversations</h3>
              {/*dr. Sarah/tutor */}
              <div className="bg-gray-100 rounded-lg p-3 mb-2">
                <div className="flex items-center space-x-2">
                  <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">D</div>
                    <div>
                     <p className="font-semibold text-purple-500">Dr. Sarah John</p>
                     <p className="text-sm text-gray-600">Looking forward to our session tomorrow!</p>

                </div>
              </div>
              <p className="text-xs mt-1 text-blue-600">Computer Science</p>
            </div>
             
              {/*michael/user */}
            <div className="bg-gray-100 rounded-lg p-3 mb-2">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">M</div>
                <div>
                  <p className="font-semibold text-purple-500">Michael Chen</p>
                  <p className="text-sm text-gray-600">Thanks for the help with the assignment</p>
                </div>
              </div>
              <p className="text-xs mt-1 text-blue-600">Computer Science</p>
            </div>
             <div className="px-4 py-2 border-t">
              <div className="flex items-center space-x-2 mb-2">
            
                 <h3 className="font-semibold">AI Assistant</h3>
              </div>
               <div className="chat-scroll space-y-2 overflow-y-auto max-h-60 pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`text-sm p-2 rounded ${
                    msg.sender === 'You' ? 'bg-indigo-500 text-left ml-auto max-w-[80%]' : 'bg-violet-600 text-left mr-auto max-w-[80%]'
                  }`}
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
               

             </div>
              <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow border rounded px-3 py-2 text-sm"
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button 
               onClick={sendMessage}

              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition"
              >
                <FiSend />
              </button>
            </div>

            


            </div>
            </div>
            
         ) } 

 
    <div className="font-sans min-w-screen ">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-violet-500 via-purple-900 to-black text-white text-center py-10 px-6 min-h-screen">
        <h1 className="text-4xl md:text-6xl font-bold ">
          Find Your Perfect Tutor
        </h1>

        <h2 className="text-3xl font-bold mt-20 mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className=" bg-gradient-to-r from-violet-500 via-purple-900 to-slate-900 shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
            <p className="text-white">
              All tutors are background-checked and verified by our team.
            </p>
          </div>
          <div className="bg-gradient-to-r from-violet-500 via-purple-900 to-slate-900 shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-white">
              Book sessions at your convenience, online or in-person.
            </p>
          </div>
          <div className="bg-gradient-to-l from-violet-500 via-purple-900 to-slate-900 shadow-lg rounded-xl p-6 ">
            <h3 className="text-xl font-semibold mb-2">Affordable Rates</h3>
            <p className="text-white">
              Choose from a variety of price points that suit your budget.
            </p>
          </div>
        </div>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mt-15">
          Connect with expert tutors in any subject, anytime, anywhere.
        </p>
        <button className="mt-6 px-6 py-3 bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white rounded-lg shadow hover:bg-gray-100">
          Get Started
        </button>

      </header>
    </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>
          © {new Date().getFullYear()} TutorFinder. All rights reserved.
        </p>
      </footer><br />
      <div>

        <section id="about" className="bg-gradient-to-r from-violet-500 via-purple-900 to-black text-white text-center py-10 px-6 min-h-screen">

        <h4 className="text-4xl font-bold text-white p-5">About This App</h4> <br />

         <div className="flex py-5 px-7 relative bottom-10 min-w-screen">
            
              
           

            <div className="text-[25px] text-white pl-20">
              <h3 className="text-center">Tutor Finder</h3>

              <p className="text-[10px] text-center">TutorFinder was created by a group of Innovation Hub members from Botho University Maseru Campus, maojoring in Computing, <br />who saw a common challenge: students struggle to find reliable tutors when they need them most. We built TutorFinder to make it <br />easier for learners to connect with tutors privately, while also helping tutors showcase their skills and earn income.</p>

              <h3 className="text-center">Find your Perfect Tutor</h3>

                <p className="text-[10px] text-center">This app is designed to help students find tutors suitable for them quickly, to save them from the struggle of scrolling in the school <br />general and clustered whatsapp groups looking for tutor ads that might be in vain because there are no ads for the subject they want a tutor for. <br />Instead, they can use the TutorFinder, which is a platform that brings tutors in one place, for the sake of students, and to support tutoring businesses of students.</p><br /><br />
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                 <div>
                  {/*card-1*/}
                  <div className="relative rounded-lg shadow hover:bg-purple-700 w-[300px] p-6">
                        <div className="flex justify-center mb-6 ">
                           <div className="absolute -top-6 rounded-full p-4 bg-pink-300">
                                <MdVerifiedUser className="text-white text-2xl" />
                            </div>
                          </div>
                          <h3 className="text-center">Verified Tutors</h3>
                          <p className="text-[10px] text-left">All tutors on this platform undergo an evaluation process, and only the one our team find qualified are eligible to be on this app to offer services. After all we care for your education and bring only the best for you.</p>
                      </div>
                  </div>
                    {/*card-2*/}
                <div className="relative rounded-lg shadow hover:bg-purple-700 w-[300px] p-4">
                  <div className="flex justify-center mb-3 ">
                    <div className="absolute -top-6 rounded-full p-4 bg-pink-300">
                       <SiGnuprivacyguard className="text-white text-2xl" />
                    </div>
                  </div>
                 
                <h3 className="text-left">User Privacy protected</h3>
                  <p className="text-[10px] text-left">Only <span className="text-pink-300 text-lg">YOU</span> and the tutor can know that you take tutoring lessons. Also, you can choose whether you want one-on-one sessions with tutors available for that, or be grouped with others or take online tutoring. With us, you always have a choice.</p>
                </div>
                  {/*card-3*/}
                <div className="relative rounded-lg shadow hover:bg-purple-700 w-[300px] p-4">
                  <div className="flex justify-center mb-3 ">
                    <div className="absolute -top-6 rounded-full p-4 bg-pink-300">
                      <GiTakeMyMoney className="text-center text-2xl" />
                    </div>
                  </div>
                  
                  <h3 className="text-left">Affordable Rates</h3>
                  <p className="text-[10px] text-left">This platform helps you find a tutor of your choice that aligns with your budget. Since it is developed for students, we find it reasonable to keep the prices affordable to avoid imposing a financial challenge on you. We strive for your satisfaction, hence you can choose a tutor suitable for you and your budget.</p>
                </div>
             </div>
             </div>
             


            </div>



           
      

        </section>
           <footer className="bg-gray-900 text-gray-300 text-center py-6 w-full mx-0 px-0">
        <p>
          © {new Date().getFullYear()} TutorFinder. All rights reserved.
        </p>
      </footer><br />

      </div>


      <div>
        <section id="contact" className="bg-gradient-to-l from-violet-500 via-purple-900 to-black text-white text-center py-10 px-6 min-h-screen">
          <h1 className="text-2xl font-bold text-white">Contacts</h1><br />
          <h3 className="text-3xl font-semi-bold text-white">Have any query or problem? Please contact us through the following means:</h3><br />

          <h4 className="font-semi-bold text-white text-2xl">choose a means of communication that is convenient for you.</h4><br /><br />

           <p className="font-bold text-sky-500 text-2xl text-left">E-mail:</p>
        <div  className="font-bold text-white hover:text-white text-left">
          <a href="mailto:khothatso.tente@bothouniversity.com">userInterface@Khothatso Tente</a><br />
           <a href="mailto:retselisitsoe.maime@bothouniversity.com">Authentication@Rets'elisitsoe Maime</a><br />
            <a href="mailto:mohlolo.mohai@bothouniversity.com">profile Cards@Mr.Michael</a><br />
             <a href="mailto:thembiswa.lerotholi@bothouniversity.com">Platform Features@Thembiswa Lerotholi</a><br />

             <p className="font-bold text-sky-500 text-2xl text-left">Our contact details:</p>
             <a href="tel:56487290">Thembiswa Lerotholi</a><br />
             <a href="tel:58593934">Rets'elisitsoe Maime</a><br />
             <a href="tel:56846954">Khothatso Tente</a><br />
             <a href="tel:59574282">Mr.Michael</a><br />

             <h3 className="text-sky-500 text-left font-bold">Leave a message:</h3>
              <textarea name="message" id="message" placeholder="message:" className="bg-gray-600 text-white"></textarea><br />
              <button 
              onClick={()=> window.location.href = 'sms:58593934'}
              className="mt-6 px-6 py-3 bg-gradient-to-b from-gray-100 via-blue-300 to-black text-blue-900 rounded-lg shadow hover:bg-gray-100">
          Send Message
        </button>
        

        </div>




        </section>
           <footer className="bg-gray-900 text-gray-300 text-center py-6 w-full mx-0 px-0">
        <p>
          © {new Date().getFullYear()} TutorFinder. All rights reserved.
        </p>
      </footer><br />




      </div>


    </div>
  








  );
}
