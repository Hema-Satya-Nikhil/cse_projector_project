import { Code, Database, Smartphone, Globe, Github, Linkedin, Mail, Heart } from 'lucide-react';

const About = () => {
  const technologies = [
    { name: 'MongoDB', description: 'NoSQL database for data storage', icon: <Database className="h-6 w-6" /> },
    { name: 'Express.js', description: 'Backend framework', icon: <Code className="h-6 w-6" /> },
    { name: 'React.js', description: 'Frontend library', icon: <Globe className="h-6 w-6" /> },
    { name: 'Node.js', description: 'JavaScript runtime', icon: <Smartphone className="h-6 w-6" /> },
  ];

  const features = [
    'Faculty authentication system',
    'Real-time projector availability tracking',
    'Mark in-use and mark available functionality',
    'Booking system with conflict prevention',
    'Live activity feed',
    'Admin dashboard with analytics',
    'Responsive design for all devices',
    'Activity history and logs',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
      {/* Hero Section with Animation */}
      <div className="text-center mb-12 md:mb-16 animate-fade-in px-2">
        <div className="inline-block mb-4 md:mb-6">
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 md:mb-4 animate-pulse">
              About This Project
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-primary via-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-light px-4">
          A modern digital solution for managing departmental projectors, 
          replacing the traditional paper register system.
        </p>
      </div>

      {/* Purpose Section with Enhanced Design */}
      <div className="card mb-6 md:mb-8 animate-fade-in bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex flex-col sm:flex-row items-center sm:items-start">
          <div className="p-2 md:p-3 bg-gradient-to-br from-red-400 to-red-600 rounded-xl mb-2 sm:mb-0 sm:mr-3 shadow-lg">
            <Heart className="h-5 w-5 md:h-7 md:w-7 text-white" />
          </div>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Purpose</span>
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-base md:text-lg">
          This project was developed to modernize the projector management process in the 
          Computer Science and Engineering department. The traditional manual register system 
          was time-consuming and made it difficult for faculty to check projector availability 
          in real-time.
        </p>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg font-semibold mb-3 md:mb-4">
          The SMART PROJECTOR MANAGER provides a digital platform where faculty can:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mt-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-start p-2 md:p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center mr-2 md:mr-3 text-xs md:text-sm font-bold">✓</span>
              <span className="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Section with Modern Cards */}
      <div className="card mb-6 md:mb-8 animate-fade-in bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex flex-col sm:flex-row items-center sm:items-start">
          <div className="p-2 md:p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl mb-2 sm:mb-0 sm:mr-3 shadow-lg">
            <Code className="h-5 w-5 md:h-7 md:w-7 text-white" />
          </div>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center sm:text-left">Technologies Used (MERN Stack)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-primary"
            >
              <div className="bg-gradient-to-br from-primary to-blue-600 p-2 md:p-3 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-xs md:text-sm text-gray-600">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-md">
          <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-3 md:mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            Additional Technologies:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm text-gray-700">
            <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
              <span className="text-blue-600 mr-2">●</span>
              <strong className="mr-1 md:mr-2">Tailwind CSS</strong> - Modern utility-first CSS framework
            </div>
            <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
              <span className="text-purple-600 mr-2">●</span>
              <strong className="mr-1 md:mr-2">Vite</strong> - Fast build tool and dev server
            </div>
            <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
              <span className="text-green-600 mr-2">●</span>
              <strong className="mr-1 md:mr-2">JWT</strong> - Secure authentication
            </div>
            <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
              <span className="text-red-600 mr-2">●</span>
              <strong className="mr-1 md:mr-2">Mongoose</strong> - MongoDB object modeling
            </div>
            <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
              <span className="text-indigo-600 mr-2">●</span>
              <strong className="mr-1 md:mr-2">React Router</strong> - Client-side routing
            </div>
            <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
              <span className="text-yellow-600 mr-2">●</span>
              <strong className="mr-1 md:mr-2">Axios</strong> - HTTP client for API calls
            </div>
          </div>
        </div>
      </div>

      {/* Developers Section with Premium Design */}
      <div className="relative overflow-hidden card bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-300 shadow-2xl animate-fade-in">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-tr from-pink-400 to-purple-600 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 flex items-center justify-center">
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              👨‍💻👩‍💻 Meet Our Developers
            </span>
          </h2>
        
        {/* Developer 1: A. Hema Satya Nikhil */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 mb-6 md:mb-8 border-2 border-blue-200 hover:border-blue-400">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img 
                    src="https://i.postimg.cc/CLVTWpSp/Whats-App-Image-2025-11-08-at-17-34-36-bfd16349.jpg" 
                    alt="A. Hema Satya Nikhil"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                A. Hema Satya Nikhil
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4 flex items-center justify-center md:justify-start">
                <span className="px-3 md:px-4 py-1 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full shadow-md text-sm md:text-base">
                  Full Stack Developer (MERN)
                </span>
              </p>
              
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-3 md:p-4 rounded-xl">
                <p className="flex items-center justify-center md:justify-start text-gray-700 text-sm md:text-base">
                  <span className="font-bold text-primary mr-2">🎓 Department:</span> <span className="text-xs sm:text-sm md:text-base">Computer Science and Engineering</span>
                </p>
                <p className="flex items-center justify-center md:justify-start text-gray-700 text-sm md:text-base">
                  <span className="font-bold text-primary mr-2">💼 Role:</span> <span className="text-xs sm:text-sm md:text-base">Frontend Development, Backend API, Authentication</span>
                </p>
                <p className="flex items-center justify-center md:justify-start text-gray-700 text-sm md:text-base">
                  <span className="font-bold text-primary mr-2">🏛️ College:</span> <span className="text-xs sm:text-sm md:text-base">Srinivasa Institute of Engineering and Technology</span>
                </p>
              </div>

              {/* Contact Links with Better Styling */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                <a
                  href="mailto:satyanikhil24@gmail.com"
                  className="group relative inline-flex items-center space-x-1 md:space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  <Mail className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-semibold">Email</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1 md:space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  <Github className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-semibold">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/hema-satya-nikhil-964313320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1 md:space-x-2 px-4 md:px-6 py-2 md:py-3 bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-semibold">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-300 my-4 md:my-6"></div>

        {/* Developer 2: G. Sri Varshini */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 hover:border-pink-400">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img 
                    src="https://i.postimg.cc/JznTFpyc/Whats-App-Image-2025-11-08-at-17-37-51-b7599754.jpg" 
                    alt="G. Sri Varshini"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                G. Sri Varshini
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4 flex items-center justify-center md:justify-start">
                <span className="px-3 md:px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md text-sm md:text-base">
                  Full Stack Developer (MERN)
                </span>
              </p>
              
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 bg-gradient-to-br from-pink-50 to-purple-50 p-3 md:p-4 rounded-xl">
                <p className="flex items-center justify-center md:justify-start text-gray-700 text-sm md:text-base">
                  <span className="font-bold text-pink-600 mr-2">🎓 Department:</span> <span className="text-xs sm:text-sm md:text-base">Computer Science and Engineering</span>
                </p>
                <p className="flex items-center justify-center md:justify-start text-gray-700 text-sm md:text-base">
                  <span className="font-bold text-pink-600 mr-2">💼 Role:</span> <span className="text-xs sm:text-sm md:text-base">UI/UX Design, Frontend Components, Database</span>
                </p>
                <p className="flex items-center justify-center md:justify-start text-gray-700 text-sm md:text-base">
                  <span className="font-bold text-pink-600 mr-2">🏛️ College:</span> <span className="text-xs sm:text-sm md:text-base">Srinivasa Institute of Engineering and Technology</span>
                </p>
              </div>

              {/* Contact Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                <a
                  href="mailto:varshinigeddada@gmail.com"
                  className="group relative inline-flex items-center space-x-1 md:space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  <Mail className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-semibold">Email</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1 md:space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  <Github className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-semibold">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/sri-varshini-geddada-9a9591321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1 md:space-x-2 px-4 md:px-6 py-2 md:py-3 bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-semibold">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section with Better Design */}
        <div className="mt-6 md:mt-8 relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 md:p-8 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 text-center">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-white opacity-50 mx-auto mb-3 md:mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed px-2">
              Building digital solutions that simplify everyday college operations and 
              enhance the learning environment through technology.
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Credits with Modern Footer */}
      <div className="mt-8 md:mt-12 text-center px-2">
        <div className="inline-block bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 md:px-8 py-4 md:py-6 rounded-2xl shadow-lg border border-gray-200">
          <p className="text-gray-700 leading-relaxed mb-2 md:mb-3 text-xs sm:text-sm md:text-base">
            This project demonstrates modern web development practices and the MERN stack's capabilities 
            in creating real-world applications for educational institutions.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 font-semibold">
            © {new Date().getFullYear()} SMART PROJECTOR MANAGER
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Developed with ❤️ by A. Hema Satya Nikhil & G. Sri Varshini
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default About;
