import React from 'react'
import SearchBar from './SearchBar'
import FileUploader from './FileUploader'
import { Button } from './ui/button'
import Image from 'next/image'
import { userLogout } from '@/lib/actions/user.actions'

const Header = ({userId,accountId,}: {userId: string; accountId: string}) => {
  return (
    <header className='header'>
        <SearchBar/>
        <div className='header-wrapper'>
            <FileUploader ownerId={userId} accountId={accountId} className=''/>

            <form action={async () => {
              'use server'

              await userLogout()
            }}>
                <Button type="submit" className="sign-out-button bg-red-100 hover:bg-red-200">
            <Image
              src="public/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
               
            </form>
        </div>
    </header>
  )
}

export default Header