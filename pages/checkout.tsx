import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import {useAtomValue} from "jotai";
import React, {forwardRef, useEffect, useMemo, useState} from "react";
import {cartAtom} from "@/atom/cart";
import Link from "next/link";
import { checkDiscountCode, postDataCheckout } from "@/services/api";
import Head from "next/head";
import useModal from "@/hooks/useModal";
import ModalCheckoutSuccess from "@/components/checkouts/ModalCheckoutSuccess";
import ModalCheckoutError from "@/components/checkouts/ModalCheckoutError";
import clsx from "clsx";
import { useGetDeliveryRate } from "@/query/useGetDeliveryRate";
import { useCheckDiscountCode } from "@/query/useCheckDiscountCode";
import countryList from 'react-select-country-list'
import Select from 'react-select'
import {Controller, useForm, useWatch} from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "next-i18next";
import serverSideTranslations from "@/utils/serverSideTranslations";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import ReactLoading from "react-loading";
import { useCurrency } from "@/hooks/useCurrency";
import parseNumber from "@/utils/parseNumber";
import { getSlug } from "@/utils/slugify";

const MySwal = withReactContent(Swal);

const inputCheckout = {
    base: "w-full border border-neutral-200 h-11 px-4 py-3 rounded-2xl bg-white dark:border-neutral-700 dark:bg-neutral-900",
    focus:
        "border-primary-300 ring ring-primary-200 ring-opacity-50 dark:ring-primary-6000 dark:ring-opacity-25",
};

