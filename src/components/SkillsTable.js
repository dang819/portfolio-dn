'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as TWEEN from '@tweenjs/tween.js';

export default function SpherePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    let camera, scene, renderer, controls;
    const objects = [];

    function init() {
      // Camera setup
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
      camera.position.z = 1500;

      // Scene setup
      scene = new THREE.Scene();

      // Define an array of objects with custom properties
      const skills = [
        { id: 1, label: 'Javascript', years: 1, type:'FE', color: 'rgba(0, 255, 255, 0.7)' },
        { id: 2, label: 'CSS/SASS', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 3, label: 'Git', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 4, label: 'a11y', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 5, label: 'Vue.js', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 6, label: 'React.js', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 7, label: 'Redux', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 8, label: 'React Native', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 9, label: 'Agular', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 10, label: 'SiteSpect A/B', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 11, label: 'Figma', years: 1, type:'FE',  color: 'rgba(0, 255, 255, 0.7)' },
        { id: 12, label: 'Node.js', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 13, label: '.Net', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 14, label: 'PHP', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 15, label: 'SQL', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 16, label: 'NoSQL', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 17, label: 'REST', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 18, label: 'GraphQL', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 19, label: 'Azure', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 20, label: 'Launch Darkly', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 21, label: 'CI/CD', years: 1, type:'BE',  color: 'rgba(161, 105, 15, 0.7)' },
        { id: 22, label: 'k8s', years: 1, type:'FB',  color: 'rgba(161, 105, 15, 0.7)' },

      ];

      // Sphere layout
      const vector = new THREE.Vector3();
      skills.forEach((item, index) => {
        // Create main element container
        const element = document.createElement('div');
        element.className = 'element';
        element.style.width = '120px';
        element.style.height = '150px';
        element.style.backgroundColor = item.color;
        element.style.display = 'flex';
        element.style.flexDirection = 'column';
        element.style.justifyContent = 'space-between';
        element.style.padding = '8px';
        element.style.fontSize = '16px';
        element.style.fontWeight = 'bold';
        element.style.color = 'white';
        element.style.borderRadius = '8px';
      
        // Top section (Number)
        const number = document.createElement('div');
        number.style.textAlign = 'right';
        number.style.fontSize = '14px';
        number.style.opacity = '0.8';
        number.textContent = item.years;
        element.appendChild(number);
      
        // Middle section (Label)
        const label = document.createElement('div');
        label.style.textAlign = 'center';
        label.style.fontSize = '18px';
        label.style.flexGrow = '1';
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.justifyContent = 'center';
        label.textContent = item.label;
        element.appendChild(label);
      
        // Bottom section (Extra Label)
        const extra = document.createElement('div');
        extra.style.textAlign = 'left';
        extra.style.fontSize = '12px';
        extra.style.opacity = '0.7';
        extra.textContent = item.type;
        element.appendChild(extra);

        element.onmouseover = () => {
          element.style.animation = 'glowing 2s infinite';
        };
        element.onmouseout = () => {
          element.style.animation = 'none';
        };
        // Convert div into a CSS3DObject
        const object = new CSS3DObject(element);

        // Calculate spherical position
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(10 * Math.PI) * phi;

        object.position.setFromSphericalCoords(600, phi, theta);
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);

        scene.add(object);
        objects.push(object);
      });
      

      // Renderer setup
      renderer = new CSS3DRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);

      // Controls
      controls = new TrackballControls(camera, renderer.domElement);
      controls.minDistance = 500;
      controls.maxDistance = 3000;
      controls.addEventListener('change', render);

      // Resize handler
      window.addEventListener('resize', onWindowResize);

      // Animation loop
      animate();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
      controls.update();
    
      // Rotate the entire scene around Y-axis (spinning effect)
      scene.rotation.y += 0.0002; // Adjust speed as needed
    
      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    init();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative" ref={containerRef}>
      <div className="absolute left-0 right-0 text-center text-white work-copy txt-backdrop-skills">
        <h1 className="text-3xl font-bold ">Skills</h1>
        <p className="txt-skills">Below are some of the skills I&apos;ve acquired throughout my career; however, they represent just a glimpse of the expertise I&apos;ve had the opportunity to work within a professional environment. I&apos;m constantly learning and expanding my knowledge, and stepping outside my comfort zone with new tech stacks is always welcomed.</p>
      </div>
    </div>
  );
}
