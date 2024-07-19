import { ReactNode } from "react";

type DashboardTemplateProps = {
  children: ReactNode;
};

export default function DashboardTemplate({
  children,
}: DashboardTemplateProps) {
  return <div className="container mx-auto px-5 py-8 ">{children}</div>;
}
