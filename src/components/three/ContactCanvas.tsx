import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ContactCanvasProps {
  isPulsing?: boolean;
}

export default function ContactCanvas({ isPulsing = false }: ContactCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef(isPulsing);

  useEffect(() => {
    pulseRef.current = isPulsing;
  }, [isPulsing]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeacc, 1.6);
    dirLight.position.set(3, 4, 3);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x9aa88e, 0.8);
    backLight.position.set(-3, -2, -2);
    scene.add(backLight);

    // Group
    const group = new THREE.Group();
    scene.add(group);

    // Outer Dodecahedron — Faceted Radar Shell
    const outerGeo = new THREE.DodecahedronGeometry(1.0, 0);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xeee7d7,
      roughness: 0.3,
      metalness: 0.4,
      flatShading: true,
      transparent: true,
      opacity: 0.72,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Outer wireframe
    const wireGeo = new THREE.WireframeGeometry(outerGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x777c5b,
      transparent: true,
      opacity: 0.85,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    group.add(wireMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(0.5, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xa88a62,
      roughness: 0.2,
      metalness: 0.7,
      flatShading: true,
      transparent: true,
      opacity: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Orbiting Signal Rings
    const ringGeo1 = new THREE.TorusGeometry(1.35, 0.005, 8, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x777c5b, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.3;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.5, 0.004, 8, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa88a62, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.25;
    ring2.rotation.y = Math.PI * 0.2;
    group.add(ring2);

    // Mouse tracking
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 1.2;
      targetRotX = ny * 1.2;
    };

    window.addEventListener('pointermove', handlePointerMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    let animId: number;
    const clock = new THREE.Clock();
    let pulseProgress = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (pulseRef.current) {
        pulseProgress = Math.min(1, pulseProgress + 0.08);
      } else {
        pulseProgress = Math.max(0, pulseProgress - 0.04);
      }

      const spinSpeed = 0.4 + pulseProgress * 3.5;

      // Group rotation with mouse tilt
      if (!reducedMotion) {
        group.rotation.y += (targetRotY + time * 0.15 * spinSpeed - group.rotation.y) * 0.06;
        group.rotation.x += (targetRotX + Math.sin(time * 0.5) * 0.1 - group.rotation.x) * 0.06;
      }

      // Breathing / Pulse scale
      const breathe = 1 + Math.sin(time * 1.4) * 0.02 + pulseProgress * 0.18;
      outerMesh.scale.setScalar(breathe);
      wireMesh.scale.setScalar(breathe * 1.01);

      innerMesh.rotation.x = -time * 0.4;
      innerMesh.rotation.y = -time * 0.6;
      const innerScale = 0.5 * (1 + Math.sin(time * 2.2) * 0.05 + pulseProgress * 0.3);
      innerMesh.scale.setScalar(innerScale);

      // Rings
      ring1.rotation.z += 0.01 * spinSpeed;
      ring2.rotation.z -= 0.014 * spinSpeed;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="contact__canvas"
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '260px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}
