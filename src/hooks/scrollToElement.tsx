export const scrollToElement = (ref) => {
  ref?.current?.scrollIntoView({ behavior: "smooth" });
};
