import { useAtom, useAtomValue } from "jotai";
import { cartAtom } from "@/atom/cart";
import { Dialog } from "@headlessui/react";
import React from "react";
import { useRouter } from "next/router";
import { flexibleCreditItemAtom } from "@/atom/flexible-credit-item";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useCurrency } from "@/hooks/useCurrency";

export default function ModalCheckoutSuccess({
  isOpen,
  closeModal,
  amount,
}: {
  isOpen: boolean;
  closeModal: any;
  amount: any;
  itemsCheckout?: any;
}) {
  const { t } = useTranslation();
  const [cart, setCart] = useAtom(cartAtom);
  const { currentCurrency, parseCurrency } = useCurrency();
  const router = useRouter();
  const pathName = router.pathname;
  const item = useAtomValue(flexibleCreditItemAtom);
  const handleCloseModal = () => {
    setCart([]);
    router.push("/");
    closeModal();
  };

  return (
    <>
      <Dialog open={isOpen} className="z-50" onClose={handleCloseModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-[1200px] rounded bg-white p-6">
            <Dialog.Title className="text-2xl font-semibold" as="div">
              <div className="flex justify-between text-lime-600">
                <div>{t('checkout.checkoutSuccess')}</div>
                <i
                  onClick={handleCloseModal}
                  className="mdi mdi-close hover:cursor-pointer"
                ></i>
              </div>
            </Dialog.Title>
            <div className="mt-10 grid grid-cols-7 gap-10">
              <div className="col-span-4 text-center text-lime-600">
                <div className="flex justify-center">
                  <i className="mdi mdi-check-circle text-[144px] text-lime-600"></i>
                </div>
                <div className="text-center font-semibold text-lime-600">
                  {t('checkout.paymentSuccessful')}
                </div>
                <div className="text-md">{t('checkout.paymentCompleted')}</div>
                <div className="text-lg font-semibold">
                  {t('checkout.amountPaid')}{": "}
                  {currentCurrency.symbol}{" "}
                  {parseCurrency(amount)}
                </div>
              </div>
              <div className="col-span-3 ">
                <div className="mb-5 font-bold text-xl">{t('checkout.items')}:</div>
                {pathName.includes("flexible-credits") ? (
                  <>
                    <div className="grid gap-10">
                      <div className="grid grid-cols-3 gap-5">
                        <div className="col-span-1">
                          <img
                            alt=""
                            src="https://cdn.shopify.com/s/files/1/0023/8403/5875/products/sights-cover.jpg?v=1555133005"
                          />
                        </div>
                        <div className="col-span-2 grid grid-rows-3">
                          <div className="lg:text-xl hover:text-indigo-600 ease-in-out duration-500 font-semibold row-span-1 line-clamp-1">
                            {t('checkout.flexibleCredit')}
                          </div>
                          <div className="row-span-1">
                            <span className="text-sm font-light">
                              {t('checkout.quantity')}:
                            </span>{" "}
                            <span className="font-semibold">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="row-span-1 text-primary font-semibold text-xl">
                            {currentCurrency.symbol}{" "}
                            {parseCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className={clsx("grid gap-10", index !== 0 && "mt-5")}
                      >
                        <div className="grid grid-cols-3 gap-5">
                          <div className="col-span-1">
                            <img alt="" src={item.image} />
                          </div>
                          <div className="col-span-2 grid grid-rows-3">
                            <div className="lg:text-xl hover:text-indigo-600 ease-in-out duration-500 font-semibold row-span-1 line-clamp-1">
                              {item.name}
                            </div>
                            <div className="row-span-1">
                              <span className="text-sm font-light">
                                {t('checkout.quantity')}:
                              </span>{" "}
                              <span className="font-semibold">
                                {item.quantity}
                              </span>
                            </div>
                            <div className="row-span-1 text-primary font-semibold text-xl">
                              {currentCurrency.symbol}{" "}
                              {parseCurrency(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                <div
                  onClick={() => {
                    setCart([]);
                    router.push("/");
                  }}
                  className="rounded-full font-medium w-full hover:cursor-pointer transition h-[40px] bg-indigo-600 text-white hover:bg-red-500 text-lg flex items-center justify-center mt-10"
                >
                  {t('checkout.returnHome')}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
