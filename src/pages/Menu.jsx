import Navbar from "../partials/Navbar"
import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import ProductCard from "../components/ProductCard"
import supabase from "../utils/supabase"
import { useNavigate } from "react-router-dom"

export default function PilihMeja () {
    const [loading, setLoading] = useState(1)
    const [menus, setMenus] = useState([])
    const [Cart, setCart] = useState([])
    const [CartOpen, setCartOpen] = useState(0)
    const [search, setSearch] = useState("")
    const [categorySelected, setCategorySelected] = useState("semua")
    const [user, setUser] = useState()
    const navigate = useNavigate()

    

    
    useEffect(() => {
        async function getUser(id) {
            const {data, error} = await supabase.from("Pelanggan").select("*").eq("id", id).single()
            if(error) {setUser(0); navigate("/")}
            setUser(data);
            setLoading(false)
        }
        const userId = localStorage.getItem("id")
        if(userId){
            getUser(userId)
        } else {
            navigate("/")
        }
        async function getMenu() {
            const {data, error} = await supabase.from("Menu").select("*")
            if(error) alert("gagal memuat menu")
            setMenus(data)
        }
        getMenu()
    }, [])

    const filteredMenu = menus.filter(menu => {
        const matchCategory = categorySelected === "semua" || menu.kategori === categorySelected;
        const matchSearch = menu.nama.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    const categories = ["semua", ...new Set(menus.map(m => m.kategori))];

    async function pesan(data){
        const pesanan = (data.map(d => `${d.nama} (${d.qty})`)).join(", ");
        const {_, error} = await supabase.from("Pelanggan").update({pesanan: pesanan, status: 2}).eq("id", user.id)
        if(error) {alert("gagal memesan"); return}
        navigate("/status")
    }


    if(loading) return (
        <div className="fixed z-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            loading
        </div>
    )
    return (
        <>
            <Navbar nama={user.nama} meja={user.meja} Cart={Cart} toggleCart={setCartOpen} CartOpen={CartOpen} />

            <div className={`${CartOpen? "" : "hidden"} p-3 zalando fixed z-50 bg-white left-0 right-0 bottom-0 top-15 flex flex-col justify-between`}>
                <div className="h-full overflow-y-auto">
                    <table className="w-full overflow-y-auto text-xs">
                        <thead>
                            <tr className="text-gray-500 border-b  border-b-gray-300">
                                <th className="pb-2">Pesanan</th>
                                <th>Harga</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Cart.map(c => (
                                <tr key={c.nama}>
                                    <td className="py-2">
                                        {c.nama} ({c.qty}x)
                                    </td>
                                    <td>{c.harga.toLocaleString()}</td>
                                    <td>{(c.harga*c.qty).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="flex justify-between my-3">
                        <p>Total:</p>
                        <p>{Cart.reduce((prev, curr) => (prev+curr.harga*curr.qty), 0)}</p>
                    </div>
                    <button onClick={() => pesan(Cart)} className="bg-amber-500 text-white p-2 rounded-md w-full">Pesan</button>
                </div>
            </div>

            <div className="w-full h-60 rounded-xl bg-gray-200 mt-20 overflow-hidden mb-3">
                <img src="images/hero.jpg" className="object-cover" />
            </div>
            <div className="w-full sticky top-15 left-0 right-0 bg-white">
                <div className="flex border border-gray-300 rounded-full zalando text-gray-500 bg-gray-50 mb-3">
                    <div className="text-gray-500 w-10 flex justify-center items-center h-10 "><Search width={20}/></div>
                    <input onKeyDown={(e) => {if(e.key == "Enter"){alert(search)}}} onChange={(e) => setSearch(e.target.value)} type="" name="" id="" placeholder="Cari menu..." className="flex-1 text-sm outline-none" />
                </div>
                <div className="w-full overflow-x-auto flex gap-1 pb-2 zalando text-sm">
                    {categories.map(kat => (
                        <button key={kat} onClick={() => setCategorySelected(kat)} className={`flex ${categorySelected == kat? "bg-amber-500 text-white": "text-amber-500"} justify-center items-center shrink-0 h-8 p-3 rounded-full border border-amber-500  text-nowrap`}>{kat}</button>
                    ))}
                </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 w-full mb-10">
                {filteredMenu.map(menu => (
                    <ProductCard key={menu.id} data={menu} setCart={setCart} />
                ))}
            </div>
        </>
    )
}