import { Logo } from "@/components/Logo";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="flex flex-row h-svh">
      <div className=" w-[280px] border-r border-solid border-gray-100">
        <div className="flex flex-col h-full">
          <div className="p-5">
            <Logo />
          </div>
          <ul className="flex-1 mt-32">
            <MenuItem href="/dashboard/leads" label="Leads" />
            <MenuItem href="/dashboard/settings" label="Settings" />
          </ul>
          <LogoutLink className="mt-auto p-5 flex flex-row gap-2 items-center cursor-pointer">
            {user?.picture ? (
              <Image
                alt="profile picture"
                className="w-8 rounded-full"
                src={user.picture}
              />
            ) : (
              <UserCircleIcon className="w-8" />
            )}
            {user?.given_name} {user?.family_name}
          </LogoutLink>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">{children}</div>
    </div>
  );
}

type MenuItemProps = {
  href: string;
  label: string;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <li className="hover:bg-gray-100 hover:opacity-80">
      <Link className=" cursor-pointer text-lg " href={props.href}>
        <div className="p-4">{props.label}</div>
      </Link>
    </li>
  );
};
