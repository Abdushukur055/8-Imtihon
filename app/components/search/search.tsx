'use client'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import React, { ChangeEvent } from 'react'
import { MdSearch } from 'react-icons/md'
export default function Search() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const params = new URLSearchParams(searchParams ? searchParams : '')
        const getparams = new URLSearchParams(searchParams ? searchParams : '')
        getparams.get('page')
        console.log(getparams)
        params.set('query', e.target.value)
        replace(`${pathname}?${params}`)
        }
        return (
            <div className='flex items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-md w-max'>
                <MdSearch color='white'/>
                <input className=' bg-transparent outline-none text-white text-[17px]' onChange={handleChange} type="search" placeholder='serach'/>
            </div>
        )
}