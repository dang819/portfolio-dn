'use client';

import { useRouter } from 'next/navigation';
import { Briefcase, Code } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isReturning = searchParams.get('from') === 'internal';
  
  const [hoverSkills, setHoverSkills] = useState(false);
  const [hoverWork, setHoverWork] = useState(false);
  const [typedTitle, setTypedTitle] = useState(isReturning ? "Welcome 👋" : '');
  const [typedDescription, setTypedDescription] = useState(isReturning ? "Hi my name is Damian nice to meet you! Here's a glimpse of my professional journey—true understanding comes through connection. Feel free to explore, and let's get to know each other better." : '');
  const [showCursor, setShowCursor] = useState(!isReturning);
  const [animationComplete, setAnimationComplete] = useState(isReturning);
  
  const fullTitle = "Welcome 👋";
  const fullDescription = "Hi my name is Damian nice to meet you! Here's a glimpse of my professional journey—true understanding comes through connection. Feel free to explore, and let's get to know each other better.";
  
  // Typing effect for the title
  useEffect(() => {
    if (isReturning || typedTitle === fullTitle) return;
    
    const timeout = setTimeout(() => {
      setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
    }, 100); // Speed of typing (lower is faster)
    
    return () => clearTimeout(timeout);
  }, [typedTitle, fullTitle, isReturning]);
  
  // Typing effect for the description (starts after title is complete)
  useEffect(() => {
    if (isReturning || typedTitle !== fullTitle || typedDescription === fullDescription) return;
    
    const timeout = setTimeout(() => {
      setTypedDescription(fullDescription.substring(0, typedDescription.length + 1));
      
      // Check if this is the last character to be typed
      if (typedDescription.length + 1 === fullDescription.length) {
        // Set animation as complete when the last character is typed
        setAnimationComplete(true);
        
        // Keep cursor visible for a moment, then hide it
        setTimeout(() => {
          setShowCursor(false);
        }, 1500);
      }
    }, 30); // Speed of typing (lower is faster)
    
    return () => clearTimeout(timeout);
  }, [typedDescription, fullDescription, typedTitle, isReturning]);
  
  // Blinking cursor effect - only active during typing
  useEffect(() => {
    if (isReturning || animationComplete) return;
    
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Blink rate in milliseconds
    
    return () => clearInterval(interval);
  }, [animationComplete, isReturning]);

  const navigateTo = (path) => {
    if (path === '/skills') {
      // Full refresh seems to be needed in mobile :(
      window.location.href = `${path}?from=home`;
    } else {
      router.push(`${path}?from=home`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-5xl px-4 py-12">
        <div className="mb-16 text-center">
          <h1 className="text-6xl font-bold mb-4">
            {typedTitle}
            {!animationComplete && showCursor && <span className="opacity-100 transition-opacity duration-200">|</span>}
          </h1>
          <p className="text-xl text-gray-600">
            {typedDescription}
            {typedTitle === fullTitle && !animationComplete && showCursor && 
              <span className="opacity-100 transition-opacity duration-200">|</span>
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills Button */}
          <div 
            className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-500 transform hover:scale-[1.02]"
            onMouseEnter={() => setHoverSkills(true)}
            onMouseLeave={() => setHoverSkills(false)}
            onClick={() => navigateTo('/skills')}
          >
            <div className={`absolute inset-0 bg-blue-500 transition-opacity duration-500 ${hoverSkills ? 'opacity-90' : 'opacity-80'}`}>
              <div className="absolute right-0 top-0 w-48 h-48 transform translate-x-12 -translate-y-12">
                <div className="w-full h-full bg-blue-400 rounded-full opacity-50"></div>
              </div>
            </div>
            
            <div className="relative p-12 flex flex-col items-center justify-center min-h-64">
              <Code size={76} className="text-white mb-6" />
              <h2 className="text-4xl font-bold text-white mb-3">Skills</h2>
              <p className="text-white text-lg text-center">Explore my technical abilities and expertise</p>
            </div>
          </div>
          
          {/* Work Experience Button */}
          <div 
            className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-500 transform hover:scale-[1.02]"
            onMouseEnter={() => setHoverWork(true)}
            onMouseLeave={() => setHoverWork(false)}
            onClick={() => navigateTo('/work-experience')}
          >
            <div className={`absolute inset-0 bg-emerald-500 transition-opacity duration-500 ${hoverWork ? 'opacity-90' : 'opacity-80'}`}>
              <div className="absolute right-0 top-0 w-48 h-48 transform translate-x-12 -translate-y-12">
                <div className="w-full h-full bg-emerald-400 rounded-full opacity-50"></div>
              </div>
            </div>
            
            <div className="relative p-12 flex flex-col items-center justify-center min-h-64">
              <Briefcase size={76} className="text-white mb-6" />
              <h2 className="text-4xl font-bold text-white mb-3">Work Experience</h2>
              <p className="text-white text-lg text-center">Discover my professional background and achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}