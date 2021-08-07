import ReactDOM from 'react-dom'
import React, { Suspense, useState , useRef} from 'react'
import { Canvas, useFrame,useLoader  } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Flex, Box} from '@react-three/flex'
//import duck from './Bee.glb'
//import './styles.css'

function Duck() {
  const gltf = useLoader(GLTFLoader, "Bee.glb")
  return <primitive object={gltf.scene}       position={[-0, -10, -20]}
  rotation={[0, 5, 0]} args={[1, 16, 16]}/>
}

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function ArWing() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "Bee.glb");
  console.log(nodes)
  useFrame(() => {
    group.current.rotation.y += 0.004;
  });
  return (
    <group ref={group}>
      <mesh visible >
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function App() {
  return (
    <>
      <Canvas height={800} width={800} position={[20, 30, 20]} fov={75} style={{ background: "#fff" }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <Suspense fallback={<Loading />}>
          <Duck />
       
        </Suspense>
      </Canvas>
      <a
        href="https://codeworkshop.dev/blog/2020-03-31-creating-a-3d-spacefox-scene-with-react-three-fiber/"
        className="blog-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Blog Post
      </a>
    </>
  );
}
