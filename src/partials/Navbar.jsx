import {User, ShoppingCart}  from "lucide-react"

export default function Navbar({nama, meja, Cart, CartOpen, toggleCart}){
    return (
        <nav className="text-black h-15 flex items-center justify-between fixed top-0 left-0 right-0 bg-white px-3">
            <div className="flex gap-3 items-center">
                <div className="p-1 rounded-full border border-amber-400 text-amber-400"><User /></div>
                <div>
                    <p className="funnel">{nama}</p>
                    <p className="funnel text-xs -mt-1">Meja {meja}</p>
                </div>
            </div>
            <button onClick={() => toggleCart(!CartOpen)} className="text-amber-500 rounded-full relative">
                <span className={`text-[10px] absolute flex items-center bg-white font-bold w-4 h-4 rounded-full justify-center shadow-sm/30 -translate-2 ${Cart.length > 0 ? "" : "hidden"}`}>{Cart.length}</span>
                <ShoppingCart width={20} />
            </button>
        </nav>
    )
}