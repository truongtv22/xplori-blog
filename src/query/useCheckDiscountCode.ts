import {useMutation} from "react-query";
import Swal from "sweetalert2";


export const useCheckDiscountCode = (fn) => {
    return useMutation(fn, {
        onSuccess: () => {
            Swal.fire({
                // icon: 'success',
                title: 'Apply Discount Code Success',
            })
        },
        onError: (error, variables, context) => {
            // @ts-ignore
            let data = error.response.data;
            Swal.fire({
                // icon: 'error',
                title: data.error,
            })
        }
    })
}