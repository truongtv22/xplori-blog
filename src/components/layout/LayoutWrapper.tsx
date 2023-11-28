import React from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../layout/Layout"), { ssr: false });

export const LayoutWrapper: React.FC<any> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default LayoutWrapper;
