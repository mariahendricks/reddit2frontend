'use client'

import { logOut } from "@/actions/log-out";

export const LogOutButton = () => {
    return (
        <button onClick={() => logOut()} className='button-tertiary'>
            Log out
        </button>
    )
}