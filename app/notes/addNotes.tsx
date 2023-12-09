"use client"

import {SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation";

export default function AddNotes(){
    // id, title, tags, body
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");
    const [modal, setModal] = useState(false);
    const router = useRouter();
    async function handleSubmit(e: SyntheticEvent){
        e.preventDefault();
        const response = await fetch('/api/tambahData',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title:title,
                tags:tags,
                body: body
            })
        })
        const resp = await response;
        if(resp.ok){
            setTitle("");
            setTags("");
            setBody("");
            router.refresh();
            setModal(false);
        }
    }

    function handleChange(){
        setModal(!modal);
    }


    return (
        <div>
            <button className="btn" onClick={handleChange}>Add New</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        {/* title */}
                        <div className="form-control">
                            <label className="label font-bold">Title</label>
                            <input type="text" className="input w-full input-bordered" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
                        </div>
                        {/* tags */}
                        <div className="form-control">
                            <label className="label font-bold">Tags</label>
                            <input type="text" className="input w-full input-bordered" value={tags} onChange={(e)=>setTags(e.target.value)} placeholder="Tags"/>
                        </div>
                        {/* body */}
                        <div className="form-control">
                            <label className="label font-bold">Body</label>
                            <input type="text" className="input w-full input-bordered" value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Body"/>
                        </div>
                        {/* button */}
                        <div className="modal-action">
                            <button type="button" onClick={handleChange} className="btn">Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}