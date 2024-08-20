import { useEffect, useRef} from 'react';
import * as THREE from 'three';
import { motion, PanInfo } from "framer-motion"
import degToRad from '../helpers/degToRad';
import { GLTFLoader} from 'three/examples/jsm/Addons.js';



interface Props {
  title: string;
  text: string;
  modelPath: string;
}


const geometry = new THREE.BoxGeometry(3,5,1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const yAxis = new THREE.Vector3(0, 1, 0);
const zAxis = new THREE.Vector3(0, 0, 1);
const loader = new GLTFLoader();

export default function DeviceRow({title, text, modelPath}: Props) {
  
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  }));
  const cube = useRef<THREE.Mesh | THREE.Group<THREE.Object3DEventMap> >(new THREE.Mesh(geometry, material));
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ));
  
  let scene = sceneRef.current;
  let camera = cameraRef.current;
  let renderer = rendererRef.current

  
  const animationLoop = () => {
    cube.current.rotateOnWorldAxis(yAxis, degToRad(.2));
    rendererRef.current.render(scene, camera);
  };

  useEffect(() => {
    

    scene = sceneRef.current;
    camera = cameraRef.current;
    renderer = rendererRef.current;
    
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000,0);  
    renderer.setPixelRatio(window.devicePixelRatio);


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);


    const spotLight = new THREE.SpotLight(0xffffff, 200);
    scene.add(spotLight);
    spotLight.position.set(0, 15, 0);
    spotLight.castShadow = true;
    spotLight.angle = .24;
    spotLight.penumbra = 1;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 2, 5);
    directionalLight.target.position.set(0, 2, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);


    
    loader.load(modelPath, (gltf)=>{
      const model = gltf.scene;
      cube.current = model;
      
      cube.current.scale.set(0.15, 0.15, 0.15);
      cube.current.position.set(0, 0, 0);
      cube.current.position.y = 2;
      cube.current.rotation.y = degToRad(-90);
      cube.current.rotateOnWorldAxis(yAxis, degToRad(-45));
      cube.current.rotateOnAxis(zAxis, degToRad(-70));
      cube.current.castShadow = true;

      scene.add(cube.current);
      renderer.render(scene, camera);
    })
    
    
    const base = new THREE.CylinderGeometry(4.5, 4.04, 0.2, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const baseMesh = new THREE.Mesh(base, baseMaterial);
    baseMesh.position.y = -1.5;
    baseMesh.receiveShadow = true;
    scene.add(baseMesh);
    
    renderer.setSize( (sceneContainerRef.current?.offsetWidth || 0), (sceneContainerRef.current?.offsetHeight || 0) );
    sceneContainerRef.current?.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    
    
    
    camera.position.set(0, 2, 5);
    
    renderer.setAnimationLoop(animationLoop);
    renderer.render(scene,camera)

  }, []);


  function handlePan(_:PointerEvent,i:PanInfo){
    
    cube.current.rotateOnWorldAxis(yAxis, degToRad(i.delta.x));
    cube.current.rotateOnAxis(zAxis, degToRad(i.delta.y * -1));
    renderer.render(scene, camera);
  }

  return <div className="deviceRow">
    <div className="deviceRow--deviceInfo">
      <div className="deviceRow--title">{title}</div>
      <div className="deviceRow--text">{text}</div>
    </div>
    <motion.div 

    onPanStart={()=>{renderer.setAnimationLoop(null)}}
    onPan={handlePan}
    onPanEnd={()=>{renderer.setAnimationLoop(animationLoop)}}

    className="deviceRow--3dDevice" ref={sceneContainerRef}>
    </motion.div>
  </div>
  
};
