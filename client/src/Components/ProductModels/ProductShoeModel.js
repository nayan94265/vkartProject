import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot } from "valtio";
import styled from 'styled-components'

import CancelSharpIcon from '@mui/icons-material/CancelSharp';


const state = proxy({
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
});

function Shoe() {
  const snap = useSnapshot(state);
  const ref = useRef();

  const { nodes, materials } = useGLTF("shoetutorial.glb")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })


  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])


  

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
   
    <group
   
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} 
      material-color={snap.items.laces}/>
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} 
      material-color={snap.items.mesh}/>
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} 
      material-color={snap.items.caps}/>
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner}/>
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole}
      material-color={snap.items.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={snap.items.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band}
      material-color={snap.items.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={snap.items.patch}  />
    
    </group>
   
  )
};
{/* <div style={{ display: snap.current ? "block" : "none" }}> */}




function Picker() {
  const snap = useSnapshot(state);
  const [togglePicker, settogglePicker] = useState(false)

  const closePicker=(togglePicker)=>{
    if(togglePicker === false){
      settogglePicker(true);
      console.log('true')
      }
      else{
        settogglePicker(false);
        console.log('false')
      }
  }

  return (
    <div style={{ display: snap.current ? "block" : "none" }} >
      
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <CancelSharpIcon visibility={togglePicker} onclick={()=> closePicker(togglePicker)}/>
      <h3><i>{snap.current}</i></h3>
    </div>
  );
}

const ProductShoeModel=(props)=> {
  return (
    <>
    <Container>
    <ProductDetails> 
     <p>Vivo V20 Pro (Midnight Jazz, 8GB RAM, 128GB ROM)</p>
     <p>
       <ul>
         <li><i>16.35 centimeters (6.44 inch) FHD+ multi-touch capacitive touchscreen with 2400 x 1080 pixels resolution 4000mAH lithium-ion battery</i></li>


       </ul>
     </p>
     <p onclick={()=>{console.log("button")}}>₹29,990.00</p>
   </ProductDetails>
  
       <Canvas style=
       {{display: 'flex',margin:'auto',background:'#D1E6EA',minHeight:'500px',justifyContent:'center',borderRadius:'10px',marginLeft:'auto',marginRight:'auto',width: '900px'}} 
         concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 8],fov:10 }}>
        
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={null}>
        
          <Shoe/>
         
          <Environment files="royal_esplanade_1k.hdr" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={15} height={15} blur={2} far={1} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
       
      </Canvas>
      <Picker/>
      </Container>
    
    </>
  )
};

const Container = styled.div`
background-color:#D1E6EA;
box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
      
width: 1200px;
display: flex;
justify-content:center ;
border-radius:10px;
margin-left: auto;
min-height: 600px;
margin-right: auto;


`;

const ProductDetails=styled.div`
background-color:#D1E6EA;
padding:20px;
width: 300px;
border-right: 1px solid white;
/* &:nth-child(1) {
      
        background-color:blue;
    } */
    > * {
      &:first-child {
        text-transform: uppercase;
        font-size:40px;
        color: #46667C;
        font-family: 'Bebas Neue', cursive;
      }
      &:nth-child(3){
        font-size:55px;
        text-transform: uppercase;
        color: #46667C;
        font-family: 'Bebas Neue', cursive;
      
        &:hover{
          transform: scale(1.5,1.5);
         
        }
      }
    }
`;



export default ProductShoeModel;