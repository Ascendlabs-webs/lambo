import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { VEHICLE_HOTSPOTS } from '../../data/models';
import { HotspotAnnotation, ExteriorColorOption, CaliperOption, WheelOption, AeroPackageOption } from '../../types/automotive';
import { Rotate3d, ZoomIn, ZoomOut, Compass, Sparkles, Check } from 'lucide-react';

interface CarVisualizerProps {
  colorHex?: string;
  caliperHex?: string;
  wheelStyle?: string;
  aeroPackage?: string;
  activeHotspotId?: string | null;
  onSelectHotspot?: (hotspot: HotspotAnnotation | null) => void;
  interactive?: boolean;
  cameraPreset?: 'front34' | 'side' | 'rear' | 'wheels' | 'top';
  className?: string;
}

export const CarVisualizer: React.FC<CarVisualizerProps> = ({
  colorHex = '#E5A823',
  caliperHex = '#FACC15',
  wheelStyle = 'forged-alloy',
  aeroPackage = 'pkg-standard',
  activeHotspotId = null,
  onSelectHotspot,
  interactive = true,
  cameraPreset = 'front34',
  className = 'w-full h-full min-h-[500px]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const bodyMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const caliperMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const wheelsGroupRef = useRef<THREE.Group[]>([]);
  const rearWingRef = useRef<THREE.Group | null>(null);

  // Target camera orbit state
  const targetRotation = useRef({ x: 0.28, y: -0.65 });
  const currentRotation = useRef({ x: 0.28, y: -0.65 });
  const targetDistance = useRef(5.8);
  const currentDistance = useRef(5.8);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Hotspot screen positions
  const [screenHotspots, setScreenHotspots] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([]);
  const [activeInfoHotspot, setActiveInfoHotspot] = useState<HotspotAnnotation | null>(null);

  // Setup Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.08);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4, 2.2, 5);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Warm Key Light (Luxury Studio)
    const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.4);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Cool Rim Light
    const rimLight = new THREE.DirectionalLight(0x7090b8, 3.2);
    rimLight.position.set(-6, 4, -6);
    scene.add(rimLight);

    // Front Accent Light for Lambo Y-LEDs
    const frontGlowLight = new THREE.PointLight(0xffbe3b, 1.8, 12);
    frontGlowLight.position.set(0, 0.6, 3.5);
    scene.add(frontGlowLight);

    // Underbody Neon / Floor Reflection Light
    const underLight = new THREE.PointLight(0xd4af37, 0.8, 8);
    underLight.position.set(0, -0.2, 0);
    scene.add(underLight);

    // Ground Studio Floor with Shadow Receiver
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x08080b,
      roughness: 0.45,
      metalness: 0.85,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.55;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle Ground Grid Lines
    const gridHelper = new THREE.GridHelper(24, 24, 0x22222a, 0x111116);
    gridHelper.position.y = -0.548;
    scene.add(gridHelper);

    // Floating Atmospheric Dust Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = Math.random() * 4 - 0.3;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe5a823,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // PROCEDURAL ULTRA-PREMIUM SUPERCAR MODEL
    // ==========================================
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;
    bodyMaterialsRef.current = [];
    caliperMaterialsRef.current = [];
    wheelsGroupRef.current = [];

    // Body Paint Material
    const carPaintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colorHex),
      metalness: 0.88,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });
    bodyMaterialsRef.current.push(carPaintMat);

    // Carbon Fiber Material
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x121214,
      metalness: 0.4,
      roughness: 0.55,
    });

    // Dark Tinted Glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.7,
      transparent: true,
      opacity: 0.88,
    });

    // Glowing LED Lights
    const ledMat = new THREE.MeshBasicMaterial({
      color: 0xffe680,
    });
    const redLedMat = new THREE.MeshBasicMaterial({
      color: 0xff1122,
    });

    // 1. Lower Wedge Chassis / Monocoque
    const monocoqueGeo = new THREE.BoxGeometry(1.85, 0.35, 4.3);
    const monocoqueMesh = new THREE.Mesh(monocoqueGeo, carPaintMat);
    monocoqueMesh.position.set(0, 0, 0);
    monocoqueMesh.castShadow = true;
    carGroup.add(monocoqueMesh);

    // 2. Front Nose Cone (Sharp Lamborghini Wedge)
    const noseGeo = new THREE.ConeGeometry(0.95, 1.4, 4);
    const noseMesh = new THREE.Mesh(noseGeo, carPaintMat);
    noseMesh.rotation.x = Math.PI / 2;
    noseMesh.rotation.y = Math.PI / 4;
    noseMesh.scale.set(1.4, 0.28, 0.9);
    noseMesh.position.set(0, -0.04, 2.45);
    noseMesh.castShadow = true;
    carGroup.add(noseMesh);

    // 3. Cabin Greenhouse Roof (Stealth Fighter Jet Cockpit)
    const cabinGeo = new THREE.BoxGeometry(1.35, 0.44, 2.1);
    const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
    cabinMesh.position.set(0, 0.35, -0.15);
    cabinMesh.castShadow = true;
    carGroup.add(cabinMesh);

    // Cabin Roof Carbon Blade
    const roofBladeGeo = new THREE.BoxGeometry(1.28, 0.05, 1.9);
    const roofBlade = new THREE.Mesh(roofBladeGeo, carbonMat);
    roofBlade.position.set(0, 0.58, -0.15);
    carGroup.add(roofBlade);

    // Windshield Slanted Glass
    const windshieldGeo = new THREE.BufferGeometry();
    const windshieldVertices = new Float32Array([
      -0.65, 0.55, 0.8,
       0.65, 0.55, 0.8,
      -0.85, 0.18, 1.7,

       0.65, 0.55, 0.8,
       0.85, 0.18, 1.7,
      -0.85, 0.18, 1.7,
    ]);
    windshieldGeo.setAttribute('position', new THREE.BufferAttribute(windshieldVertices, 3));
    windshieldGeo.computeVertexNormals();
    const windshieldMesh = new THREE.Mesh(windshieldGeo, glassMat);
    carGroup.add(windshieldMesh);

    // 4. Front Carbon Splitter & Air Ducts
    const splitterGeo = new THREE.BoxGeometry(1.98, 0.06, 0.7);
    const splitter = new THREE.Mesh(splitterGeo, carbonMat);
    splitter.position.set(0, -0.16, 2.4);
    splitter.castShadow = true;
    carGroup.add(splitter);

    // 5. Signature Y-Shaped Headlights (Lamborghini DNA)
    const createYLight = (isRight: boolean) => {
      const yGroup = new THREE.Group();
      const xSign = isRight ? 1 : -1;
      
      const stemGeo = new THREE.BoxGeometry(0.04, 0.03, 0.4);
      const stem = new THREE.Mesh(stemGeo, ledMat);
      stem.position.set(xSign * 0.65, 0.08, 2.3);
      yGroup.add(stem);

      const branch1Geo = new THREE.BoxGeometry(0.3, 0.03, 0.04);
      const branch1 = new THREE.Mesh(branch1Geo, ledMat);
      branch1.rotation.y = xSign * 0.45;
      branch1.position.set(xSign * 0.78, 0.08, 2.42);
      yGroup.add(branch1);

      return yGroup;
    };
    carGroup.add(createYLight(false));
    carGroup.add(createYLight(true));

    // 6. Rear Hexagonal Exhaust & Diffuser
    const exhaustGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 6);
    const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x333338, metalness: 0.95, roughness: 0.2 });
    
    const exhaustL = new THREE.Mesh(exhaustGeo, exhaustMat);
    exhaustL.rotation.x = Math.PI / 2;
    exhaustL.position.set(-0.25, 0.15, -2.18);
    carGroup.add(exhaustL);

    const exhaustR = new THREE.Mesh(exhaustGeo, exhaustMat);
    exhaustR.rotation.x = Math.PI / 2;
    exhaustR.position.set(0.25, 0.15, -2.18);
    carGroup.add(exhaustR);

    // Rear Taillights (Y-Shaped Red)
    const tailGeo = new THREE.BoxGeometry(0.65, 0.04, 0.05);
    const tailL = new THREE.Mesh(tailGeo, redLedMat);
    tailL.position.set(-0.55, 0.18, -2.16);
    carGroup.add(tailL);

    const tailR = new THREE.Mesh(tailGeo, redLedMat);
    tailR.position.set(0.55, 0.18, -2.16);
    carGroup.add(tailR);

    // 7. Active Aerodynamic Rear Wing
    const wingGroup = new THREE.Group();
    wingGroup.position.set(0, 0.35, -1.9);

    const wingBladeGeo = new THREE.BoxGeometry(1.9, 0.05, 0.4);
    const wingBlade = new THREE.Mesh(wingBladeGeo, carbonMat);
    wingBlade.position.set(0, 0.15, 0);
    wingGroup.add(wingBlade);

    // Wing Struts
    const strutGeo = new THREE.BoxGeometry(0.04, 0.25, 0.15);
    const strutL = new THREE.Mesh(strutGeo, carbonMat);
    strutL.position.set(-0.45, 0.02, 0);
    wingGroup.add(strutL);

    const strutR = new THREE.Mesh(strutGeo, carbonMat);
    strutR.position.set(0.45, 0.02, 0);
    wingGroup.add(strutR);

    carGroup.add(wingGroup);
    rearWingRef.current = wingGroup;

    // 8. Wheels, Rotors & Calipers
    const wheelPositions = [
      { x: -0.96, y: -0.22, z: 1.45 }, // Front Left
      { x: 0.96, y: -0.22, z: 1.45 },  // Front Right
      { x: -0.98, y: -0.20, z: -1.45 }, // Rear Left
      { x: 0.98, y: -0.20, z: -1.45 },  // Rear Right
    ];

    const tireMat = new THREE.MeshStandardMaterial({ color: 0x111112, roughness: 0.85, metalness: 0.1 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.2, metalness: 0.95 });
    const rotorMat = new THREE.MeshStandardMaterial({ color: 0x47474f, roughness: 0.35, metalness: 0.8 });
    const caliperMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(caliperHex), roughness: 0.25, metalness: 0.7 });
    caliperMaterialsRef.current.push(caliperMat);

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, pos.y, pos.z);

      // Tire
      const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 24);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      // Rim Spokes
      const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.27, 10);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      // Carbon Ceramic Rotor
      const rotorGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 20);
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.rotation.z = Math.PI / 2;
      wheelGroup.add(rotor);

      // Caliper
      const caliperGeo = new THREE.BoxGeometry(0.08, 0.14, 0.1);
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(pos.x > 0 ? -0.06 : 0.06, 0.11, 0.08);
      wheelGroup.add(caliper);

      carGroup.add(wheelGroup);
      wheelsGroupRef.current.push(wheelGroup);
    });

    scene.add(carGroup);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let time = 0;
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      time += 0.015;

      // Smooth interpolation of rotation and zoom
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;
      currentDistance.current += (targetDistance.current - currentDistance.current) * 0.08;

      // Orbit camera based on spherical coords
      const cam = cameraRef.current;
      if (cam) {
        const phi = Math.max(0.08, Math.min(Math.PI / 2 - 0.05, currentRotation.current.x));
        const theta = currentRotation.current.y;
        const d = currentDistance.current;

        cam.position.x = d * Math.sin(theta) * Math.cos(phi);
        cam.position.y = Math.max(0.2, d * Math.sin(phi));
        cam.position.z = d * Math.cos(theta) * Math.cos(phi);
        cam.lookAt(0, 0.1, 0);

        // Project 3D Hotspot Coordinates to 2D Screen
        if (container && onSelectHotspot) {
          const w = container.clientWidth;
          const h = container.clientHeight;
          const updatedCoords = VEHICLE_HOTSPOTS.map((spot) => {
            const v = new THREE.Vector3(spot.position[0], spot.position[1], spot.position[2]);
            // If carGroup is transformed, apply world transform
            v.applyMatrix4(carGroup.matrixWorld);
            v.project(cam);

            const isFront = v.z < 1;
            const x = (v.x * 0.5 + 0.5) * w;
            const y = (-(v.y * 0.5) + 0.5) * h;
            return {
              id: spot.id,
              x,
              y,
              visible: isFront && x >= 0 && x <= w && y >= 0 && y <= h,
            };
          });
          setScreenHotspots(updatedCoords);
        }
      }

      // Gentle floating vehicle suspension breath
      if (carGroupRef.current) {
        carGroupRef.current.position.y = Math.sin(time * 1.5) * 0.015;
      }

      // Particle gentle drift
      if (particles) {
        particles.rotation.y = time * 0.04;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update Paint Color dynamically
  useEffect(() => {
    bodyMaterialsRef.current.forEach((mat) => {
      mat.color.set(colorHex);
    });
  }, [colorHex]);

  // Update Caliper Color dynamically
  useEffect(() => {
    caliperMaterialsRef.current.forEach((mat) => {
      mat.color.set(caliperHex);
    });
  }, [caliperHex]);

  // Update Aero Wing according to aero package
  useEffect(() => {
    if (!rearWingRef.current) return;
    if (aeroPackage === 'pkg-carbon') {
      rearWingRef.current.scale.set(1.15, 1.25, 1.15);
      rearWingRef.current.position.y = 0.48;
    } else if (aeroPackage === 'pkg-perf') {
      rearWingRef.current.scale.set(1.05, 1.1, 1.05);
      rearWingRef.current.position.y = 0.4;
    } else {
      rearWingRef.current.scale.set(1.0, 1.0, 1.0);
      rearWingRef.current.position.y = 0.35;
    }
  }, [aeroPackage]);

  // Camera Presets
  const applyCameraPreset = (preset: 'front34' | 'side' | 'rear' | 'wheels' | 'top') => {
    switch (preset) {
      case 'front34':
        targetRotation.current = { x: 0.28, y: -0.65 };
        targetDistance.current = 5.8;
        break;
      case 'side':
        targetRotation.current = { x: 0.15, y: -Math.PI / 2 };
        targetDistance.current = 5.5;
        break;
      case 'rear':
        targetRotation.current = { x: 0.25, y: 2.8 };
        targetDistance.current = 5.6;
        break;
      case 'wheels':
        targetRotation.current = { x: 0.18, y: -1.1 };
        targetDistance.current = 3.6;
        break;
      case 'top':
        targetRotation.current = { x: 1.35, y: -0.5 };
        targetDistance.current = 6.8;
        break;
    }
  };

  useEffect(() => {
    applyCameraPreset(cameraPreset);
  }, [cameraPreset]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !interactive) return;
    const deltaX = e.clientX - previousMouse.current.x;
    const deltaY = e.clientY - previousMouse.current.y;
    previousMouse.current = { x: e.clientX, y: e.clientY };

    targetRotation.current.y += deltaX * 0.008;
    targetRotation.current.x = Math.max(0.06, Math.min(1.4, targetRotation.current.x + deltaY * 0.008));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    e.preventDefault();
    targetDistance.current = Math.max(3.2, Math.min(9.0, targetDistance.current + e.deltaY * 0.005));
  };

  return (
    <div
      className={`relative select-none overflow-hidden bg-gradient-to-b from-[#060608] to-[#0a0a0e] ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Hotspot Pins (labels specified in prompt) */}
      {interactive &&
        screenHotspots.map((spot) => {
          if (!spot.visible) return null;
          const hotspotData = VEHICLE_HOTSPOTS.find((h) => h.id === spot.id);
          if (!hotspotData) return null;
          const isSelected = activeHotspotId === spot.id || activeInfoHotspot?.id === spot.id;

          return (
            <div
              key={spot.id}
              style={{
                left: `${spot.x}px`,
                top: `${spot.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveInfoHotspot(activeInfoHotspot?.id === spot.id ? null : hotspotData);
                  onSelectHotspot?.(hotspotData);
                }}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-none backdrop-blur-md transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#E5A823] text-black border-[#E5A823] shadow-[0_0_20px_rgba(229,168,35,0.6)]'
                    : 'bg-black/70 hover:bg-black/90 text-white/90 border-white/20 hover:border-[#E5A823]/80'
                }`}
                title={`Inspect ${hotspotData.title}`}
              >
                <span className={`w-2 h-2 rotate-45 transition-colors ${isSelected ? 'bg-black' : 'bg-[#E5A823]'}`} />
                <span className="text-[11px] font-bold tracking-widest uppercase">{hotspotData.title}</span>
              </button>
            </div>
          );
        })}

      {/* Active Hotspot Information Panel (Drawer Modal) */}
      {activeInfoHotspot && (
        <div className="absolute top-6 right-6 z-30 w-80 max-w-[calc(100vw-3rem)] p-5 lambo-glass text-left border-l-2 border-l-[#E5A823] shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#E5A823] uppercase">
                {activeInfoHotspot.category}
              </span>
              <h4 className="text-base font-bold text-white tracking-wide mt-0.5">{activeInfoHotspot.title}</h4>
            </div>
            <button
              onClick={() => setActiveInfoHotspot(null)}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close hotspot info"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-xs text-zinc-300 leading-relaxed font-sans">{activeInfoHotspot.description}</p>

          <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
            {activeInfoHotspot.specs.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">{item.label}</span>
                <span className="font-mono-num font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Floating Camera Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs">
        <button
          onClick={() => applyCameraPreset('front34')}
          className="px-3 py-1.5 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wider"
        >
          3/4 View
        </button>
        <button
          onClick={() => applyCameraPreset('side')}
          className="px-3 py-1.5 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wider"
        >
          Side
        </button>
        <button
          onClick={() => applyCameraPreset('rear')}
          className="px-3 py-1.5 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wider"
        >
          Diffuser
        </button>
        <button
          onClick={() => applyCameraPreset('wheels')}
          className="px-3 py-1.5 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wider"
        >
          Wheels
        </button>

        <div className="w-[1px] h-4 bg-white/15 mx-1" />

        <button
          onClick={() => {
            targetDistance.current = Math.max(3.2, targetDistance.current - 0.7);
          }}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => {
            targetDistance.current = Math.min(8.5, targetDistance.current + 0.7);
          }}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Orbit Helper Tip */}
      <div className="absolute top-5 left-5 z-10 hidden sm:flex items-center gap-2 text-[11px] tracking-widest text-zinc-400 uppercase font-mono bg-black/40 backdrop-blur-sm px-3 py-1.5 border border-white/10">
        <Rotate3d className="w-3.5 h-3.5 text-[#E5A823]" />
        <span>360° Drag to Rotate · Scroll to Zoom</span>
      </div>
    </div>
  );
};
