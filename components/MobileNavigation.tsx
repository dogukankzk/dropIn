"use client"

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { navItems } from '@/constants'
import { Button } from './ui/button'
import FileUploader from './FileUploader'
import { userLogout } from '@/lib/actions/user.actions'

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <header className='mobile-header'>
      <Image src="public/assets/icons/logo-full-brand.svg" alt='logo' width={120} height={54} className='h-auto'/>
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger>
          <Image
            src="public/assets/icons/menu.svg"
            alt="Search"
            width={24}
            height={24}
          />
        </SheetTrigger>
        <SheetContent  className="shad-sheet h-screen px-3">
            <SheetTitle>
              <div className="header-user">
                <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
                <div className="sm:hidden lg:block">
                  <p className="subtitle-2 capitalize">{fullName}</p>
                  <p className="caption">{email}</p>
                </div>
              </div>
              <Separator className="mb-4 bg-light-200/20" />
            </SheetTitle>
  <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active",
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active",
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          
          <div className="flex flex-col justify-between gap-5 pb-5"></div>
          <FileUploader/>
           <Button
              type="submit"
              className="mobile-sign-out-button  bg-red-100 hover:bg-red-200"
              onClick={async () => await userLogout()  }>
              <Image
                src="public/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p className='text-red-400'>Logout</p>
            </Button>

        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MobileNavigation