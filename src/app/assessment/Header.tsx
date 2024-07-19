import { Logo } from "../../components/Logo";

type HeaderProps = {
  title?: string;
};
export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex flex-col justify-center bg-hero bg-no-repeat lg:h-[380px] xl:h-[490px] bg-[#D9DEA5]">
      <div className="xl:ml-80 lg:ml-40 ml-10 max-w-4xl">
        <h1 className="text-5xl ">
          <Logo />
        </h1>
        {title && (
          <h2 className="capitalize text-2xl sm:text-3xl lg:text-5xl xl:text-[56px] font-extrabold mt-4 lg:mt-10 mb-8">
            {title}
          </h2>
        )}
      </div>
    </header>
  );
};
