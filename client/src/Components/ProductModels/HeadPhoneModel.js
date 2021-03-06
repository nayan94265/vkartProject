import React,{ Suspense, useRef, useState, useEffect} from 'react';
import { Canvas, useFrame } from "react-three-fiber";
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot,useProxy } from "valtio";


const headsetstate = proxy({
    current: null,
    items: {
    wires:"#000000",
    junction:"#ff0000",
    strips:"#ffffff"
    },
  })


export function HeadPhone(props) {

    const ref = useRef()
    const snap = useSnapshot(headsetstate)
    const { nodes, materials } = useGLTF("headphonesmodel.glb");
    console.log(nodes, materials);
  
    useFrame((headsetstate) => {
      const t = headsetstate.clock.getElapsedTime()
      ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
      ref.current.rotation.x = Math.cos(t / 4)*15/ 8
      ref.current.rotation.y = Math.sin(t / 4)*15 / 8
      ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    })
  
    // Cursor showing current color
    const [hovered, set] = useState(null)
    useEffect(() => {
      const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
      const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
    }, [hovered])
  
  
    return (
  
      <group
        ref={ref}
        dispose={null}
        onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
        onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        onPointerMissed={() => (headsetstate.current = null)}
        onPointerDown={(e) => (e.stopPropagation(), (headsetstate.current = e.object.material.name))}
        >
        
        <mesh geometry={nodes['cable_b3_1'].geometry} material={materials["black"]} material-color={snap.items.wires}  />
        <mesh geometry={nodes['cable_b3_2'].geometry} material={materials["black"]} material-color={snap.items.wires}  />
        <mesh geometry={nodes['cable_b3_3'].geometry} material={materials["black"]} material-color={snap.items.wires}  />
        <mesh geometry={nodes['cable_b3_4'].geometry} material={materials["black"]} material-color={snap.items.wires}  />

        <mesh geometry={nodes['headband_junc_c1'].geometry} material={materials["grey"]} material-color={snap.items.junction}  />
        <mesh geometry={nodes['headband_junc_c1_1'].geometry} material={materials["grey"]} material-color={snap.items.junction}  />
        <mesh geometry={nodes['headband_junc_c1_2'].geometry} material={materials["grey"]} material-color={snap.items.junction}  />
        
        <mesh geometry={nodes['phone.L_cupL_1'].geometry} material={materials["fab"]} material-color={snap.items.main_cover}  />
        <mesh geometry={nodes['phone.L_cupL_2'].geometry} material={materials["white"]} material-color={snap.items.main_cover}  />
        <mesh geometry={nodes['phone.L_cupL_3'].geometry} material={materials["silver"]} material-color={snap.items.main_cover}  />
        <mesh geometry={nodes['phone.L_cupL_4'].geometry} material={materials["black"]} material-color={snap.items.main_cover}  />
        <mesh geometry={nodes['phone.L_cupL_5'].geometry} material={materials["grey"]} material-color={snap.items.main_cover}  />

        <mesh geometry={nodes['phone.R_cupR_1'].geometry} material={materials["fab"]} material-color={snap.items.main_cover}  />
        <mesh geometry={nodes['phone.R_cupR_2'].geometry} material={materials["white"]} material-color={snap.items.main_cover}  />
        <mesh geometry={nodes['phone.R_cupR_3'].geometry} material={materials["silver"]} material-color={snap.items.main_cover}  />
        <mesh geometry={nodes['phone.R_cupR_4'].geometry} material={materials["black"]} material-color={snap.items.main_cover}  />
        <mesh geometry={nodes['phone.R_cupR_5'].geometry} material={materials["grey"]} material-color={snap.items.main_cover}  />
      </group>
  
    )
    
}

function Picker() {
    const snap = useSnapshot(headsetstate)
    return (
      <div style={{ display: snap.current ? "block" : "none" }}>
        <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (headsetstate.items[snap.current] = color)} />
        <h4>{snap.current}</h4>
       
      </div>
    )
  }

const HeadPhoneModel = () => {
    return  (
        <>
      <Canvas  concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={null}>
          <HeadPhone />
          <Environment files="royal_esplanade_1k.hdr" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={5} height={5} blur={2} far={1} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
    </>
      );
}

export default HeadPhoneModel;