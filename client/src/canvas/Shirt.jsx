import { easing } from 'maath' ; 
import { useSnapshot } from 'valtio';
import state from '../store';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

const Shirt = () => {

	// using the store 
	const snap = useSnapshot ( state ) ; 

	// loading the 3D model : 
	const { nodes , materials } = useGLTF ( '../shirt_baked.glb')  ; 

	// creating texture : 
	const logoTexture = useTexture (state.logoDecal ) ; 
	const fullTexture = useTexture (state.fullDecal ) ; 

	useFrame ( ( state , delta ) => {

		console.log ( snap.isLogoTexture )
		
		easing.dampC ( 
			materials.lambert1.color , 
			snap.color , 
			0.2 , 
			delta 
		)
	})

	const stateString = JSON.stringify ( snap ) ; 

	return (
		<group key = { stateString } >
			<mesh
				castShadow
				geometry={ nodes.T_Shirt_male.geometry}
				material={ materials.lambert1 }
				material-roughness = { 1 }  
				dispose = {null }
			>

				{/* render the texture on the model  */}
				{
					snap.isLogoTexture && 
					<Decal 
						position = { [ 0 , -0.01 , 0.1 ]}
						rotation= { [ 0 , 0 , 0 ] } 
						scale= { 0.25 }
						map = { logoTexture } 
						depthTest = { false } 
					/>
				}

				{
					snap.isFullTexture && 
					<Decal
						position = { [ 0.015 , -0.02 , 0.1 ]}
						rotation= { [ 0 , 0 , 0 ] } 
						scale= { 1 }
						map = { logoTexture }
						anisotropy = {16}
						depthTest={ false }
						depthWrite = { true }
					/>
				}
				
			</mesh>
		</group>
	)
}

export default Shirt