const DateInput = forwardRef((props, ref) => {
    return (
        <div>
            <input {...props} className={inputCheckout.base} />
            <i className="absolute top-2 right-3 mdi mdi-calendar text-lg"></i>
        </div>
    )
})

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export const Checkout = () => {
    const { t } = useTranslation();
    const cart = useAtomValue(cartAtom);
    const stripe = useStripe();
    const elements = useElements();
    const {isOpen, openModal, closeModal} = useModal();
    const {
        isOpen: isOpenError,
        openModal: openModalError,
        closeModal: closeModalError,
    } = useModal();
    
    const [checkoutError, setCheckoutError] = useState(null);
    const [successDiscount, setSuccessDiscount] = useState(false);
    const [amountDiscount, setAmountDiscount] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [esim, setEsim] = useState(false);
    const [physicalSim, setPhysicalSim] = useState(false);
    const { currentCurrency, parseCurrency } = useCurrency();
    const [code, setCode] = useState("");

    const [cardNumberError, setCardNumberError] = useState('');
    const [cardExpireError, setCardExpireError] = useState('');
    const [cardCvcError, setCardCvcError] = useState('');

    const [startDate, setStartDate] = useState(new Date());

    const { data: deliveryRate } = useGetDeliveryRate();

    const {register, handleSubmit, control, watch, formState: {errors, isValid, submitCount}} = useForm();
    const country = useWatch({ control, name: 'country' });

    const deliveryCost = useMemo(() => {
        if (country && deliveryRate) {
            const countryItem = deliveryRate.find((item) => item.country === country.value);
            if (countryItem && countryItem.amount) {
                return countryItem.amount;
            }
        }
        return 0;
    }, [country, deliveryRate]);

    const total = useMemo(() => {
      return cart.reduce((sum, item) => {
        sum += parseNumber(item.price) * parseNumber(item.quantity);
        return sum;
      }, physicalSim ? deliveryCost : 0);
    }, [cart, physicalSim, deliveryCost]);

    const totalQuantity = useMemo(() => {
        return cart.reduce((sum, item) => {
            sum += parseNumber(item.quantity);
            return sum;
        }, 0);
    }, [cart]);

    const onCardChange = ({ elementType, complete, error }) => {
        const errorMessage = error ? error.message : '';
        if (elementType === 'cardNumber') {
          setCardNumberError(complete ? null : errorMessage);
        } else if (elementType === 'cardExpiry') {
          setCardExpireError(complete ? null : errorMessage);
        } else if (elementType === 'cardCvc') {
          setCardCvcError(complete ? null : errorMessage);
        }
    }

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            setLoading(false);
            if (name == 'esim') {
                if (value.esim == 'false') {
                    setEsim(false);
                    setPhysicalSim(true);
                    // setTimeout(() => {
                    //     MySwal.fire({
                    //         html: (
                    //             <div className="flex items-center justify-center gap-2">
                    //                 {t('popup.shipping')}
                    //             </div>
                    //         ), icon: null,
                    //     }).then()
                    // }, 300)
                }
                else if (value.esim == 'true') {
                    setEsim(true);
                    setPhysicalSim(false);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        if (submitCount > 0) {
            if (cardNumberError === '') {
                setCardNumberError(`${t('checkout.cardNumber')} ${t('checkout.isRequired')}`)
            }
            if (cardExpireError === '') {
                setCardExpireError(`${t('checkout.expiryDate')} ${t('checkout.isRequired')}`)
            }
            if (cardCvcError === '') {
                setCardCvcError(`${t('checkout.CVC')} ${t('checkout.isRequired')}`)
            }
        }
    }, [submitCount]);

    const STRIPE_TOKEN = process.env.NEXT_PUBLIC_STRIPE_KEY;

    const getToken = (token) => {
        if (STRIPE_TOKEN.includes("test")) {
            return {stripe_token: "tok_visa"};
        } else {
            return {stripe_token: token.id};
        }
    };

    const onSubmit = async (values) => {
        setLoading(true);
        const data = {...values};
        delete data['esim'];
        const tokenResult = await stripe.createToken(elements.getElement(CardNumberElement));
        if (tokenResult.token) {
            const token = getToken(tokenResult.token);
            // const token = tokenResult.token;
            const dataProduct = {
                products: cart.map((item) => {
                    return {
                        id: item.id,
                        quantity: item.quantity,
                    };
                }),
            };

            const postData = {
                ...data,
                ...token,
                esim: esim,
                discount_code: code,
                start_active_date: startDate.toISOString(),
                ...dataProduct,
            };

            if (STRIPE_TOKEN) {
                postDataCheckout(postData).then(function(response) {
                    openModal();
                    setLoading(false);
                }).catch(function(error) {
                    const res = error.response;
                    setLoading(false);
                    setCheckoutError(res.data.error);
                    openModalError();
                });
            }
        } else {
            setLoading(false);
            MySwal.fire({
                html: (
                    <div className="flex items-center justify-center gap-2">
                        {tokenResult.error.message}
                    </div>
                ),
            });
        }
    };

    const options = useMemo(() => countryList().getData(), []);

    const handleCheckDiscountCode = async () => {
        let product = null
        if (cart.length == 1) {
            product = cart[0].id
        }
        await checkDiscountCode({code: code, amount: total, product: product}).then((res) => {
            if (res.data.success) {
                setSuccessDiscount(true);
                setAmountDiscount(res.data.amount);
            } else {
                setSuccessDiscount(false);
            }
        });
    };

    const {mutate} = useCheckDiscountCode(handleCheckDiscountCode);

    const handleClickApply = () => {
        mutate();
    };

    const handleChangeCode = (event) => {
        setCode(event.target.value);
        setSuccessDiscount(false);
        setAmountDiscount(0);
    };

    return (
        <>
            <Head>
                <title>Xplori - Checkout</title>
            </Head>
            <div className="bg-white">
                <div className="container shadow-xl bg-[#F8F8F8] text-black lg:pb-56 lg:pt-32 pb-32 pt-24">
                    <div className="lg:text-4xl text-2xl font-semibold">{t('checkout.title')}</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-10 grid lg:grid-cols-8 grid-cols-1 gap-10">
                            <div className="lg:col-span-5 col-span-full lg:p-10 p-5 border-2 border-gray-200 rounded-lg space-y-6">
                                <div className="space-y-2">
                                    <div className="grid">
                                        <label className="text-md font-medium capitalize">{t('checkout.selectSimType')}<span className="text-red-400">*</span></label>
                                        <select className={inputCheckout.base} {...register("esim", {required: true})}>
                                            <option value=""></option>
                                            <option value="true">{t('checkout.eSim')}</option>
                                            <option value="false">{t('checkout.physicalSim')}</option>
                                        </select>
                                        {errors.esim?.type === 'required' && <p className="text-red-400">{t('checkout.selectSimType')} {t('checkout.isRequired')}</p>}
                                    </div>
                                    <div className="w-full">
                                        <label className="text-md font-medium capitalize">{t('checkout.startDate')}<span className="text-red-400">*</span></label>
                                        <DatePicker className="border border-neutral-200 h-11 px-4 py-3 rounded-2xl bg-white dark:border-neutral-700 dark:bg-neutral-900 w-full" selected={startDate} onChange={(date) => setStartDate(date)} customInput={<DateInput />} dateFormat="dd/MM/yyyy" popperModifiers={[{
                                            name: 'arrow',
                                            options: { padding: ({ popper }) => ({ right: popper.width - 32 }) },
                                        }]} />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="text-xl font-semibold">{t('checkout.contactInfo')}</div>
                                        <div className="space-y-2">
                                            <div className="grid">
                                                <label className="text-md font-medium capitalize">{t('checkout.name')}<span className="text-red-400">*</span></label>
                                                <input className={inputCheckout.base} {...register("receiver_name", {required: true, maxLength: 100})} />
                                                {errors.receiver_name?.type === 'required' && <p className="text-red-400">{t('checkout.name')} {t('checkout.isRequired')}</p>}
                                            </div>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                                <div className="">
                                                    <label className="text-md font-medium capitalize">{t('checkout.email')}<span
                                                        className="text-red-400">*</span></label>
                                                    <input className={inputCheckout.base} {...register("receiver_email", {required: true, pattern: /^\S+@\S+$/i})} />
                                                    {errors.receiver_email?.type === 'required' && <p className="text-red-400">{t('checkout.email')} {t('checkout.isRequired')}</p>}
                                                </div>
                                                <div className="">
                                                    <label className="text-md font-medium capitalize">{t('checkout.phoneNumber')}
                                                        {!esim && <span className="text-red-400">*</span>}
                                                    </label>
                                                    <input className={inputCheckout.base} {...register("receiver_phone", {required: !esim, maxLength: 20})} />
                                                    {errors.receiver_phone?.type === 'required' && <p className="text-red-400">{t('checkout.phoneNumber')} {t('checkout.isRequired')}</p>}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                                <div className="">
                                                    <label className="text-md font-medium capitalize">{t('checkout.country')}
                                                        {!esim && <span className="text-red-400">*</span>}
                                                    </label>
                                                    <Controller name="country"
                                                                control={control}
                                                                {...register('country', {required: !esim})}
                                                                render={({ field }) => <Select {...field} options={options}/>} />
                                                    {errors.country?.type === 'required' && <p className="text-red-400">{t('checkout.country')} {t('checkout.isRequired')}</p>}
                                                </div>
                                                {!esim && (
                                                    <div className="">
                                                        <label className="text-md font-medium capitalize">{t('checkout.city')}
                                                            {!esim && <span className="text-red-400">*</span>}
                                                        </label>
                                                        <input className={inputCheckout.base} {...register("city", {required: !esim})} />
                                                        {errors.city?.type === 'required' && <p className="text-red-400">{t('checkout.city')} {t('checkout.isRequired')}</p>}
                                                    </div>
                                                )}
                                            </div>
                                            {!esim && (
                                                <div className="">
                                                    <label className="text-md font-medium capitalize">{t('checkout.address')}
                                                        {!esim && <span className="text-red-400">*</span>}
                                                    </label>
                                                    <input className={inputCheckout.base} {...register("delivery_address", {required: !esim})} />
                                                    {errors.delivery_address?.type === 'required' && <p className="text-red-400">{t('checkout.address')} {t('checkout.isRequired')}</p>}
                                                </div>
                                            )}
                                            {!esim && (
                                                <div className="">
                                                    <label className="text-md font-medium capitalize">{t('checkout.postcode')}
                                                        {!esim && <span className="text-red-400">*</span>}
                                                    </label>
                                                    <input className={inputCheckout.base} {...register("postcode", {required: !esim})} />
                                                    {errors.postcode?.type === 'required' && <p className="text-red-400">{t('checkout.postcode')} {t('checkout.isRequired')}</p>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-xl font-semibold">{t('checkout.paymentInfo')}</div>
                                        <div className="space-y-2">
                                            <div className="">
                                                <label className="text-md font-medium capitalize">
                                                    {t('checkout.cardNumber')}<span className="text-red-400">*</span>
                                                </label>
                                                <CardNumberElement onChange={onCardChange} options={{showIcon: true, classes: inputCheckout}}/>
                                                {!!cardNumberError && <p className="text-red-400">{cardNumberError}</p>}
                                            </div>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                                <div className="_mt-6">
                                                    <label className="text-md font-medium capitalize">
                                                        {t('checkout.expiryDate')}<span className="text-red-400">*</span>
                                                    </label>
                                                    <CardExpiryElement onChange={onCardChange} options={{classes: inputCheckout}} />
                                                    {!!cardExpireError && <p className="text-red-400">{cardExpireError}</p>}
                                                </div>
                                                <div className="_mt-6">
                                                    <label className="text-md font-medium capitalize">
                                                        {t('checkout.CVC')}<span className="text-red-400">*</span>
                                                    </label>
                                                    <CardCvcElement onChange={onCardChange} options={{classes: inputCheckout}}/>
                                                    {!!cardCvcError && <p className="text-red-400">{cardCvcError}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-3 col-span-full p-2">
                                <div className="p-2 border-[0.5px] border-gray-200 rounded-lg">
                                    {cart.map((item, index) => (
                                        <div className={clsx("grid grid-cols-3 gap-5", index !== 0 && "mt-3")}
                                             key={index}>
                                            <div className="col-span-1">
                                                <img alt="" src={item.image}/>
                                            </div>
                                            <div className="col-span-2 space-y-1">
                                                <Link href={`/products/${getSlug(item.id, item.country)}`}
                                                      className="lg:text-xl hover:text-indigo-600 ease-in-out duration-500 font-semibold row-span-1">
                                                    {item.name}
                                                </Link>
                                                <div className="">
                                                    <span className="text-sm font-medium text-blue-400">{t('checkout.quantity')}:</span>{" "}
                                                    <span className="font-semibold">{item.quantity}</span>
                                                </div>
                                                <div className="text-primary font-semibold text-xl">
                                                    {currentCurrency.symbol}{" "}
                                                    {parseCurrency(parseNumber(item.price) * item.quantity)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-t-gray-200 my-5"/>
                                <div className="">
                                    <div className="w-full h-full relative">
                                        <div
                                            onClick={handleClickApply}
                                            className={clsx("absolute right-1 top-1 h-[80%] w-16 text-white flex items-center justify-center rounded-sm hover:cursor-pointer hover:opacity-80 hover:transition",
                                                code ? "bg-indigo-600 " : "bg-gray-400 pointer-events-none")}>
                                            {t('checkout.apply')}
                                        </div>
                                        <input placeholder={t('checkout.discountCode')} value={code} onChange={handleChangeCode}
                                               className="btn rounded w-full h-full pr-20"
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    {successDiscount && (
                                        <div className="flex items-center justify-between">
                                            <div className="font-medium text-xl">{t('checkout.discount')}:</div>
                                            <div className="text-indigo-600 font-medium text-2xl">
                                                {currentCurrency.symbol}{" "}
                                                {parseCurrency(total - amountDiscount)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-3 space-y-1">
                                    {physicalSim && (
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-500">{t('checkout.deliveryCost')}:</div>
                                                <div className="text-sm text-gray-400">({t('checkout.deliveryByCountry')})</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-gray-500 font-medium">
                                                    {currentCurrency.symbol}{" "}
                                                    {parseCurrency(deliveryCost)}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium text-xl">{t('checkout.total')}:</div>
                                        <div className="text-right">
                                            <div className="text-indigo-600 font-medium text-2xl">
                                                {currentCurrency.symbol}{" "}
                                                {parseCurrency(amountDiscount ? amountDiscount : total)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className={
                                      "mt-2 w-full btn rounded-md h-[60px] font-semibold text-2xl" +
                                      (
                                    // isValid &&
                                    //   startDate &&
                                    //   cardCvcError &&
                                    //   cardExpireError &&
                                    //   cardNumberError &&
                                      !isLoading
                                        ? " bg-indigo-600 hover:bg-indigo-500 text-white"
                                        : " bg-gray-400 pointer-events-none text-red")
                                    }>
                                    {isLoading ? (
                                        <>
                                            <div className="flex  justify-center items-center">
                                                <ReactLoading
                                                    height="60%"
                                                    width={50}
                                                    color="#FFFFFF"
                                                    type="bars"
                                                ></ReactLoading>
                                            </div>
                                        </>
                                    ) : t('cart.checkout')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ModalCheckoutSuccess
                closeModal={closeModal}
                isOpen={isOpen}
                amount={amountDiscount || total}
            />
            <ModalCheckoutError closeModal={closeModalError} isOpen={isOpenError} error={checkoutError}/>
        </>
    );
};

Checkout.layout = LayoutWrapper;
export default Checkout;
