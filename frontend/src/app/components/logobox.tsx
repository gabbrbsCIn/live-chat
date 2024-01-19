"use client"

export default function LogoBox() {

    return (
        <div className='flex flex-col items-center justify-center h-screen w-1/2 bg-gradient-to-b from-emerald-700 to-emerald-500'>
            <img className='size-28' src="./chat.svg" alt="Logo" />
            <p className='text-3xl text-white' >pCHATg</p>
        </div>
    )
}

