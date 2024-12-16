
const About = () => {
  const teamMembers = [
    {
      name: "Asep Nur Arifin",
      role: "Data Science Manager",
      image: "./img2.jpg",
      bio: "Experienced in leading data-driven projects and building machine learning models.",
      skills: ["Python", "SQL", "Machine Learning"],
      social: {
        github: "https://github.com/asepnur",
        linkedin: "https://linkedin.com/in/asepnur"
      }
    },
    {
      name: "Fitriani", 
      role: "IT Support",
      image: "./img4.jpg",
      bio: "Expert in providing technical support and maintaining IT infrastructure.",
      skills: ["Troubleshooting", "Network Administration", "Hardware"],
      social: {
        github: "https://github.com/fitriani",
        linkedin: "https://linkedin.com/in/fitriani"
      }
    },
    {
      name: "Adib Muhammad Maros",
      role: "Full Stack Web Developer",
      image: "./img1.jpg",
      bio: "Skilled in developing robust and scalable web applications.",
      skills: ["React", "Node.js", "MongoDB"],
      social: {
        github: "https://github.com/adibmaros",
        linkedin: "https://linkedin.com/in/adibmaros"
      }
    },
    {
      name: "Muhammad Fattan Attaur Rahman",
      role: "Game Developer", 
      image: "./img3.jpg",
      bio: "Passionate about creating immersive gaming experiences.",
      skills: ["Unity", "C#", "Unreal Engine"],
      social: {
        github: "https://github.com/fattanrahman",
        linkedin: "https://linkedin.com/in/fattanrahman"
      }
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Team </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 mb-2">
            Waktu terbaik untuk melakukan sesuatu dengan maksimal adalah 10 tahun yang lalu, setelah itu, saat ini.
          </p>
        
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative pb-2/3">
                <img 
                  className="h-[230px] w-full object-cover"
                  src={member.image}
                  alt={member.name}
                  onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm font-medium text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a 
                    href={member.social.github}
                    className="text-gray-600 hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href={member.social.linkedin}
                    className="text-gray-600 hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     <div>
     <a className="font-mono flex justify-center mt-10 text-center m-auto hover:text-blue-600" href="https://marble-reaper-698.notion.site/Slide-Penjelasan-UAS-PBO-15ce60b9823480968624ef4b76750010?pvs=4">Slide Penjelasan</a>
     </div>
    </div>
  );
};

export default About;
