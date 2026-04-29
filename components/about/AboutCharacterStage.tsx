"use client";

import { useEffect, useRef, useState } from "react";
import {
  AmbientLight,
  AnimationMixer,
  BoxGeometry,
  CanvasTexture,
  Clock,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function createLabelTexture(label: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(6, 10, 18, 0.94)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = color;
  context.lineWidth = 12;
  context.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
  context.fillStyle = color;
  context.font = "900 54px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, canvas.width / 2, canvas.height / 2);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function createTechPanel(label: string, color: string) {
  const texture = createLabelTexture(label, color);
  const material = new MeshBasicMaterial({
    color: texture ? 0xffffff : color,
    depthTest: false,
    map: texture ?? undefined,
    transparent: true,
  });
  const panel = new Mesh(new PlaneGeometry(1.06, 0.52), material);
  return panel;
}

function createAvatarRig() {
  const rig = new Group();
  const suitMaterial = new MeshStandardMaterial({
    color: "#141924",
    emissive: "#1f4e64",
    emissiveIntensity: 0.28,
    metalness: 0.14,
    roughness: 0.46,
  });
  const skinMaterial = new MeshStandardMaterial({
    color: "#f2c391",
    emissive: "#7a3513",
    emissiveIntensity: 0.2,
    roughness: 0.58,
  });
  const accentMaterial = new MeshStandardMaterial({
    color: "#ff9f31",
    emissive: "#ff6f1f",
    emissiveIntensity: 0.56,
    metalness: 0.2,
    roughness: 0.32,
  });
  const faceMaterial = new MeshBasicMaterial({ color: "#120c08" });

  const torso = new Mesh(new BoxGeometry(0.44, 0.6, 0.22), suitMaterial);
  const head = new Mesh(new SphereGeometry(0.18, 24, 24), skinMaterial);
  const chestCore = new Mesh(new BoxGeometry(0.22, 0.08, 0.235), accentMaterial);
  const leftEye = new Mesh(new SphereGeometry(0.018, 12, 12), faceMaterial);
  const rightEye = new Mesh(new SphereGeometry(0.018, 12, 12), faceMaterial);
  const leftLeg = new Mesh(new BoxGeometry(0.13, 0.58, 0.13), suitMaterial);
  const rightLeg = new Mesh(new BoxGeometry(0.13, 0.58, 0.13), suitMaterial);
  const leftArm = new Mesh(new BoxGeometry(0.58, 0.1, 0.1), suitMaterial);
  const rightArm = new Mesh(new BoxGeometry(0.58, 0.1, 0.1), suitMaterial);
  const leftForearm = new Mesh(new BoxGeometry(0.46, 0.09, 0.09), suitMaterial);
  const rightForearm = new Mesh(new BoxGeometry(0.46, 0.09, 0.09), suitMaterial);
  const leftHand = new Mesh(new SphereGeometry(0.075, 18, 18), skinMaterial);
  const rightHand = new Mesh(new SphereGeometry(0.075, 18, 18), skinMaterial);

  torso.position.set(0, 0.34, 0.26);
  head.position.set(0, 0.86, 0.28);
  chestCore.position.set(0, 0.43, 0.38);
  leftEye.position.set(-0.06, 0.9, 0.44);
  rightEye.position.set(0.06, 0.9, 0.44);
  leftLeg.position.set(-0.12, -0.23, 0.26);
  rightLeg.position.set(0.12, -0.23, 0.26);
  leftArm.position.set(-0.34, 0.54, 0.29);
  rightArm.position.set(0.34, 0.54, 0.29);
  leftForearm.position.set(-0.52, 0.84, 0.34);
  rightForearm.position.set(0.52, 0.84, 0.34);
  leftHand.position.set(-0.68, 0.98, 0.37);
  rightHand.position.set(0.68, 0.98, 0.37);

  leftArm.rotation.z = 0.18;
  rightArm.rotation.z = -0.18;
  leftForearm.rotation.z = 0.62;
  rightForearm.rotation.z = -0.62;

  rig.add(
    torso,
    head,
    chestCore,
    leftEye,
    rightEye,
    leftLeg,
    rightLeg,
    leftArm,
    rightArm,
    leftForearm,
    rightForearm,
    leftHand,
    rightHand,
  );

  return rig;
}

export function AboutCharacterStage() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) {
      return;
    }
    const container: HTMLDivElement = mountElement;

    const reportError = () => {
      window.setTimeout(() => setHasError(true), 0);
    };

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      reportError();
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    const clock = new Clock();
    const root = new Group();
    const avatarRig = createAvatarRig();
    let mixer: AnimationMixer | null = null;
    let animationFrame = 0;
    let disposed = false;
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    scene.background = null;
    scene.add(root);

    camera.position.set(0, 1.02, 4.45);
    camera.lookAt(0, 0.82, 0);

    const ambientLight = new AmbientLight(0xffd7ae, 1.7);
    const keyLight = new DirectionalLight(0xffffff, 2.4);
    const rimLight = new DirectionalLight(0xff7a1f, 2.7);
    keyLight.position.set(2.6, 3.8, 3.2);
    rimLight.position.set(-3.2, 2.4, -2.2);
    scene.add(ambientLight, keyLight, rimLight);

    const tsPanel = createTechPanel("TypeScript", "#57c7ff");
    const nextPanel = createTechPanel("Next.js", "#f6f7fb");
    tsPanel.position.set(-0.68, 1.2, 0.48);
    nextPanel.position.set(0.68, 1.2, 0.48);
    tsPanel.rotation.set(-0.08, 0.24, -0.06);
    nextPanel.rotation.set(-0.08, -0.24, 0.06);

    const platform = new Mesh(
      new BoxGeometry(2.45, 0.08, 1.48),
      new MeshStandardMaterial({
        color: new Color("#1a0b05"),
        emissive: new Color("#5f2108"),
        emissiveIntensity: 0.42,
        metalness: 0.2,
        roughness: 0.52,
      }),
    );
    platform.position.set(0, -1.05, 0);

    const platformRing = new Mesh(
      new TorusGeometry(1.3, 0.026, 12, 96),
      new MeshBasicMaterial({
        color: "#ff9f31",
        transparent: true,
        opacity: 0.82,
      }),
    );
    platformRing.position.set(0, -0.98, 0);
    platformRing.rotation.x = Math.PI / 2;

    const backRing = new Mesh(
      new TorusGeometry(1.42, 0.018, 12, 96),
      new MeshBasicMaterial({
        color: "#57c7ff",
        transparent: true,
        opacity: 0.34,
      }),
    );
    backRing.position.set(0, 0.92, -0.48);

    const gripMaterial = new MeshStandardMaterial({
      color: "#ffd36a",
      emissive: "#ff7a1f",
      emissiveIntensity: 0.72,
      metalness: 0.12,
      roughness: 0.38,
    });
    const leftGrip = new Mesh(new SphereGeometry(0.065, 18, 18), gripMaterial);
    const rightGrip = new Mesh(new SphereGeometry(0.065, 18, 18), gripMaterial);
    const leftBeam = new Mesh(new BoxGeometry(0.5, 0.035, 0.035), gripMaterial);
    const rightBeam = new Mesh(new BoxGeometry(0.5, 0.035, 0.035), gripMaterial);
    leftGrip.position.set(-0.4, 1.04, 0.36);
    rightGrip.position.set(0.4, 1.04, 0.36);
    leftBeam.position.set(-0.52, 1.08, 0.37);
    rightBeam.position.set(0.52, 1.08, 0.37);
    leftBeam.rotation.z = 0.18;
    rightBeam.rotation.z = -0.18;

    root.add(
      backRing,
      platform,
      platformRing,
      leftBeam,
      rightBeam,
      leftGrip,
      rightGrip,
      avatarRig,
      tsPanel,
      nextPanel,
    );

    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    container.appendChild(renderer.domElement);

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = Math.max(width / Math.max(height, 1), 0.1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const loader = new GLTFLoader();
    loader.load(
      "/models/cesium-man.glb",
      (gltf) => {
        if (disposed) {
          return;
        }

        const model = gltf.scene;
        model.position.set(0, -1.03, -0.18);
        model.rotation.set(0, Math.PI, 0);
        model.scale.setScalar(0.98);
        model.traverse((object) => {
          if (object instanceof Mesh) {
            object.frustumCulled = false;
          }
        });
        root.add(model);

        if (!shouldReduceMotion && gltf.animations.length > 0) {
          mixer = new AnimationMixer(model);
          mixer.clipAction(gltf.animations[0]).play();
        }
      },
      undefined,
      reportError,
    );

    function animate() {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();
      mixer?.update(delta);

      if (!shouldReduceMotion) {
        root.rotation.y = Math.sin(elapsed * 0.75) * 0.09;
        root.position.y = Math.sin(elapsed * 1.15) * 0.035;
        avatarRig.rotation.y = Math.sin(elapsed * 1.4) * 0.08;
        tsPanel.position.y = 1.2 + Math.sin(elapsed * 1.9) * 0.055;
        nextPanel.position.y = 1.2 + Math.cos(elapsed * 1.85) * 0.055;
        platformRing.rotation.z = elapsed * 0.36;
        backRing.rotation.z = -elapsed * 0.18;
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    }

    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      renderer.dispose();
      renderer.domElement.remove();
      scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, []);

  return (
    <div className="relative h-full min-h-[18rem] overflow-hidden bg-black/20">
      <div
        ref={mountRef}
        aria-label="Animated 3D character holding TypeScript and Next.js panels"
        className="absolute inset-0"
      />

      {hasError ? (
        <div className="absolute inset-5 grid place-items-center border border-orange-300/24 bg-black/54 p-5 text-center backdrop-blur-md">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-0 text-orange-200">
              3D signal offline
            </p>
            <p className="mt-3 text-sm leading-6 text-white/66">
              TypeScript and Next.js modules are ready, but the character model
              could not load.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
