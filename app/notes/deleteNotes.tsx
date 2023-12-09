// buat menampilkan tampilan untuk sisi client
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";


type Notes = {
    id: number;
    title: string;
    tags: string;
    body: string;
    created_at: string;
    updated_at: string;
}

export default function DeleteNotes(notes: Notes){
    const [modal, setModal] = useState(false);
    const router = useRouter();
    async function handleDelete(id: number){
        const resp = await fetch(`api/hapusData/${id}`,{
            method: 'DELETE',
        })
        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }


    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure to delete {notes.title}?</h3>
                    <div className="modal-action">
                        <button type="button" onClick={handleChange} className="btn">Close</button>
                        <button type="button" onClick={()=>handleDelete(notes.id)} className="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}