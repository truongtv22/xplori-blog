import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MenuCart({ isOpen, setIsCartOpen }) {
  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(document);
    } else {
      enableBodyScroll(document);
    }
  }, [isOpen]);
  const router = useRouter();
  return (
    <>
      {isOpen && (
        <>
          <div onClick={() => setIsCartOpen(false)}
               className="fixed top-0 z-[40] w-full h-full bg-[#000000] bg-opacity-20 overflow-hidden">
          </div>
          <div className="fixed right-10 bottom-36 grid gap-3 z-[41] overflow-hidden">
            <button
              onClick={() => router.push("/checkout")}
              className="btn bg-indigo-600 h-[42px] hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700
              text-white rounded-md animate__animated animate__fadeInRight">
              Check out
            </button>
            <button
              onClick={() => router.push("/cart")}
              style={{ animationDelay: "0.3s" }}
              className="btn bg-white flex rounded-md items-center h-[42px] animate__animated animate__fadeInRight"
            >
              <div className="duration-500 ease-in-out">Go to cart</div>
              <i className="uil uil-arrow-right align-middle" />
            </button>
          </div>
        </>
      )}
    </>
  );
}
