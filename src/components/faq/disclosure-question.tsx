import { Transition, Disclosure } from "@headlessui/react";

export default function DisclosureQuestion({ buttonText, contentText }) {
  return (
    <div className="border-b-[0.5px] border-b-gray-300 py-5">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className="flex justify-between font-semibold text-lg hover:cursor-pointer"
            >
              <div>{buttonText}</div>
              <i
                className={
                  "mdi mdi-chevron-down " + (open && "rotate-180 transition")
                }
              ></i>
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              {/*
              Don't forget to add `static` to your `Disclosure.Panel`!
            */}
              <Disclosure.Panel
                as="div"
                className="text-gray-400 mt-2 whitespace-pre-line	"
                static
              >
                {contentText}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
