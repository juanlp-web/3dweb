import ReactDOM from 'react-dom'
import React, { useRef, useState , Suspense  } from 'react'
import { Canvas, useFrame,useLoader  } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from "three";



function Box(props) {
    // This reference will give us direct access to the THREE.Mesh object
    const mesh = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

function Model(props) {
    const { nodes, materials } = useGLTF('./Bee.glb')

    const loader = new GLTFLoader();
    var scene = new THREE.Scene();

    loader.load( './Bee.glb', gltf => {

        scene.add( gltf.scene );
      //  console.log(gltf) 
       
       } );
   // console.log(materials , nodes)
    return (
        <group {...props} dispose={null}>
            <group name="camera" position={[10, 0, 50]} rotation={[Math.PI / 2, 0, 0]}>
                <PerspectiveCamera fov={40} near={10} far={1000} />
            </group>
            <group name="sun" position={[100, 50, 100]} rotation={[-Math.PI / 2, 0, 0]}>
                <pointLight intensity={10} />
            </group>
            <mesh geometry={scene} material={materials} />


        </group>
    )
}


const Model3d = () => {
 

    return (
        <div>
            <Canvas>
                <ambientLight />
                <Suspense fallback={null}>
                <Model />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Model3d
