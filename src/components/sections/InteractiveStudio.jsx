import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import ScrollReveal from '../ScrollReveal';

const CABINET_FINISHES = [
  { name: 'Warm Teak Veneer', value: '#7c4d28', metalness: 0.1, roughness: 0.6 },
  { name: 'Matte Charcoal', value: '#242830', metalness: 0.1, roughness: 0.8 },
  { name: 'Royal Burgundy', value: '#6b0f1a', metalness: 0.2, roughness: 0.4 },
  { name: 'Sage Laminate', value: '#707f62', metalness: 0.1, roughness: 0.65 },
  { name: 'Soft Cream', value: '#eee6d8', metalness: 0.05, roughness: 0.7 }
];

const COUNTERTOP_STONES = [
  { name: 'Calacatta Marble', value: '#f2f0eb', roughness: 0.25 },
  { name: 'Nero Marquina Granite', value: '#1a1c20', roughness: 0.2 },
  { name: 'Concrete Quartz', value: '#73777f', roughness: 0.5 },
  { name: 'Crisp White Quartz', value: '#fafaf8', roughness: 0.2 }
];

const KITCHEN_LAYOUTS = [
  { id: 'l-shaped', label: 'L-Shaped' },
  { id: 'parallel', label: 'Parallel' },
  { id: 'minimalist', label: 'Linear Wall' }
];

