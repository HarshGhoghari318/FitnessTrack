"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function(){

    const pathname=usePathname()
    const isActive = (href:string)=> pathname===href 
    return(
         <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <Link href="/" className="text-2xl font-bold text-purple-700">
              FitnessFREAK
            </Link>
            <nav className="space-x-6">
              <Link href="/guide" className={isActive('/guide') ? "text-xl  text-purple-700" : "text-xl text-zinc-700"}>
                Guide
              </Link>
              <Link href="/nutritions" className={isActive('/nutritions') ? "text-xl  text-purple-700" :  "text-xl  text-zinc-700"}>
                Nutrition
              </Link>
              <Link href="/workouts" className={isActive('/workouts') ? "text-xl  text-purple-700" :  "text-xl  text-zinc-700"}>
                Workouts
              </Link>
              <Link href="/profile" className={isActive('/profile') ? "text-xl  text-purple-700" :  "text-xl  text-zinc-700"}>
                Profile
              </Link>   
            </nav>

          </header>
        
    )
}