import { useState, useEffect } from "react"
import TombolMeja from "../components/TombolMeja"
import supabase from "../utils/supabase"
import { useNavigate } from "react-router-dom"

export default function PilihMeja () {
    const [meja, setMeja] = useState([])
    const [loading, setLoading] = useState(1)
    const [atasNama, setAtasnama] = useState("")
    const [mejaPelanggan, setMejaPelanggan] = useState("")
    const [User, setUser] = useState(null)
    const [pelanggan, setPelanggan] = useState([])
    const navigate = useNavigate()

    async function getMeja () {
        const { data, error } = await supabase.from("Meja").select("*").order("meja", {ascending: true})
        if (error) {console.error(error);} 
        else {
            setMeja(data);
        }
    };
    
    async function getPelanggan(){
        const { data, error } = await supabase.from("Pelanggan").select("*").order("meja", {ascending: true})
        if (error) {console.error(error);} 
        else {
            setPelanggan(data);
        }
    }

    async function getUser(id) {
        const {data, error} = await supabase.from("Pelanggan").select("*").eq("id", id).single()
        if(error) {setUser(0); return}
        setUser(data);
    }
    
    async function daftar(){
        if(!atasNama) {alert("isi nama anda terlebih dahulu"); return}
        else if (!mejaPelanggan) {alert("pilih meja terlebih dahulu"); return}
        const id = Date.now()
        const userData = {
            nama: atasNama,
            meja: mejaPelanggan,
            status: 1
        }
        localStorage.setItem("id", id)
        localStorage.setItem("nama", userData.nama)
        localStorage.setItem("meja", userData.mejaPelanggan)

        const {error: e1} = await supabase.from("Meja").update({available: false, pelanggan: userData.nama}).eq("meja", mejaPelanggan)
        const {error: e2} = await supabase.from("Pelanggan").insert({id, ...userData})
        if(e1 || e2) {alert("maaf, terjadi kesalahan"); return}
        navigate("/menu")
    }

    useEffect(() => {
        async function start(){
            const userDataLocal = localStorage.getItem("id")
            if(userDataLocal) {
                await getUser(userDataLocal)
                if(User) {navigate("/menu"); return}
            }
            getMeja()
            getPelanggan()
            setLoading(false)
        }
        start()
        console.log(pelanggan)
    }, [])

    if(loading) return (
        <div className="fixed z-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            loading
        </div>
    )

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex-col flex items-center p-15 gap-5 bg-gray-100">
            <div className="flex flex-col gap-10 w-fit bg-white p-5 rounded-5 shadow-md">
                <div className="flex flex-col gap-2 w-70">
                    <label htmlFor="nama" className="zalando text-gray-700">Atas nama</label>
                    <input onChange={(e) => setAtasnama(e.target.value)} className="border-2 border-amber-500 px-3 py-2 rounded-md outline-none" type="text" name="nama" id="nama" placeholder="Masukkan nama anda"/>
                </div>
                <div>
                    <p className="mb-2 zalando text-gray-700">Pilih Nomor Meja</p>
                    <div className="flex flex-wrap gap-2 w-70">
                        {meja.map(m => (
                            <TombolMeja key={m.meja} avail={m.available} index={m.meja}  tableSelect={mejaPelanggan} setTableSelect={setMejaPelanggan}/>
                        ))}
                    </div>
                </div>

                <button onClick={daftar} className="bg-amber-500 text-white w-70 py-2 rounded">Daftar</button>
            </div>

            <div className=" zalando bg-white shadow-md w-80 p-5">
                {pelanggan.map(p => (
                    <div className="p-2 shadow-sm/20 rounded mb-3">
                        <div className="flex gap-2 items-center">
                            <div className={`w-2 rounded-full h-2 ${p.status == 1 ? "bg-green-500":"bg-amber-400"}`}></div>
                            <p className="text-xs">Meja {p.meja}</p>
                        </div>
                        <p className="">{p.nama}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}