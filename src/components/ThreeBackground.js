'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const pathname = usePathname();
  const canvasContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesMeshRef = useRef(null);
  const animationFrameRef = useRef(null);
  const initializedRef = useRef(false); // Prevents duplicate initializations


  // Initialize Three.js scene
  useEffect(() => {
    console.log("already initialized on route change? ThrreeBackground! - ", initializedRef);
    // Cleanup before initializing
    if (canvasContainerRef.current) {
      canvasContainerRef.current.innerHTML = '';
    }

    // Initialize Three.js
    if (!canvasContainerRef.current) return;

    // Create scene
    sceneRef.current = new THREE.Scene();
    
    // Create camera
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 5;
    
    // Create renderer
    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setClearColor(0x000000, 0);
    
    // Add renderer to DOM
    canvasContainerRef.current.appendChild(rendererRef.current.domElement);
    
    // Create a circular texture for particles
    const particleTexture = new THREE.TextureLoader().load(createCircleTexture());
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 900;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      map: particleTexture,
      transparent: true,
      color: 0x0c6bb8,
      opacity: 0.8,
      alphaTest: 0.01 // Helps with rendering transparent particles correctly
    });
    
    particlesMeshRef.current = new THREE.Points(particlesGeometry, particlesMaterial);
    sceneRef.current.add(particlesMeshRef.current);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    sceneRef.current.add(directionalLight);
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (particlesMeshRef.current) {
        // Rotate particles
        particlesMeshRef.current.rotation.x += 0.0005;
        particlesMeshRef.current.rotation.y += 0.0005;
        
        // Wave effect for particles
        const positions = particlesMeshRef.current.geometry.attributes.position.array;
        const time = Date.now() * 0.0001;
        const particlesCount = positions.length / 3;
        
        for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3;
          positions[i3 + 1] += Math.sin(time + positions[i3] * 0.3) * 0.005;
        }
        
        particlesMeshRef.current.geometry.attributes.position.needsUpdate = true;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Cleanup Function
    return () => {
      console.log("Cleanup function executed!");
      cancelAnimationFrame(animationFrameRef.current);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        rendererRef.current.domElement = null;
        rendererRef.current = null;
      }

      if (particlesMeshRef.current) {
        particlesMeshRef.current.geometry.dispose();
        particlesMeshRef.current.material.dispose();
        sceneRef.current.remove(particlesMeshRef.current);
        particlesMeshRef.current = null;
      }

      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          const object = sceneRef.current.children[0];
          if (object.geometry) object.geometry.dispose();
          if (object.material) object.material.dispose();
          sceneRef.current.remove(object);
        }
      }

      if (canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  // Function to create a circular texture
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    
    // Draw white circle
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
    
    // Create soft edges (gradient from center)
    const gradient = context.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.globalAlpha = 1;
    context.fillStyle = gradient;
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fill();
    
    return canvas.toDataURL();
  }

  return <div ref={canvasContainerRef} className="canvas-container" />;
}