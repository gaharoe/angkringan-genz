export default function ProductCard({data, setCart}) {
    return (
        <div className="zalando max-w-60 min-w-40 flex-1 flex flex-col gap-3">
            <div>
                <div className="w-full h-50 overflow-hidden rounded-md">
                    <img src={data.gambar} alt="" className="object-cover min-w-full min-h-full" />
                </div>
                <p className="text-xs mt-2 text-amber-600">{data.kategori}</p>
                <p className="text-xl font-semibold">{data.nama}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">Rp. {data.harga.toLocaleString()}</p>
                <button onClick={() => setCart(prev => {
                    const exist = prev.find(item => item.id === data.id);
                    if (exist) {
                        return prev.map(item =>
                            item.id === data.id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                        );
                    }
                    return [...prev, { ...data, qty: 1 }];
                })} className="text-xs bg-amber-100 border border-amber-500 text-amber-500 w-full py-2 rounded-sm">+ Tambah pesanan</button>
            </div>
        </div>
    )
}