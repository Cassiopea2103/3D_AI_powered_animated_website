import { easing } from 'maath' ; 
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows , RandomizedLight } from '@react-three/drei';

const Backdrop = () => {

    const shadows = useRef () ; 

    return (
        <AccumulativeShadows 
            ref={shadows}
            temporal
            frames={ 60 } 
            alphaTest={0.5}
            scale={10}
            rotation={[Math.PI/2 , 0 , 0 ]}
            position={[ 0 , 0 , -0.15]}
            
        >
            <RandomizedLight
                amount={3}
                intensity = {0.75}
                ambient={1}
                position={[5, 5,-10]}
            />
            <RandomizedLight
                amount={3}
                intensity = {0.75}
                ambient={0.95}
                position={[-5, 6,-7]}
            />
        </AccumulativeShadows>
    )
}

export default Backdrop