import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useScrollReveal } from '../../hooks/useScrollReveal';

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
  { id: 'l-shaped', label: 'L-Shaped + Island' },
  { id: 'parallel', label: 'Parallel Studio' },
  { id: 'minimalist', label: 'Linear Wall' }
];

export default function InteractiveStudio({
  cabinetFinishIdx = 0,
  setCabinetFinishIdx = () => { },
  countertopIdx = 0,
  setCountertopIdx = () => { },
  kitchenLayout = 'l-shaped',
  setKitchenLayout = () => { },
  underCabinetLightOn = true,
  setUnderCabinetLightOn = () => { },
  studioAutoRotate = false,
  setStudioAutoRotate = () => { },
  loading = false
}) {
  useScrollReveal();
  const studioCanvasRef = useRef(null);
  const yawRef = useRef(Math.PI / 4.2);
  const pitchRef = useRef(Math.PI / 7);

  const [tiltStyle, setTiltStyle] = useState({});
  const [modelSource, setModelSource] = useState('procedural'); // 'procedural' or 'gltf'
  const [gltfLoadStatus, setGltfLoadStatus] = useState(null);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotX = ((yc - y) / yc) * 2.5;
    const rotY = ((x - xc) / xc) * 2.5;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      transition: 'transform 0.1s ease-out',
      willChange: 'transform'
    });
  };

  const handleCardMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
      transition: 'transform 0.5s ease-out',
      willChange: 'transform'
    });
  };

  useEffect(() => {
    if (loading || !studioCanvasRef.current) return;

    const container = studioCanvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#11141c');

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- MATERIALS ---
    const cabinetConfig = CABINET_FINISHES[cabinetFinishIdx] || CABINET_FINISHES[0];
    const cabinetMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(cabinetConfig.value),
      roughness: cabinetConfig.roughness,
      metalness: cabinetConfig.metalness
    });

    const countertopConfig = COUNTERTOP_STONES[countertopIdx] || COUNTERTOP_STONES[0];
    const countertopMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(countertopConfig.value),
      roughness: countertopConfig.roughness,
      metalness: 0.1
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.2
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 0.92,
      roughness: 0.15
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

    // Floor & Room Studio — Polished slate tile studio floor
    const floorGeo = new THREE.BoxGeometry(9, 0.1, 9);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x242834, roughness: 0.5, metalness: 0.05 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.05;
    floor.receiveShadow = true;
    scene.add(floor);

    // Floor tile grout lines
    const groutMat = new THREE.MeshStandardMaterial({ color: 0x191c26, roughness: 0.8 });
    for (let i = -4; i <= 4; i += 1.2) {
      const lineH = new THREE.Mesh(new THREE.BoxGeometry(9, 0.012, 0.02), groutMat);
      lineH.position.set(0, 0.005, i);
      scene.add(lineH);
      const lineV = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.012, 9), groutMat);
      lineV.position.set(i, 0.005, 0);
      scene.add(lineV);
    }

    // Back Wall — Architectural slate finish
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x2a2e3b, roughness: 0.8 });
    const wallBackGeo = new THREE.BoxGeometry(9, 5, 0.1);
    const wallBack = new THREE.Mesh(wallBackGeo, wallMat);
    wallBack.position.set(0, 2.45, -4.45);
    wallBack.receiveShadow = true;
    scene.add(wallBack);

    // Side Wall — Architectural slate finish
    const wallSideGeo = new THREE.BoxGeometry(0.1, 5, 9);
    const wallSide = new THREE.Mesh(wallSideGeo, wallMat);
    wallSide.position.set(-4.45, 2.45, 0);
    wallSide.receiveShadow = true;
    scene.add(wallSide);

    // Backsplash Panel — Refined dark stone panel
    const backsplashGeo = new THREE.BoxGeometry(5.2, 1.1, 0.05);
    const backsplashMat = new THREE.MeshStandardMaterial({ color: 0x343a49, roughness: 0.4, metalness: 0.08 });
    const backsplash = new THREE.Mesh(backsplashGeo, backsplashMat);
    backsplash.position.set(-0.5, 1.45, -4.38);
    scene.add(backsplash);

    // Tile grid lines on backsplash
    const tileLineMat = new THREE.MeshBasicMaterial({ color: 0x262a36 });
    for (let i = -2; i <= 2; i += 0.8) {
      const lineGeo = new THREE.BoxGeometry(0.015, 1.1, 0.06);
      const line = new THREE.Mesh(lineGeo, tileLineMat);
      line.position.set(i - 0.5, 1.45, -4.37);
      scene.add(line);
    }

    // --- MAIN PROCEDURAL KITCHEN GROUP ---
    const kitchenGroup = new THREE.Group();
    scene.add(kitchenGroup);

    // 1. BASE CABINETS (MAIN LINE RUN)
    const baseCabinetGeo = new THREE.BoxGeometry(3.6, 0.82, 0.7);
    const baseCabinet = new THREE.Mesh(baseCabinetGeo, cabinetMat);
    baseCabinet.position.set(-0.5, 0.41, -3.9);
    baseCabinet.castShadow = true;
    baseCabinet.receiveShadow = true;
    kitchenGroup.add(baseCabinet);

    // Toe Kick Recess
    const toeKickGeo = new THREE.BoxGeometry(3.6, 0.1, 0.1);
    const toeKickMat = new THREE.MeshStandardMaterial({ color: 0x0c0d10 });
    const toeKick = new THREE.Mesh(toeKickGeo, toeKickMat);
    toeKick.position.set(-0.5, 0.05, -3.58);
    kitchenGroup.add(toeKick);

    // Base Cabinet Handle Bars & Doors
    const doorCount = 4;
    const doorWidth = 3.6 / doorCount;
    for (let i = 0; i < doorCount; i++) {
      const doorX = -0.5 - 1.8 + doorWidth / 2 + i * doorWidth;

      // Door seam line
      const seamGeo = new THREE.BoxGeometry(0.01, 0.78, 0.71);
      const seamMat = new THREE.MeshStandardMaterial({ color: 0x0f1116 });
      const seam = new THREE.Mesh(seamGeo, seamMat);
      seam.position.set(doorX + doorWidth / 2 - 0.005, 0.42, -3.9);
      kitchenGroup.add(seam);

      // Handle bar
      const handleGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.22, 12);
      const handle = new THREE.Mesh(handleGeo, brassMat);
      handle.position.set(doorX, 0.68, -3.53);
      handle.rotation.z = Math.PI / 2;
      handle.castShadow = true;
      kitchenGroup.add(handle);
    }

    // 2. MAIN COUNTERTOP (MARBLE/GRANITE)
    const mainCounterGeo = new THREE.BoxGeometry(3.68, 0.06, 0.76);
    const mainCounter = new THREE.Mesh(mainCounterGeo, countertopMat);
    mainCounter.position.set(-0.5, 0.85, -3.9);
    mainCounter.castShadow = true;
    mainCounter.receiveShadow = true;
    kitchenGroup.add(mainCounter);

    // 3. SINK & GOOSENECK FAUCET
    const sinkGeo = new THREE.BoxGeometry(0.7, 0.01, 0.45);
    const sink = new THREE.Mesh(sinkGeo, stainlessMat);
    sink.position.set(-1.4, 0.885, -3.9);
    sink.receiveShadow = true;
    kitchenGroup.add(sink);

    const sinkInnerGeo = new THREE.BoxGeometry(0.64, 0.15, 0.39);
    const sinkInnerMat = new THREE.MeshStandardMaterial({ color: 0x22242a, roughness: 0.3 });
    const sinkInner = new THREE.Mesh(sinkInnerGeo, sinkInnerMat);
    sinkInner.position.set(-1.4, 0.8, -3.9);
    kitchenGroup.add(sinkInner);

    // Faucet Base & Curved Spout
    const faucetBaseGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.1, 16);
    const faucetBase = new THREE.Mesh(faucetBaseGeo, brassMat);
    faucetBase.position.set(-1.4, 0.93, -4.15);
    kitchenGroup.add(faucetBase);

    const faucetSpoutGeo = new THREE.TorusGeometry(0.12, 0.012, 12, 24, Math.PI);
    const faucetSpout = new THREE.Mesh(faucetSpoutGeo, brassMat);
    faucetSpout.rotation.y = Math.PI / 2;
    faucetSpout.position.set(-1.4, 1.05, -4.03);
    kitchenGroup.add(faucetSpout);

    // 4. COOKTOP / HOB (BLACK GLASS)
    const cooktopGeo = new THREE.BoxGeometry(0.8, 0.015, 0.52);
    const cooktopMat = new THREE.MeshStandardMaterial({ color: 0x08090b, roughness: 0.1, metalness: 0.8 });
    const cooktop = new THREE.Mesh(cooktopGeo, cooktopMat);
    cooktop.position.set(0.6, 0.888, -3.9);
    kitchenGroup.add(cooktop);

    // Burner Rings
    const burnerGeo = new THREE.RingGeometry(0.05, 0.09, 24);
    const burnerMat = new THREE.MeshBasicMaterial({ color: 0xc4a46a, side: THREE.DoubleSide });
    const burnerOffsets = [
      { x: 0.45, z: -4.02 },
      { x: 0.75, z: -4.02 },
      { x: 0.45, z: -3.78 },
      { x: 0.75, z: -3.78 }
    ];
    burnerOffsets.forEach((b) => {
      const burner = new THREE.Mesh(burnerGeo, burnerMat);
      burner.rotation.x = Math.PI / 2;
      burner.position.set(b.x, 0.897, b.z);
      kitchenGroup.add(burner);
    });

    // 5. CHIMNEY EXHAUST HOOD
    const hoodBaseGeo = new THREE.BoxGeometry(0.9, 0.1, 0.52);
    const hoodBase = new THREE.Mesh(hoodBaseGeo, stainlessMat);
    hoodBase.position.set(0.6, 2.05, -3.9);
    hoodBase.castShadow = true;
    kitchenGroup.add(hoodBase);

    const hoodDuctGeo = new THREE.BoxGeometry(0.35, 1.3, 0.32);
    const hoodDuct = new THREE.Mesh(hoodDuctGeo, stainlessMat);
    hoodDuct.position.set(0.6, 2.75, -4.0);
    hoodDuct.castShadow = true;
    kitchenGroup.add(hoodDuct);

    // Glass Canopy Trim on Hood
    const canopyGeo = new THREE.BoxGeometry(0.95, 0.02, 0.55);
    const canopy = new THREE.Mesh(canopyGeo, glassMat);
    canopy.position.set(0.6, 2.0, -3.9);
    kitchenGroup.add(canopy);

    // 6. UPPER WALL CABINETS
    const wallCabinetGroup = new THREE.Group();
    const wallCabLeftGeo = new THREE.BoxGeometry(1.6, 0.9, 0.38);
    const wallCabLeft = new THREE.Mesh(wallCabLeftGeo, cabinetMat);
    wallCabLeft.position.set(-1.5, 2.45, -4.24);
    wallCabLeft.castShadow = true;
    wallCabLeft.receiveShadow = true;
    wallCabinetGroup.add(wallCabLeft);

    // Glass inserts for aesthetic contrast
    const glassInsertGeo = new THREE.BoxGeometry(0.6, 0.7, 0.02);
    const glassInsert = new THREE.Mesh(glassInsertGeo, glassMat);
    glassInsert.position.set(-1.5, 2.45, -4.04);
    wallCabinetGroup.add(glassInsert);

    kitchenGroup.add(wallCabinetGroup);

    // 7. UNDER-CABINET LED STRIP LIGHTING
    const ledStripGeo = new THREE.BoxGeometry(1.58, 0.02, 0.05);
    const ledStripMat = new THREE.MeshBasicMaterial({
      color: underCabinetLightOn ? 0xffeaad : 0x333333
    });
    const ledStrip = new THREE.Mesh(ledStripGeo, ledStripMat);
    ledStrip.position.set(-1.5, 1.99, -4.1);
    kitchenGroup.add(ledStrip);

    const ledSpotLight = new THREE.PointLight(
      0xffeaad,
      underCabinetLightOn ? 3.5 : 0,
      4
    );
    ledSpotLight.position.set(-1.5, 1.95, -4.0);
    kitchenGroup.add(ledSpotLight);

    // 8. L-SHAPED EXTENSION RUN (FOR L-SHAPED LAYOUT)
    const lExtensionGroup = new THREE.Group();
    const lBaseGeo = new THREE.BoxGeometry(0.7, 0.82, 2.2);
    const lBase = new THREE.Mesh(lBaseGeo, cabinetMat);
    lBase.position.set(-3.9, 0.41, -2.45);
    lBase.castShadow = true;
    lBase.receiveShadow = true;
    lExtensionGroup.add(lBase);

    const lCounterGeo = new THREE.BoxGeometry(0.76, 0.06, 2.25);
    const lCounter = new THREE.Mesh(lCounterGeo, countertopMat);
    lCounter.position.set(-3.9, 0.85, -2.45);
    lCounter.castShadow = true;
    lCounter.receiveShadow = true;
    lExtensionGroup.add(lCounter);

    kitchenGroup.add(lExtensionGroup);

    // 9. KITCHEN ISLAND & BAR STOOLS GROUP
    const islandGroup = new THREE.Group();
    scene.add(islandGroup);

    // Island Cabinet Body
    const islandBaseGeo = new THREE.BoxGeometry(2.2, 0.85, 0.95);
    const islandBase = new THREE.Mesh(islandBaseGeo, cabinetMat);
    islandBase.position.set(-0.3, 0.425, -1.2);
    islandBase.castShadow = true;
    islandBase.receiveShadow = true;
    islandGroup.add(islandBase);

    // Overhanging Waterfall Marble Countertop
    const islandTopGeo = new THREE.BoxGeometry(2.35, 0.06, 1.15);
    const islandTop = new THREE.Mesh(islandTopGeo, countertopMat);
    islandTop.position.set(-0.3, 0.88, -1.2);
    islandTop.castShadow = true;
    islandTop.receiveShadow = true;
    islandGroup.add(islandTop);

    // Waterfall side slab
    const waterfallGeo = new THREE.BoxGeometry(0.06, 0.88, 1.15);
    const waterfall = new THREE.Mesh(waterfallGeo, countertopMat);
    waterfall.position.set(0.84, 0.44, -1.2);
    waterfall.castShadow = true;
    waterfall.receiveShadow = true;
    islandGroup.add(waterfall);

    // Designer Bar Stools (2 units)
    const stoolPositions = [
      { x: -0.8, z: -0.3 },
      { x: 0.2, z: -0.3 }
    ];

    stoolPositions.forEach((sp) => {
      const stoolGroup = new THREE.Group();

      // Seat Cushion
      const cushionGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 24);
      const cushionMat = new THREE.MeshStandardMaterial({ color: 0x2b2e36, roughness: 0.8 });
      const cushion = new THREE.Mesh(cushionGeo, cushionMat);
      cushion.position.y = 0.62;
      cushion.castShadow = true;
      stoolGroup.add(cushion);

      // Stool Legs (Metallic brass)
      const stoolLegGeo = new THREE.CylinderGeometry(0.015, 0.01, 0.62, 12);
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
        const leg = new THREE.Mesh(stoolLegGeo, brassMat);
        leg.position.set(Math.cos(angle) * 0.16, 0.31, Math.sin(angle) * 0.16);
        leg.rotation.z = -Math.cos(angle) * 0.1;
        leg.rotation.x = Math.sin(angle) * 0.1;
        leg.castShadow = true;
        stoolGroup.add(leg);
      }

      // Footrest ring
      const ringGeo = new THREE.TorusGeometry(0.15, 0.008, 12, 24);
      const ring = new THREE.Mesh(ringGeo, brassMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.25;
      stoolGroup.add(ring);

      stoolGroup.position.set(sp.x, 0, sp.z);
      islandGroup.add(stoolGroup);
    });

    // --- GLTF CUSTOM MODEL LOADER FALLBACK ---
    // Attempt to load converted GLB model from public folder if user converted their .skp file
    const loader = new GLTFLoader();
    const tryGltfPaths = ['/web-kitchen.glb', '/web modular kitchen file.glb'];

    const tryLoadGltf = (index) => {
      if (index >= tryGltfPaths.length) {
        setModelSource('procedural');
        setGltfLoadStatus('Procedural 3D Model Active');
        return;
      }
      loader.load(
        tryGltfPaths[index],
        (gltf) => {
          // Hide procedural kitchen, show GLTF scene
          kitchenGroup.visible = false;
          islandGroup.visible = false;

          const gltfScene = gltf.scene;
          gltfScene.name = 'userGltfKitchen';

          // Auto center and scale GLTF model
          const box = new THREE.Box3().setFromObject(gltfScene);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 4.5 / maxDim;
          gltfScene.scale.set(scale, scale, scale);

          const center = box.getCenter(new THREE.Vector3());
          gltfScene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale - 2);

          gltfScene.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add(gltfScene);
          setModelSource('gltf');
          setGltfLoadStatus(`Loaded GLB: ${tryGltfPaths[index].replace('/', '')}`);
        },
        undefined,
        () => {
          // If current path fails, try next path
          tryLoadGltf(index + 1);
        }
      );
    };

    tryLoadGltf(0);

    // --- LIGHTING SETUP (BALANCED LUXURY STUDIO) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    const mainDirectionalLight = new THREE.DirectionalLight(0xfff6eb, 1.4);
    mainDirectionalLight.position.set(4, 9, 5);
    mainDirectionalLight.castShadow = true;
    mainDirectionalLight.shadow.mapSize.width = 2048;
    mainDirectionalLight.shadow.mapSize.height = 2048;
    mainDirectionalLight.shadow.bias = -0.0004;
    scene.add(mainDirectionalLight);

    // Cool Soft Fill Light for clear detail definition
    const fillLight = new THREE.DirectionalLight(0xebf3ff, 0.7);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    // Warm Accent Spotlight on Island
    const islandSpotlight = new THREE.SpotLight(0xffe2b8, 2.8, 9, Math.PI / 4, 0.35);
    islandSpotlight.position.set(-0.3, 4.2, -1.2);
    islandSpotlight.target.position.set(-0.3, 0.8, -1.2);
    islandSpotlight.castShadow = true;
    scene.add(islandSpotlight);
    scene.add(islandSpotlight.target);

    // --- KITCHEN LAYOUT TRANSFORM TARGETS ---
    const layoutTargets = {
      lExtension: { visible: true, x: 0 },
      island: { visible: true, x: -0.3, z: -1.2 }
    };

    if (kitchenLayout === 'l-shaped') {
      layoutTargets.lExtension.visible = true;
      layoutTargets.island.visible = true;
      layoutTargets.island.x = -0.3;
      layoutTargets.island.z = -1.2;
    } else if (kitchenLayout === 'parallel') {
      layoutTargets.lExtension.visible = false;
      layoutTargets.island.visible = true;
      layoutTargets.island.x = -0.5;
      layoutTargets.island.z = -2.3;
    } else if (kitchenLayout === 'minimalist') {
      layoutTargets.lExtension.visible = false;
      layoutTargets.island.visible = false;
    }

    lExtensionGroup.visible = layoutTargets.lExtension.visible;
    islandGroup.visible = modelSource === 'gltf' ? false : layoutTargets.island.visible;
    islandGroup.position.set(layoutTargets.island.x, 0, layoutTargets.island.z);

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

    const handleScroll = () => {
      if (isDragging || !container) return;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalDist = rect.height + viewportHeight;
      const scrolled = viewportHeight - rect.top;

      if (scrolled >= 0 && scrolled <= totalDist) {
        const prog = Math.min(Math.max(0, scrolled / totalDist), 1);
        yawRef.current = Math.PI / 4.2 + (prog - 0.5) * 0.6;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (studioAutoRotate && !isDragging) {
        yawRef.current += 0.0025;
      }

      camera.position.x = radius * Math.sin(yawRef.current) * Math.cos(pitchRef.current);
      camera.position.z = radius * Math.cos(yawRef.current) * Math.cos(pitchRef.current);
      camera.position.y = radius * Math.sin(pitchRef.current) + 1.8;
      camera.lookAt(-0.5, 1.2, -2.4);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
    };
  }, [cabinetFinishIdx, countertopIdx, kitchenLayout, underCabinetLightOn, studioAutoRotate, loading]);

  return (
    <section id="interactive-studio" className="relative z-30 bg-[#0b0d13] text-luxury-cream py-24 px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 reveal-3d-popup">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#838f6f]/40" />
            <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#838f6f] uppercase">
              VIRTUAL SPATIAL ATELIER
            </span>
            <span className="w-8 h-[1px] bg-[#838f6f]/40" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-extralight text-luxury-cream leading-tight uppercase tracking-wider">
            Interactive 3D <span className="italic font-normal text-[#838f6f]">Modular Kitchen</span> Studio
          </h2>

          <p className="font-sans text-xs md:text-sm text-luxury-cream/60 leading-relaxed font-light max-w-2xl mx-auto">
            Design your ideal kitchen environment in real-time 3D. Experiment with tactile wood veneers, polished marble countertops, under-cabinet ambient lighting, and spatial layouts live.
          </p>

          {gltfLoadStatus && (
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-sans text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {gltfLoadStatus}
              </span>
            </div>
          )}
        </div>

        {/* Studio Panel Card */}
        <div
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={tiltStyle}
          className="bg-[#141722] border border-white/10 rounded-[24px] p-4 md:p-6 lg:p-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch transition-transform duration-100 ease-out"
        >

          {/* Left Column: 3D Canvas (8 cols) */}
          <div className="lg:col-span-8 relative rounded-xl overflow-hidden min-h-[420px] lg:min-h-[520px] bg-[#0f1117] border border-white/[0.05]">
            <div ref={studioCanvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <div className="bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#838f6f] rounded-full animate-ping" />
                <span className="font-sans text-[9px] font-semibold tracking-wider text-white/90">
                  Drag to Orbit 3D Kitchen
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <button
                onClick={() => setUnderCabinetLightOn(!underCabinetLightOn)}
                className={`px-4 py-2 rounded-full font-sans text-[9px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-lg border ${underCabinetLightOn
                  ? 'bg-luxury-cream text-luxury-charcoal border-luxury-cream hover:bg-white'
                  : 'bg-black/70 text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
              >
                <span className={`w-2 h-2 rounded-full ${underCabinetLightOn ? 'bg-amber-400 animate-pulse' : 'bg-red-500'}`} />
                <span>LED Strip: {underCabinetLightOn ? 'ON' : 'OFF'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Controls Panel (4 cols) */}
          <div className="lg:col-span-4 p-4 lg:p-6 bg-[#0f121a] rounded-xl border border-white/[0.05] flex flex-col justify-between space-y-6">

            <div className="space-y-6">

              <div className="space-y-2">
                <h3 className="font-display text-xl lg:text-2xl font-light tracking-wide text-luxury-cream uppercase">
                  Kitchen Material Atelier
                </h3>
                <p className="font-sans text-xs text-luxury-cream/50 leading-relaxed font-light">
                  Tailor every element of your kitchen configuration. Switch cabinet laminates, natural marble tops, and functional spatial blueprints.
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/5" />

              {/* CABINET FINISHES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-[#838f6f] uppercase">
                    CABINET FINISH
                  </span>
                  <span className="text-[10px] text-white/50 font-sans font-semibold">
                    {CABINET_FINISHES[cabinetFinishIdx].name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {CABINET_FINISHES.map((finish, idx) => (
                    <button
                      key={finish.name}
                      onClick={() => setCabinetFinishIdx(idx)}
                      aria-label={`Select ${finish.name}`}
                      className="relative w-8 h-8 rounded-full border border-white/15 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
                      style={{ backgroundColor: finish.value }}
                    >
                      {cabinetFinishIdx === idx && (
                        <span className="absolute -inset-1 rounded-full border-2 border-[#838f6f]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* COUNTERTOP STONES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-[#838f6f] uppercase">
                    COUNTERTOP STONE
                  </span>
                  <span className="text-[10px] text-white/50 font-sans font-semibold">
                    {COUNTERTOP_STONES[countertopIdx].name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {COUNTERTOP_STONES.map((stone, idx) => (
                    <button
                      key={stone.name}
                      onClick={() => setCountertopIdx(idx)}
                      className={`px-3 py-2 rounded font-sans text-[9px] font-semibold tracking-wider uppercase transition-all duration-300 border text-left flex items-center gap-2 ${countertopIdx === idx
                        ? 'bg-[#838f6f] text-white border-[#838f6f] shadow-md'
                        : 'bg-white/5 text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: stone.value }} />
                      <span className="truncate">{stone.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SPATIAL LAYOUTS */}
              <div className="space-y-3">
                <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-[#838f6f] uppercase">
                  SPATIAL CONFIGURATION
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {KITCHEN_LAYOUTS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setKitchenLayout(item.id)}
                      className={`py-2 px-1 rounded font-sans text-[8px] font-bold tracking-wider uppercase transition-all duration-300 border ${kitchenLayout === item.id
                        ? 'bg-luxury-cream text-luxury-charcoal border-luxury-cream shadow-md'
                        : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer metadata & auto-rotate */}
            <div className="space-y-3 pt-4 border-t border-white/5">

              <div className="flex items-center justify-between text-[10px] font-sans">
                <span className="text-white/40">3D Camera Orbit</span>
                <button
                  onClick={() => setStudioAutoRotate(!studioAutoRotate)}
                  className={`px-3 py-1 rounded text-[8px] font-bold uppercase tracking-wider transition-colors duration-300 ${studioAutoRotate
                    ? 'bg-[#838f6f] text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                >
                  {studioAutoRotate ? 'ROTATING' : 'PAUSED'}
                </button>
              </div>

              <div className="bg-white/[0.02] p-2.5 rounded border border-white/5 space-y-1">
                <p className="text-[9px] font-sans text-white/60 font-medium">
                  💡 SketchUp (.skp) File Notice:
                </p>
                <p className="text-[8px] font-sans text-white/40 leading-relaxed font-light">
                  To view your custom SketchUp model here, export <code className="text-amber-300">web modular kitchen file.skp</code> as <code className="text-amber-300">web-kitchen.glb</code> and place it in <code className="text-amber-300">frontend/public/</code>.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
