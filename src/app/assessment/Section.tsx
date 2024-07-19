import Image from "next/image";
import { ReactNode } from "react";

type SectionProps = {
  label: string;
  description?: string;
  imgSrc?: string;
  alt?: string;
  children?: ReactNode;
};

export const Section = ({
  alt,
  label,
  description,
  imgSrc,
  children,
}: SectionProps) => {
  return (
    <section className="font-bold text-center mb-5">
      {imgSrc && (
        <Image
          alt={alt ?? label}
          src={imgSrc}
          className="mx-auto"
          width={100}
          height={100}
        />
      )}
      <h3 className="text-2xl my-10 capitalize">{label}</h3>
      {description && <p className="text-lg my-8">{description}</p>}
      {children}
    </section>
  );
};
