import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const HomePage = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "Learning Made Simple";
  const typingSpeed = 150; // milliseconds per character
  const deletingSpeed = 50; // faster deletion speed
  const pauseTime = 2000; // time to pause when text is fully typed

  useEffect(() => {
    let timeout;

    if (!isDeleting && text === fullText) {
      // When text is fully typed, wait before starting to delete
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && text === "") {
      // When text is fully deleted, start typing again
      setIsDeleting(false);
    } else {
      // Handle typing and deleting
      timeout = setTimeout(() => {
        if (isDeleting) {
          setText(prev => prev.substring(0, prev.length - 1));
        } else {
          setText(prev => fullText.substring(0, prev.length + 1));
        }
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  // Simplified feature categories
  const features = [
    {
      title: "Administrative Tools",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Comprehensive tools for course management, student enrollment, and performance tracking.",
      color: "green"
    },
    {
      title: "Learning Experience",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      description: "Intuitive course browsing, progress tracking, and certificate management for students.",
      color: "blue"
    },
    {
      title: "Attendance Tracking",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: "Automated attendance monitoring with detailed reports and insights for both students and administrators.",
      color: "purple"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Clean Hero Section with Logo */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 pt-8 pb-4">
          <div className="flex items-center space-x-2 mb-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
            </svg>
            <span className="text-2xl font-bold">Mulund College of Commerce</span>
          </div>

          <div className="container mx-auto flex flex-col md:flex-row items-center justify-center py-12">
            <div className="md:w-1/2 mb-10 md:mb-0 flex flex-col justify-center items-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {text}
                <span className="inline-block w-1 h-6 md:h-10 bg-white ml-1 animate-pulse"></span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-indigo-100">A seamless platform that provides co-curricular courses.</p>
              <div className="flex flex-col justify-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/login" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-100 transition text-center">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
            <path d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,80C960,85,1056,75,1152,69.3C1248,64,1344,64,1392,64L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </header>

      {/* Subtle Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">A Complete Education Platform</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Streamlining the learning experience from enrollment to certification.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <div className={`bg-${feature.color}-100 text-${feature.color}-600 w-12 h-12 rounded-full flex items-center justify-center mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;