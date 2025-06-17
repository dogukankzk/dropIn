import React from 'react'
import SearchBar from './SearchBar'
import FileUploader from './FileUploader'
import { Button } from './ui/button'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='header'>
        <SearchBar/>
        <div className='header-wrapper'>
            <FileUploader/>

            <form>
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