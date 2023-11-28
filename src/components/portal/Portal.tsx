import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";


export const Portal = ({children}) => {
    const ref = useRef(null)
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        ref.current = document.querySelector('#portal')
        setMounted(true)
    }, [])
    return (mounted && ref.current) ? createPortal(<div className='fixed bottom-5 flex justify-center w-full'>{children}</div>, ref.current) : null
}