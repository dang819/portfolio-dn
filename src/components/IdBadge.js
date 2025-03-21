'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image'
import ThreeBackground from './ThreeBackground';

export default function IdBadge({
  index = 0,
  id = '000000',
  img = "./placeholder-user.png",
  fill = false,
  isActive = false,
  company = "N/A", 
  description = "No description available", 
  role = "No role assigned", 
  position = "No position", 
  type = "Unknown type", 
  department = "General",
  achievements = [
    'Achievement text one',
    'Achievement text two',
    'Achievement text three'
  ],
  startDate = "01/2024",
  endDate = "01/2025",
  duration = "YEARS DURATION",
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Calculate staggered delay based on index
    const staggerDelay = index * 1000; // 1s delay between each badge
    
    // Start animation after the staggered delay
    const startTimer = setTimeout(() => {
      setIsVisible(true);
    }, staggerDelay);
    
    // Set a timeout to remove the animating class after animation completes
    const endTimer = setTimeout(() => {
      setIsAnimating(false);
    }, staggerDelay + 1500); // Animation duration (1.2s) + buffer (0.3s)

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [index]);

  const handleBadgeClick = () => {
    // Only allow flipping if the initial animation is complete
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="badge-main-container">
      {index === 0 && <ThreeBackground />}
      
      <div className={`lanyard ${!isVisible ? 'invisible' : 'animate-drop'}`}>
        <div className={`lanyard-strap left ${!isActive && 'lanyard--inactive'}`} />
        <div className={`lanyard-strap right ${!isActive && 'lanyard--inactive'}`} />
        <div className="lanyard-clip left" />
        <div className="lanyard-clip right" />
      </div>
      
      <div className={`badge-container ${isVisible ? 'animate-drop' : 'pre-animation'}`}>
        <div className={`badge ${isFlipped ? 'flipped' : ''}`} onClick={handleBadgeClick}>
          <div className={`badge-front ${!isActive ? 'badge--inactive-bg': ''}`}>
            <div className={`badge-header ${!isActive ? 'badge--inactive': ''}`}>
              <h2>{company.toUpperCase()}</h2>
              <p>{description}</p>
            </div>
            <div className='badge-middle-section'>
              <div className="badge-photo">
                <Image width={100} height={100} className={`${fill && "badge-photo--fill"} ${!isActive && "badge--grayscale"}`} src={img ?? "/placeholder-user.png"} alt="Doctor profile" />
              </div>
              <div className="badge-info">
                <h3>{role.toUpperCase()}</h3>
                <p>{position.toUpperCase()}</p>
              </div>
              <div className="badge-id">
                <p>ID: {id}</p>
              </div>
            </div>
            <div className={`badge-role ${!isActive ? 'badge--inactive': ''}`}>
              {type.toUpperCase()}
            </div>
            <div className="badge-footer">
              <p>{department.toUpperCase()}</p>
            </div>
          </div>
          <div className={`badge-back ${!isActive ? 'badge--inactive-bg': ''}`}>
            <div className={`badge-header ${!isActive ? 'badge--inactive': ''}`}>
              <h2>{company.toUpperCase()}</h2>
              <p>Achievements</p>
            </div>
            <div className='badge-middle-section'>
            <div className={`badge-details ${achievements.length > 3 ? 'bg-overflow' : ''}`}>
            <ul>
                  {achievements.map((achievement, index) => (<li key={index}>{achievement}</li>))}
                </ul>
              </div>
              <div className="badge-dates">
                <p><b>Joined Date:</b> {startDate}</p>
                <p><b>Expire Date:</b> {endDate}</p>
              </div>
              <div className="badge-barcode">
                <Image width={100} height={100} src={`${isActive ? '/placeholder-barcode.png': '/no-barcode.png'}`} alt="Barcode" />
              </div>
            </div>
            <div className="badge-footer">
              <p>{duration}</p>
            </div>
          </div>
        </div>
        <p className="card-instruction">Click the badge to flip</p>
      </div>

      <style jsx>{`
        /* Animation styles */
        @keyframes dropBounce {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          70% {
            transform: translateY(20px);
            opacity: 1;
          }
          85% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        .pre-animation {
          opacity: 0;
          transform: translateY(-100vh);
        }
        
        .animate-drop {
          animation: dropBounce 1.2s ease-in-out forwards;
        }
        
        /* Prevent flipping during initial animation */
        .animate-drop.isAnimating .badge {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}