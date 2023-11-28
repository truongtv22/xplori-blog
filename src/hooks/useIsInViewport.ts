import {useEffect, useMemo, useState} from "react";


export const useIsInViewport = (ref) => {
    const [isIntersecting, setIntersecting] = useState(false);

    const observer = useMemo(() => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting)), []);
    useEffect(() => {
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        }
    }, [ref, observer])
    return isIntersecting;
}