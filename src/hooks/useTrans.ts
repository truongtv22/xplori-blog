import { useRouter } from "next/router";
// import en from "../../public/lang/en";
// import ge from "../../public/lang/ge";
// import vi from "../../public/lang/vi";

export const useTrans = () => {
  const { locale } = useRouter();

  const trans = () => {
    switch (locale) {
      case "en":
        return "en";
      case "ge":
        return "ge";
      case "vi":
        return "vi";
    }
  };
  return trans();
};
