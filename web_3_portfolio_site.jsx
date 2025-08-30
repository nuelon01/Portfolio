import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor, Settings } from "lucide-react";

// -------------------- DATA --------------------
const data = {
  pfp: "/images/JQEu0cOD_400x400.jpg", // Place your profile picture in /public/images/
  name: "Emmanuel Adenugba",
  title: "RWA Researcher | Community Builder",
  socials: [
    { name: "Gmail", url: "mailto:nxulltechnoogies@gmail.com" },
    { name: "Medium", url: "https://medium.com/@_Nxull" },
    { name: "Telegram", url: "https://t.me/N_Nxull" },
    { name: "Twitter", url: "https://x.com/_Nxull" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/emmanuel-adenugba" }
  ],
  skills: [
    "Web3 Research",
    "Community Building",
    "DeFi Analysis",
    "Content Writing",
    "Automation",
    "Portfolio Design"
  ],
  works: [
    {
      title: "Svim Finance",
      description: "Boosted X engagement by 15% in 2 months and managed Telegram community.",
      link: "#"
    },
    {
      title: "Centrifuge RWA Research",
      description: "Researched and published insights on real-world assets in DeFi.",
      link: "#"
    }
  ]
};

// -------------------- COMPONENT --------------------
export default function Portfolio() {
  const [theme, setTheme] = useState("system");
  const [activeSection, setActiveSection] = useState("about");
  const [modalWork, setModalWork] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "system";
    setTheme(saved);
    applyTheme(saved);

    const onScroll = () => {
      const sections = ["about", "skills", "works", "contact"];
      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sec);
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyTheme = (mode) => {
    let root = window.document.documentElement;
    if (mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const changeTheme = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    applyTheme(mode);
  };

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md z-50">
        <h1 className="font-bold text-xl text-gray-900 dark:text-white">{data.name}</h1>
        <div className="flex items-center gap-6">
          {['about','skills','works','contact'].map(sec => (
            <a key={sec} href={`#${sec}`} className={`${activeSection===sec?"text-cyan-600 dark:text-cyan-400":"text-gray-700 dark:text-gray-300"} font-medium hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors`}>
              {sec.charAt(0).toUpperCase()+sec.slice(1)}
            </a>
          ))}
          {/* Theme Switch */}
          <div className="relative group">
            <Settings className="w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300" />
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
              <button onClick={()=>changeTheme("system")} className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full"><Monitor size={16}/> System</button>
              <button onClick={()=>changeTheme("light")} className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full"><Sun size={16}/> Light</button>
              <button onClick={()=>changeTheme("dark")} className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full"><Moon size={16}/> Dark</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="about" className="min-h-screen flex flex-col justify-center items-center gap-6 px-6 pt-24">
        <img src={data.pfp} alt="pfp" className="w-32 h-32 rounded-full shadow-lg" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{data.title}</h2>
        <div className="flex gap-4">
          {data.socials.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{s.name}</a>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="min-h-screen px-8 py-24 bg-gray-50 dark:bg-gray-800 transition-colors">
        <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.skills.map((skill, idx) => (
            <motion.div key={skill} initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} transition={{delay:idx*0.1}} className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-gray-800 dark:text-gray-100">{skill}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Works */}
      <section id="works" className="min-h-screen px-8 py-24">
        <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.works.map(work => (
            <motion.div key={work.title} onClick={()=>setModalWork(work)} whileHover={{scale:1.02}} className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow cursor-pointer hover:shadow-xl transition">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{work.title}</h4>
              <p className="text-gray-700 dark:text-gray-300">{work.description}</p>
              <span className="text-cyan-600 dark:text-cyan-400 font-medium mt-2 inline-block">View</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalWork && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.8, opacity:0}} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-lg w-full">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{modalWork.title}</h4>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{modalWork.description}</p>
              <a href={modalWork.link} target="_blank" rel="noreferrer" className="mt-4 inline-block text-cyan-600 dark:text-cyan-400 hover:underline">Visit Project</a>
              <button onClick={()=>setModalWork(null)} className="mt-4 block ml-auto px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact */}
      <section id="contact" className="min-h-screen px-8 py-24 bg-gray-50 dark:bg-gray-800">
        <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">Contact</h3>
        <form action="https://formspree.io/f/yourFormId" method="POST" className="max-w-lg mx-auto flex flex-col gap-4">
          <input type="text" name="name" placeholder="Name" required className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          <input type="email" name="email" placeholder="Email" required className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          <textarea name="message" placeholder="Message" required className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"></textarea>
          <button type="submit" className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">Send</button>
        </form>
      </section>
    </div>
  );
}
