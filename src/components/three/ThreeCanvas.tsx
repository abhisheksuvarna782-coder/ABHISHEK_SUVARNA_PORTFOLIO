import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  className?: string;
}

export default function ThreeCanvas({ scrollProgress, mouseX, mouseY, className = '' }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  const mouseRef = useRef({ x: mouseX, y: mouseY });
  const [hudData, setHudData] = useState({ rotX: 0, rotY: 0, isDragging: false });

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Scene & Renderer Setup ---
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- Lighting (Architectural & Dynamic) ---
    const ambientLight = new THREE.AmbientLight(0xfffdfa, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff3db, 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xb5c4a5, 1.0);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Mouse-following 3D Point Light for interactive facet glints
    const cursorLight = new THREE.PointLight(0xd1a660, 2.8, 10);
    cursorLight.position.set(0, 0, 2.5);
    scene.add(cursorLight);

    // --- Master 3D Sculpture Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const updateGroupPosition = (w: number) => {
      if (w >= 1024) {
        masterGroup.position.set(1.4, 0.1, 0);
        masterGroup.scale.setScalar(1.05);
      } else if (w >= 768) {
        masterGroup.position.set(0.9, 0.1, -0.3);
        masterGroup.scale.setScalar(0.9);
      } else {
        masterGroup.position.set(0, 0.25, -0.6);
        masterGroup.scale.setScalar(0.78);
      }
    };
    updateGroupPosition(width);

    // --- 1. Polyhedral Crystalline Monolith ---
    const crystalGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xeee7d7,
      roughness: 0.22,
      metalness: 0.32,
      flatShading: true,
      transparent: true,
      opacity: 0.8,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    masterGroup.add(crystalMesh);

    // Outer wireframe edge accent
    const crystalWireGeo = new THREE.WireframeGeometry(crystalGeo);
    const crystalWireMat = new THREE.LineBasicMaterial({
      color: 0x777c5b,
      transparent: true,
      opacity: 0.8,
    });
    const crystalWire = new THREE.LineSegments(crystalWireGeo, crystalWireMat);
    masterGroup.add(crystalWire);

    // --- 2. Golden Vertex Anchor Nodes (True 3D Node Spheres) ---
    const vertexGroup = new THREE.Group();
    masterGroup.add(vertexGroup);
    const vPos = crystalGeo.attributes.position;
    const uniqueVerts: THREE.Vector3[] = [];
    for (let i = 0; i < vPos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(vPos, i);
      if (!uniqueVerts.some((uv) => uv.distanceTo(v) < 0.05)) {
        uniqueVerts.push(v);
      }
    }
    const vertexSphereGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const vertexSphereMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.85,
    });
    const vertexNodes = uniqueVerts.map((v) => {
      const m = new THREE.Mesh(vertexSphereGeo, vertexSphereMat);
      m.position.copy(v);
      vertexGroup.add(m);
      return { mesh: m, basePos: v.clone() };
    });

    // --- 3. Inner Counter-Rotating Neural Core ---
    const innerGeo = new THREE.OctahedronGeometry(0.72, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xa88a62,
      roughness: 0.2,
      metalness: 0.65,
      flatShading: true,
      transparent: true,
      opacity: 0.88,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    const innerWireGeo = new THREE.WireframeGeometry(innerGeo);
    const innerWireMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.95,
    });
    const innerWire = new THREE.LineSegments(innerWireGeo, innerWireMat);
    masterGroup.add(innerWire);

    // --- 4. Gyroscopic Architectural Rings ---
    const ringsGroup = new THREE.Group();
    masterGroup.add(ringsGroup);

    const ringDefs = [
      { r: 1.85, tube: 0.006, tilt: Math.PI * 0.12, color: 0xbdb7a6, speed: 0.02 },
      { r: 1.62, tube: 0.005, tilt: Math.PI * 0.42, color: 0x777c5b, speed: -0.025 },
      { r: 1.35, tube: 0.004, tilt: Math.PI * 0.68, color: 0xa88a62, speed: 0.035 },
    ];

    const ringMeshes = ringDefs.map((def) => {
      const geo = new THREE.TorusGeometry(def.r, def.tube, 12, 128);
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        roughness: 0.3,
        metalness: 0.5,
        transparent: true,
        opacity: 0.65,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = def.tilt;
      ringsGroup.add(mesh);
      return { mesh, def };
    });

    // --- 5. Orbiting Satellite Nodes ---
    const orbitCount = 14;
    const orbitGroup = new THREE.Group();
    masterGroup.add(orbitGroup);

    const orbitSphereGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const orbitSphereMat = new THREE.MeshStandardMaterial({
      color: 0x777c5b,
      metalness: 0.75,
      roughness: 0.2,
    });

    const satellites: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; yOffset: number; tilt: number }[] = [];
    for (let i = 0; i < orbitCount; i++) {
      const mesh = new THREE.Mesh(orbitSphereGeo, orbitSphereMat);
      orbitGroup.add(mesh);
      satellites.push({
        mesh,
        angle: (i / orbitCount) * Math.PI * 2,
        speed: 0.015 + (i % 3) * 0.008,
        radius: 1.5 + (i % 4) * 0.18,
        yOffset: ((i % 5) - 2) * 0.25,
        tilt: ((i % 3) - 1) * 0.35,
      });
    }

    // --- 6. Volumetric Particle Cloud ---
    const particleCount = 450;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBase = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colA = new THREE.Color(0xd6ceb8);
    const colB = new THREE.Color(0x777c5b);
    const colC = new THREE.Color(0xa88a62);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const px = radius * Math.sin(phi) * Math.cos(theta);
      const py = radius * Math.sin(phi) * Math.sin(theta);
      const pz = radius * Math.cos(phi);

      particlePositions[i * 3] = particleBase[i * 3] = px;
      particlePositions[i * 3 + 1] = particleBase[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = particleBase[i * 3 + 2] = pz;

      const pickColor = Math.random();
      const c = pickColor < 0.4 ? colA : pickColor < 0.7 ? colB : colC;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particleField);

    // --- 7. 3D Spatial Datum Floor Grid ---
    const gridHelper = new THREE.GridHelper(10, 24, 0x8a8e72, 0xd8d4c7);
    gridHelper.position.set(0, -2.1, 0);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.28;
    scene.add(gridHelper);

    // --- Interactive Mouse Drag / Orbit Logic ---
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let userRotX = 0;
    let userRotY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      setHudData((prev) => ({ ...prev, isDragging: true }));
    };

    const handlePointerMoveWindow = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      dragVelocityY = deltaX * 0.005;
      dragVelocityX = deltaY * 0.005;
      userRotY += dragVelocityY;
      userRotX += dragVelocityX;
    };

    const handlePointerUpWindow = () => {
      isDragging = false;
      setHudData((prev) => ({ ...prev, isDragging: false }));
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMoveWindow);
    window.addEventListener('pointerup', handlePointerUpWindow);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateGroupPosition(w);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animId: number;
    let frameCount = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frameCount++;

      const time = clock.getElapsedTime();
      const currentScroll = reducedMotion ? 0 : scrollRef.current;
      const currentMouse = reducedMotion ? { x: 0, y: 0 } : mouseRef.current;

      // Cursor point light tracking in 3D coordinate space
      cursorLight.position.x += (currentMouse.x * 2.8 - cursorLight.position.x) * 0.08;
      cursorLight.position.y += (currentMouse.y * 2.2 - cursorLight.position.y) * 0.08;

      // Drag inertia decay
      if (!isDragging) {
        userRotX += dragVelocityX;
        userRotY += dragVelocityY;
        dragVelocityX *= 0.92;
        dragVelocityY *= 0.92;
      }

      // Smooth decomposition progress along scroll
      const decompT = Math.min(1, Math.max(0, currentScroll * 1.8));
      const decompSmooth = decompT * decompT * (3 - 2 * decompT);

      // 3D Master Group Rotation
      const targetMouseRotX = currentMouse.y * 0.35 + userRotX;
      const targetMouseRotY = currentMouse.x * 0.45 + time * 0.05 + currentScroll * Math.PI * 0.8 + userRotY;

      masterGroup.rotation.x += (targetMouseRotX - masterGroup.rotation.x) * 0.05;
      masterGroup.rotation.y += (targetMouseRotY - masterGroup.rotation.y) * 0.05;

      // Throttle HUD update every 8 frames
      if (frameCount % 8 === 0) {
        const degX = Math.round((masterGroup.rotation.x * 180) / Math.PI) % 360;
        const degY = Math.round((masterGroup.rotation.y * 180) / Math.PI) % 360;
        setHudData({ rotX: degX, rotY: degY, isDragging });
      }

      // 3D Breathing & Scale
      const breathe = 1 + Math.sin(time * 0.8) * 0.03;
      const explodeScale = 1 + decompSmooth * 0.35;
      crystalMesh.scale.setScalar(breathe * explodeScale);
      crystalWire.scale.setScalar(breathe * explodeScale * 1.01);

      // Vertex nodes position update
      vertexNodes.forEach(({ mesh, basePos }) => {
        mesh.position.copy(basePos).multiplyScalar(breathe * explodeScale);
      });

      // Crystal facet transmission/opacity shifts with decomposition
      crystalMat.opacity = Math.max(0.3, 0.8 - decompSmooth * 0.35);

      // Inner neural core counter-rotates
      innerMesh.rotation.x = -time * 0.12;
      innerMesh.rotation.y = -time * 0.18 + currentScroll * Math.PI;
      innerMesh.rotation.z = Math.sin(time * 0.3) * 0.2;
      innerWire.rotation.copy(innerMesh.rotation);
      const innerScale = (0.72 + Math.sin(time * 1.4) * 0.04) * (1 + decompSmooth * 0.5);
      innerMesh.scale.setScalar(innerScale);
      innerWire.scale.setScalar(innerScale * 1.02);

      // Gyroscopic rings rotation
      ringMeshes.forEach(({ mesh, def }) => {
        mesh.rotation.y += def.speed;
        mesh.rotation.z = Math.sin(time * 0.4 + def.tilt) * 0.08;
        const ringScale = 1 + decompSmooth * 0.25;
        mesh.scale.setScalar(ringScale);
      });

      // Orbiting satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const x = Math.cos(sat.angle) * sat.radius;
        const z = Math.sin(sat.angle) * sat.radius;
        const y = Math.sin(sat.angle + sat.tilt) * 0.5 + sat.yOffset;
        sat.mesh.position.set(x, y, z);
      });

      // Volumetric particles pulsation
      const pAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const bx = particleBase[i * 3];
        const by = particleBase[i * 3 + 1];
        const bz = particleBase[i * 3 + 2];
        const pNoise = Math.sin(time * 0.7 + i) * 0.02;
        pAttr.setXYZ(
          i,
          bx * (1 + decompSmooth * 0.4) + pNoise,
          by * (1 + decompSmooth * 0.4) + pNoise,
          bz * (1 + decompSmooth * 0.4)
        );
      }
      pAttr.needsUpdate = true;

      // Floor grid subtle horizon movement
      gridHelper.position.z = (time * 0.1) % 0.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMoveWindow);
      window.removeEventListener('pointerup', handlePointerUpWindow);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      crystalWireGeo.dispose();
      crystalWireMat.dispose();
      vertexSphereGeo.dispose();
      vertexSphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      innerWireGeo.dispose();
      innerWireMat.dispose();
      ringMeshes.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      orbitSphereGeo.dispose();
      orbitSphereMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`three-canvas ${className}`}
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        cursor: hudData.isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* 3D Real-time Engineering Coordinate HUD */}
      <div className="three-canvas__hud" aria-hidden="true">
        <div className="three-canvas__hud-badge">
          <span className="three-canvas__hud-dot" />
          <span className="font-mono label">
            {hudData.isDragging ? 'ROTATING 3D CORES' : '3D SCULPTURE · DRAG TO ROTATE'}
          </span>
        </div>
        <div className="three-canvas__hud-coords font-mono">
          <span>X: {hudData.rotX}°</span>
          <span>Y: {hudData.rotY}°</span>
          <span>NODES: 476</span>
        </div>
      </div>
    </div>
  );
}