function InteractiveStudio({
  cabinetFinishIdx = 0,
  setCabinetFinishIdx = () => {},
  countertopIdx = 0,
  setCountertopIdx = () => {},
  kitchenLayout = 'l-shaped',
  setKitchenLayout = () => {},
  underCabinetLightOn = true,
  setUnderCabinetLightOn = () => {},
  studioAutoRotate = false,
  setStudioAutoRotate = () => {}
}) {
  const studioCanvasRef = useRef(null);
  const yawRef = useRef(Math.PI / 4.2);
  const pitchRef = useRef(Math.PI / 7);

  // Persistent Three.js scene refs
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // Mutable material/group refs for in-place updates
  const cabinetMatRef = useRef(null);
  const countertopMatRef = useRef(null);
  const ledStripMatRef = useRef(null);
  const ledSpotLightRef = useRef(null);
  const lExtensionGroupRef = useRef(null);
  const islandGroupRef = useRef(null);

  const autoRotateRef = useRef(studioAutoRotate);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    autoRotateRef.current = studioAutoRotate;
  }, [studioAutoRotate]);

  // One-time scene initialization
  useEffect(() => {
    if (!studioCanvasRef.current || sceneRef.current) return;

    const container = studioCanvasRef.current;
    const width = container.clientWidth || 720;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#11141c');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- MATERIALS ---
    const cabinetConfig = CABINET_FINISHES[cabinetFinishIdx] || CABINET_FINISHES[0];
    const cabinetMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(cabinetConfig.value),
      roughness: cabinetConfig.roughness,
      metalness: cabinetConfig.metalness
    });
    cabinetMatRef.current = cabinetMat;

    const countertopConfig = COUNTERTOP_STONES[countertopIdx] || COUNTERTOP_STONES[0];
    const countertopMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(countertopConfig.value),
      roughness: countertopConfig.roughness,
      metalness: 0.1
    });
    countertopMatRef.current = countertopMat;

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.2
    });

    const stainlessMat = new THREE.MeshStandardMaterial({
      color: 0x5a606a,
      metalness: 0.75,
      roughness: 0.3
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x8899aa,
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.65,
      transparent: true,
      opacity: 0.6
    });

    // Floor & Room Studio
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(9, 0.1, 9),
      new THREE.MeshStandardMaterial({ color: 0x242834, roughness: 0.5, metalness: 0.05 })
    );
    floor.position.y = -0.05;
    floor.receiveShadow = true;
    scene.add(floor);

    const groutMat = new THREE.MeshStandardMaterial({ color: 0x191c26, roughness: 0.8 });
    for (let i = -4; i <= 4; i += 1.2) {
      const lineH = new THREE.Mesh(new THREE.BoxGeometry(9, 0.012, 0.02), groutMat);
      lineH.position.set(0, 0.005, i);
      scene.add(lineH);
      const lineV = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.012, 9), groutMat);
      lineV.position.set(i, 0.005, 0);
      scene.add(lineV);
    }

    const wallMat = new THREE.MeshStandardMaterial({ color: 0x2a2e3b, roughness: 0.8 });
    const wallBack = new THREE.Mesh(new THREE.BoxGeometry(9, 5, 0.1), wallMat);
    wallBack.position.set(0, 2.45, -4.45);
    wallBack.receiveShadow = true;
    scene.add(wallBack);

    const wallSide = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 9), wallMat);
    wallSide.position.set(-4.45, 2.45, 0);
    wallSide.receiveShadow = true;
    scene.add(wallSide);

    const backsplash = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 1.1, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x343a49, roughness: 0.4, metalness: 0.08 })
    );
    backsplash.position.set(-0.5, 1.45, -4.38);
    scene.add(backsplash);

    const tileLineMat = new THREE.MeshBasicMaterial({ color: 0x262a36 });
    for (let i = -2; i <= 2; i += 0.8) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.015, 1.1, 0.06), tileLineMat);
      line.position.set(i - 0.5, 1.45, -4.37);
      scene.add(line);
    }

    // --- MAIN PROCEDURAL KITCHEN GROUP ---
    const kitchenGroup = new THREE.Group();
    scene.add(kitchenGroup);

    const baseCabinet = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.82, 0.7), cabinetMat);
    baseCabinet.position.set(-0.5, 0.41, -3.9);
    baseCabinet.castShadow = true;
    baseCabinet.receiveShadow = true;
    kitchenGroup.add(baseCabinet);

    const toeKick = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.1, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x0c0d10 })
    );
    toeKick.position.set(-0.5, 0.05, -3.58);
    kitchenGroup.add(toeKick);

    const doorCount = 4;
    const doorWidth = 3.6 / doorCount;
    const seamMat = new THREE.MeshStandardMaterial({ color: 0x0f1116 });
    for (let i = 0; i < doorCount; i++) {
      const doorX = -0.5 - 1.8 + doorWidth / 2 + i * doorWidth;
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.78, 0.71), seamMat);
      seam.position.set(doorX + doorWidth / 2 - 0.005, 0.42, -3.9);
      kitchenGroup.add(seam);

      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.22, 12), brassMat);
      handle.position.set(doorX, 0.68, -3.53);
      handle.rotation.z = Math.PI / 2;
      handle.castShadow = true;
      kitchenGroup.add(handle);
    }

    const mainCounter = new THREE.Mesh(new THREE.BoxGeometry(3.68, 0.06, 0.76), countertopMat);
    mainCounter.position.set(-0.5, 0.85, -3.9);
    mainCounter.castShadow = true;
    mainCounter.receiveShadow = true;
    kitchenGroup.add(mainCounter);

    const sink = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.01, 0.45), stainlessMat);
    sink.position.set(-1.4, 0.885, -3.9);
    sink.receiveShadow = true;
    kitchenGroup.add(sink);

    const sinkInner = new THREE.Mesh(
      new THREE.BoxGeometry(0.64, 0.15, 0.39),
      new THREE.MeshStandardMaterial({ color: 0x22242a, roughness: 0.3 })
    );
    sinkInner.position.set(-1.4, 0.8, -3.9);
    kitchenGroup.add(sinkInner);

    const faucetBase = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.1, 16), brassMat);
    faucetBase.position.set(-1.4, 0.93, -4.15);
    kitchenGroup.add(faucetBase);

    const faucetSpout = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 12, 24, Math.PI), brassMat);
    faucetSpout.rotation.y = Math.PI / 2;
    faucetSpout.position.set(-1.4, 1.05, -4.03);
    kitchenGroup.add(faucetSpout);

    const cooktop = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.015, 0.52),
      new THREE.MeshStandardMaterial({ color: 0x08090b, roughness: 0.1, metalness: 0.8 })
    );
    cooktop.position.set(0.6, 0.888, -3.9);
    kitchenGroup.add(cooktop);

    const burnerGeo = new THREE.RingGeometry(0.05, 0.09, 24);
    const burnerMat = new THREE.MeshBasicMaterial({ color: 0xc4a46a, side: THREE.DoubleSide });
    [
      { x: 0.45, z: -4.02 },
      { x: 0.75, z: -4.02 },
      { x: 0.45, z: -3.78 },
      { x: 0.75, z: -3.78 }
    ].forEach((b) => {
      const burner = new THREE.Mesh(burnerGeo, burnerMat);
      burner.rotation.x = Math.PI / 2;
      burner.position.set(b.x, 0.897, b.z);
      kitchenGroup.add(burner);
    });

    const hoodBase = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.1, 0.52), stainlessMat);
    hoodBase.position.set(0.6, 2.05, -3.9);
    hoodBase.castShadow = true;
    kitchenGroup.add(hoodBase);

    const hoodDuct = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.3, 0.32), stainlessMat);
    hoodDuct.position.set(0.6, 2.75, -4.0);
    hoodDuct.castShadow = true;
    kitchenGroup.add(hoodDuct);

    const canopy = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.02, 0.55), glassMat);
    canopy.position.set(0.6, 2.0, -3.9);
    kitchenGroup.add(canopy);

    const wallCabinetGroup = new THREE.Group();
    const wallCabLeft = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.38), cabinetMat);
    wallCabLeft.position.set(-1.5, 2.45, -4.24);
    wallCabLeft.castShadow = true;
    wallCabLeft.receiveShadow = true;
    wallCabinetGroup.add(wallCabLeft);

    const glassInsert = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 0.02), glassMat);
    glassInsert.position.set(-1.5, 2.45, -4.04);
    wallCabinetGroup.add(glassInsert);
    kitchenGroup.add(wallCabinetGroup);

    const ledStripMat = new THREE.MeshBasicMaterial({
      color: underCabinetLightOn ? 0xffeaad : 0x333333
    });
    const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.02, 0.05), ledStripMat);
    ledStrip.position.set(-1.5, 1.99, -4.1);
    kitchenGroup.add(ledStrip);
    ledStripMatRef.current = ledStripMat;

    const ledSpotLight = new THREE.PointLight(0xffeaad, underCabinetLightOn ? 3.5 : 0, 4);
    ledSpotLight.position.set(-1.5, 1.95, -4.0);
    kitchenGroup.add(ledSpotLight);
    ledSpotLightRef.current = ledSpotLight;

    // L-Shaped Extension Run
    const lExtensionGroup = new THREE.Group();
    const lBase = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.82, 2.2), cabinetMat);
    lBase.position.set(-3.9, 0.41, -2.45);
    lBase.castShadow = true;
    lBase.receiveShadow = true;
    lExtensionGroup.add(lBase);

    const lCounter = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.06, 2.25), countertopMat);
    lCounter.position.set(-3.9, 0.85, -2.45);
    lCounter.castShadow = true;
    lCounter.receiveShadow = true;
    lExtensionGroup.add(lCounter);
    kitchenGroup.add(lExtensionGroup);
    lExtensionGroupRef.current = lExtensionGroup;

    // Kitchen Island & Bar Stools centered locally around (0, 0, 0)
    const islandGroup = new THREE.Group();
    scene.add(islandGroup);
    islandGroupRef.current = islandGroup;

    const islandBase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.85, 0.95), cabinetMat);
    islandBase.position.set(0, 0.425, 0);
    islandBase.castShadow = true;
    islandBase.receiveShadow = true;
    islandGroup.add(islandBase);

    const islandTop = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.06, 1.15), countertopMat);
    islandTop.position.set(0, 0.88, 0);
    islandTop.castShadow = true;
    islandTop.receiveShadow = true;
    islandGroup.add(islandTop);

    const waterfall = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.88, 1.15), countertopMat);
    waterfall.position.set(1.14, 0.44, 0);
    waterfall.castShadow = true;
    waterfall.receiveShadow = true;
    islandGroup.add(waterfall);

    const cushionMat = new THREE.MeshStandardMaterial({ color: 0x2b2e36, roughness: 0.8 });
    [
      { x: -0.5, z: 0.9 },
      { x: 0.5, z: 0.9 }
    ].forEach((sp) => {
      const stoolGroup = new THREE.Group();
      const cushion = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.06, 24), cushionMat);
      cushion.position.y = 0.62;
      cushion.castShadow = true;
      stoolGroup.add(cushion);

      const stoolLegGeo = new THREE.CylinderGeometry(0.015, 0.01, 0.62, 12);
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
        const leg = new THREE.Mesh(stoolLegGeo, brassMat);
        leg.position.set(Math.cos(angle) * 0.16, 0.31, Math.sin(angle) * 0.16);
        leg.rotation.z = -Math.cos(angle) * 0.1;
        leg.rotation.x = Math.sin(angle) * 0.1;
        leg.castShadow = true;
        stoolGroup.add(leg);
      }

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.008, 12, 24), brassMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.25;
      stoolGroup.add(ring);

      stoolGroup.position.set(sp.x, 0, sp.z);
      islandGroup.add(stoolGroup);
    });

    // --- LIGHTING SETUP ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    const mainDirectionalLight = new THREE.DirectionalLight(0xfff6eb, 1.4);
    mainDirectionalLight.position.set(4, 9, 5);
    mainDirectionalLight.castShadow = true;
    mainDirectionalLight.shadow.mapSize.width = 1024;
    mainDirectionalLight.shadow.mapSize.height = 1024;
    mainDirectionalLight.shadow.bias = -0.0004;
    scene.add(mainDirectionalLight);

    const fillLight = new THREE.DirectionalLight(0xebf3ff, 0.7);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    const islandSpotlight = new THREE.SpotLight(0xffe2b8, 2.8, 9, Math.PI / 4, 0.35);
    islandSpotlight.position.set(-0.3, 4.2, -1.2);
    islandSpotlight.target.position.set(-0.3, 0.8, -1.2);
    islandSpotlight.castShadow = true;
    scene.add(islandSpotlight);
    scene.add(islandSpotlight.target);

    // Initial layout positioning
    lExtensionGroup.visible = kitchenLayout === 'l-shaped';
    islandGroup.visible = kitchenLayout !== 'minimalist';
    islandGroup.position.set(
      kitchenLayout === 'parallel' ? -0.5 : -0.3,
      0,
      kitchenLayout === 'parallel' ? -2.0 : -1.2
    );

    // --- ORBIT & CAMERA INTERACTION ---
    const radius = 7.5;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      yawRef.current -= deltaX * 0.006;
      pitchRef.current = Math.max(-0.1, Math.min(Math.PI / 2.6, pitchRef.current + deltaY * 0.006));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    const renderScene = () => {
      camera.position.x = radius * Math.sin(yawRef.current) * Math.cos(pitchRef.current);
      camera.position.z = radius * Math.cos(yawRef.current) * Math.cos(pitchRef.current);
      camera.position.y = radius * Math.sin(pitchRef.current) + 1.8;
      camera.lookAt(-0.5, 1.2, -2.4);
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!isVisibleRef.current) return;
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (autoRotateRef.current && !isDragging) {
        yawRef.current += 0.0025;
      }

      renderScene();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
          animate();
        } else if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
      },
      { rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(container);

    const handleResize = () => {
      if (!container || container.clientWidth === 0) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderScene();
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(handleResize) : null;
    if (resizeObserver) {
      resizeObserver.observe(container);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
      sceneRef.current = null;
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // In-place material updates
  useEffect(() => {
    if (!cabinetMatRef.current) return;
    const config = CABINET_FINISHES[cabinetFinishIdx] || CABINET_FINISHES[0];
    cabinetMatRef.current.color.set(config.value);
    cabinetMatRef.current.roughness = config.roughness;
    cabinetMatRef.current.metalness = config.metalness;
    cabinetMatRef.current.needsUpdate = true;
  }, [cabinetFinishIdx]);

  useEffect(() => {
    if (!countertopMatRef.current) return;
    const config = COUNTERTOP_STONES[countertopIdx] || COUNTERTOP_STONES[0];
    countertopMatRef.current.color.set(config.value);
    countertopMatRef.current.roughness = config.roughness;
    countertopMatRef.current.needsUpdate = true;
  }, [countertopIdx]);

  // In-place LED toggle
  useEffect(() => {
    if (ledStripMatRef.current) {
      ledStripMatRef.current.color.set(underCabinetLightOn ? 0xffeaad : 0x333333);
      ledStripMatRef.current.needsUpdate = true;
    }
    if (ledSpotLightRef.current) {
      ledSpotLightRef.current.intensity = underCabinetLightOn ? 3.5 : 0;
    }
  }, [underCabinetLightOn]);

  // In-place layout switch
  useEffect(() => {
    const lExt = lExtensionGroupRef.current;
    const island = islandGroupRef.current;
    if (!lExt || !island) return;

    if (kitchenLayout === 'l-shaped') {
      lExt.visible = true;
      island.visible = true;
      island.position.set(-0.3, 0, -1.2);
    } else if (kitchenLayout === 'parallel') {
      lExt.visible = false;
      island.visible = true;
      island.position.set(-0.5, 0, -2.0);
    } else if (kitchenLayout === 'minimalist') {
      lExt.visible = false;
      island.visible = false;
    }
  }, [kitchenLayout]);

  return (
    <section
      id="interactive-studio"
      className="relative z-30 bg-[#0b0d13] text-luxury-cream py-20 lg:py-24 px-6 md:px-16 lg:px-24 border-t border-white/10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3">
              <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#b7c4a1] uppercase">
                VIRTUAL SPATIAL ATELIER
              </span>
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-medium text-luxury-cream leading-tight tracking-tight">
              Interactive 3D{' '}
              <span className="italic font-medium text-[#d6b36c]">Modular Kitchen</span>{' '}
              Studio
            </h2>

            <p className="font-sans text-sm md:text-base text-luxury-cream/85 leading-relaxed font-normal max-w-2xl mx-auto">
              Configure your ideal kitchen environment in real-time 3D. Experiment with cabinet finishes, stone countertops, ambient under-cabinet lighting, and architectural layouts.
            </p>
          </div>
        </ScrollReveal>

        {/* Studio Panel Card */}
        <ScrollReveal variant="scale" delay={100}>
          <div className="bg-[#141722] border border-white/15 rounded-2xl p-4 md:p-6 lg:p-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 3D Canvas */}
          <div className="lg:col-span-8 relative rounded-xl overflow-hidden min-h-[440px] lg:min-h-[520px] bg-[#0f1117] border border-white/10">
            <div
              ref={studioCanvasRef}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            />

            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <div className="bg-black/75 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-md flex items-center gap-2">
                <span className="w-2 h-2 bg-[#c5a059] rounded-full" />
                <span className="font-sans text-xs font-semibold tracking-wide text-white">
                  Drag to Orbit 3D Kitchen
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setStudioAutoRotate(!studioAutoRotate)}
                className={`px-3.5 py-2 rounded-md font-sans text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-lg border cursor-pointer ${
                  studioAutoRotate
                    ? 'bg-[#c5a059] text-[#141210] border-[#c5a059]'
                    : 'bg-black/80 text-white/85 border-white/20 hover:border-white/40 hover:text-white'
                }`}
              >
                <span>Auto-Rotate: {studioAutoRotate ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => setUnderCabinetLightOn(!underCabinetLightOn)}
                className={`px-3.5 py-2 rounded-md font-sans text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-lg border cursor-pointer ${
                  underCabinetLightOn
                    ? 'bg-luxury-cream text-luxury-charcoal border-luxury-cream hover:bg-white'
                    : 'bg-black/80 text-white/85 border-white/20 hover:border-white/40 hover:text-white'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    underCabinetLightOn ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                />
                <span>LED Strip: {underCabinetLightOn ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Controls Panel */}
          <div className="lg:col-span-4 p-5 lg:p-6 bg-[#0f121a] rounded-xl border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-medium tracking-tight text-luxury-cream">
                  Kitchen Material Atelier
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                  Switch cabinet veneers, natural stone countertops, and spatial blueprints live.
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10" />

              {/* CABINET FINISHES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-[11px] font-bold tracking-[0.16em] text-[#b7c4a1] uppercase">
                    Cabinet Finish
                  </span>
                  <span className="text-xs text-white/90 font-sans font-semibold">
                    {CABINET_FINISHES[cabinetFinishIdx].name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {CABINET_FINISHES.map((finish, idx) => (
                    <button
                      key={finish.name}
                      type="button"
                      onClick={() => setCabinetFinishIdx(idx)}
                      aria-label={`Select ${finish.name}`}
                      className="relative w-9 h-9 rounded-full border border-white/25 transition-transform duration-200 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
                      style={{ backgroundColor: finish.value }}
                    >
                      {cabinetFinishIdx === idx && (
                        <span className="absolute -inset-1 rounded-full border-2 border-[#c5a059]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* COUNTERTOP STONES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-[11px] font-bold tracking-[0.16em] text-[#b7c4a1] uppercase">
                    Countertop Stone
                  </span>
                  <span className="text-xs text-white/90 font-sans font-semibold">
                    {COUNTERTOP_STONES[countertopIdx].name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {COUNTERTOP_STONES.map((stone, idx) => (
                    <button
                      key={stone.name}
                      type="button"
                      onClick={() => setCountertopIdx(idx)}
                      className={`px-3 py-2.5 rounded-md font-sans text-xs font-semibold tracking-wide transition-all duration-200 border text-left flex items-center gap-2 cursor-pointer ${
                        countertopIdx === idx
                          ? 'bg-[#c5a059] text-[#141210] border-[#c5a059] font-bold shadow-md'
                          : 'bg-white/5 text-white/85 border-white/15 hover:border-white/35 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: stone.value }}
                      />
                      <span className="truncate">{stone.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SPATIAL LAYOUTS */}
              <div className="space-y-3">
                <span className="font-sans text-[11px] font-bold tracking-[0.16em] text-[#b7c4a1] uppercase block">
                  Spatial Configuration
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {KITCHEN_LAYOUTS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setKitchenLayout(item.id)}
                      className={`py-2.5 px-2 rounded-md font-sans text-xs font-bold tracking-wide transition-all duration-200 border cursor-pointer ${
                        kitchenLayout === item.id
                          ? 'bg-luxury-cream text-luxury-charcoal border-luxury-cream shadow-md'
                          : 'bg-white/5 text-white/80 border-white/15 hover:border-white/35 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default memo(InteractiveStudio);
