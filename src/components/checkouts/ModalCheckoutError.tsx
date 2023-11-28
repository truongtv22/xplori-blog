import { Dialog } from "@headlessui/react";
import React from "react";
import { useTranslation } from "next-i18next";

export default function ModalCheckoutError({ isOpen, closeModal, error }) {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} className="z-50" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-[600px] rounded bg-white p-6">
          <Dialog.Title className="text-2xl font-semibold" as="div">
            <div className="flex justify-between text-red-600">
              <div>{t('checkout.checkoutFailed')}</div>
              <i
                onClick={closeModal}
                className="mdi mdi-close hover:cursor-pointer"
              ></i>
            </div>
          </Dialog.Title>
          <div className="">
            <div className="text-center text-red-600">
              <div className="flex justify-center">
                <i className="mdi mdi-close-circle text-[144px]"></i>
              </div>
              <div className="text-center font-semibold">{error}</div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
