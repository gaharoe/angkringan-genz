import { useState, useEffect } from "react"
import TombolMeja from "../components/TombolMeja"
import supabase from "../utils/supabase"
import { redirect } from "react-router-dom"

export default function PilihMeja () {
    const [meja, setMeja] = useState([])
    const [loading, setLoading] = useState(1)
    const [atasNama, setAtasnama] = useState("")
    const [mejaPelanggan, setMejaPelanggan] = useState("")

    useEffect(() => {
        const getNotes = async () => {
            const { data, error } = await supabase.from("Meja").select("*").order("meja", {ascending: true})
            if (error) {console.error(error);} 
            else {
                setMeja(data);
                setLoading(false)
            }
        };
        getNotes();
    }, []);


    const userDataLocal = localStorage.getItem("id")
    if(userDataLocal) {redirect("/menu")}
    
    
    async function daftar(){
        if(!atasNama) {alert("isi nama anda terlebih dahulu"); return}
        else if (!mejaPelanggan) {alert("pilih meja terlebih dahulu"); return}
        const id = Date.now()
        const userData = {
            nama: atasNama,
            meja: mejaPelanggan
        }
        localStorage.setItem("id", id)
        localStorage.setItem("nama", userData.nama)
        localStorage.setItem("meja", userData.mejaPelanggan)

        const {error: e1} = await supabase.from("Meja").update({available: false, pelanggan: userData.nama}).eq("meja", mejaPelanggan)
        const {error: e2} = await supabase.from("Pelanggan").insert({id, ...userData})
        if(e1 || e2) {alert("maaf, terjadi kesalahan"); return}
        location.href = "/menu"
    }

    if(loading) return (
        <div className="fixed z-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            loading
        </div>
    )

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col gap-2 w-70">
                <label htmlFor="nama">Atas nama</label>
                <input onChange={(e) => setAtasnama(e.target.value)} className="border-2 border-amber-500 px-3 py-2 rounded-md outline-none" type="text" name="nama" id="nama" placeholder="Masukkan nama anda"/>
            </div>
            <div>
                <p className="mb-2">Pilih Nomor Meja</p>
                <div className="flex flex-wrap gap-2 w-70">
                    {meja.map(m => (
                        <TombolMeja key={m.meja} avail={m.available} index={m.meja}  tableSelect={mejaPelanggan} setTableSelect={setMejaPelanggan}/>
                    ))}
                </div>
            </div>

            <button onClick={daftar} className="bg-amber-500 text-white w-70 py-2 rounded">Daftar</button>
        </div>
    )
}