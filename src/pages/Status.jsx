import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

export default function PilihMeja () {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(1)

    useEffect(() => {
        async function getUser(id) {
            const {data, error} = await supabase.from("Pelanggan").select("*").eq("id", id).single()
            if(error) {navigate("/")}
            if(data.status == 1) {navigate("/menu")}
            setUser(data);
            setLoading(false)
        }
        const userId = localStorage.getItem("id")
        if(userId){
            getUser(userId)
        } else {
            navigate("/")
        }
    }, [])
    
    let listPesanan = user?.pesanan ? user.pesanan.split(", ") : []
    
    async function orderDone(){
        const {error: err1} = await supabase.from("Meja").update({available: true, pelanggan: null}).eq("pelanggan", user.nama)
        if(err1) {alert("gagal update meja"); return}

        const {error: err2} = await supabase.from("Pelanggan").delete().eq("id", user.id)
        if(err2) {alert("gagal menyelesaikan"); return}
        
        localStorage.clear()
        navigate("/")
    }

    if(loading) return (
        <div className="fixed z-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            loading
        </div>
    )
    return (
        <div className="flex justify-center pt-10 bg-gray-100 absolute top-0 bottom-0 left-0 right-0">

            <div className="bg-white shadow-md h-fit w-90/100 p-5 zalando">
                <h1 className="text-center mb-5">Pesanan Anda</h1>
                <p className="mb-2 text-sm">{user.nama} - Meja {user.meja}</p>
                <div className="text-xs border-y border-y-gray-300 border-dashed py-3 mb-3">
                    {listPesanan.map(p => (
                        <p key={p}>{p}</p>
                    ))}
                </div>
                <button onClick={orderDone} className="text-center bg-amber-500 w-full text-sm p-2 rounded-sm text-white">Pesanan Selesai</button>
            </div>
        </div>
    )
}