import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";

export default function App() {

   const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
      <div className={`${darkMode ? "bg-black text-white" : "bg-white text-gray-900"} font-sans min-w-screen `}>
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-indigo-900 via-blue-900 to-black">
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
        <div className="md:hidden flex flex-col space-y-4 px-6 py-4 bg-gradient-to-b from-indigo-900 to-black">
          <a href="#about" className="hover:text-indigo-400">About Us</a>
          <a href="#tutors" className="hover:text-indigo-400">Tutors</a>
          <a href="#contact" className="hover:text-indigo-400">Contact Us</a>
        </div>
      )}
    <div className="font-sans min-w-screen ">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white text-center py-10 px-6 min-h-screen">
        <h1 className="text-4xl md:text-6xl font-bold ">
          Find Your Perfect Tutor
        </h1>

        <h2 className="text-3xl font-bold mt-20 mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className=" bg-gradient-to-b from-gray-900 via-blue-900 to-black shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
            <p className="text-white">
              All tutors are background-checked and verified by our team.
            </p>
          </div>
          <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-black shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-white">
              Book sessions at your convenience, online or in-person.
            </p>
          </div>
          <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-black shadow-lg rounded-xl p-6">
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

        <section id="about" className="bg-gradient-to-b from-gray-700 via-blue-400 to-black text-white text-center py-10 px-6 min-h-screen">

        <h4 className="text-4xl font-bold text-white p-5">About This App</h4> <br />

         <div className="flex py-5 px-7 relative bottom-10 min-w-screen">
            <div className="flex flex-col md:flex-row">
              <img src="src\assets\about-pic.jpeg" className="w-400 h-90 rounded-lg shadow-xl w-full md:w-1/2 sm:w-1/3 h-full" alt="tutor and student photo" />
           

            <div className="text-[25px] text-white pl-20">
              <h3 className="text-left">Tutor Finder</h3>

              <p className="text-[10px] text-left">TutorFinder was created by a group of Innovation Hub members from Botho University Maseru Campus, maojoring in Computing, who saw a common challenge: students struggle to find reliable tutors when they need them most. We built TutorFinder to make it easier for learners to connect with tutors privately, while also helping tutors showcase their skills and earn income.</p>

              <h3 className="text-left">Find your Perfect Tutor</h3>

                <p className="text-[10px] text-left">This app is designed to help students find tutors suitable for them quickly, to save<br/> them from the struggle of scrolling in the school general and clustered whatsapp groups<br/> looking for tutor ads that might be in vain because there are no ads<br/> for the subject they want a tutor for. Instead, they can use the TutorFinder, which is a platform that brings tutors<br/> in one place, for the sake of students, and to support tutoring businesses of students.</p>
                <h3 className="text-left">Verified Tutors</h3>
                <p className="text-[10px] text-left">All tutors on this platform undergo an evaluation process, and only the one our team find qualified are eligible to be on this app to offer services. After all we care for your education and bring only the best for you.</p>
                <h3 className="text-left">User Privacy protected</h3>
                <p className="text-[10px] text-left">Only <span className="text-pink-300">YOU</span> and the tutor can know that you take tutoring lessons. Also, you can choose whether you want one-on-one sessions with tutors available for that, or be grouped with others or take online tutoring. With us, you always have a choice.</p>
                <h3 className="text-left">Affordable Rates</h3>
                <p className="text-[10px] text-left">This platform helps you find a tutor of your choice that aligns with your budget. Since it is developed for students, we find it reasonable to keep the prices affordable to avoid imposing a financial challenge on you. We strive for your satisfaction, hence you can choose a tutor suitable for you and your budget.</p>
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
        <section id="contact" className="bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white text-center py-10 px-6 min-h-screen">
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
              <button className="mt-6 px-6 py-3 bg-gradient-to-b from-gray-100 via-blue-300 to-black text-blue-900 rounded-lg shadow hover:bg-gray-100">
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
