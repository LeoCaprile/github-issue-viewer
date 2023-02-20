import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  if (session === null) {
    return null;
  }

  return (
    <nav className="bg-transparent fixed flex justify-end w-full">
      <div className="dropdown dropdown-end px-5 py-2">
        <label tabIndex={0} className="cursor-pointer bg-black">
          <Image
            className="rounded-full"
            width={50}
            height={50}
            src={session?.user?.image ?? 'https://api.dicebear.com/5.x/fun-emoji/png?size=50'}
            alt="user"
          />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a
              onClick={() => {
                signOut({ callbackUrl: '/' });
              }}
            >
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
