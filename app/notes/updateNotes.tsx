"use client"

import {SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation";

type Notes = {
    id: number;
    title: string;
    tags: string;
    body: string;
    created_at: string;
    updated_at: string;
}


export default function UpdateNotes(note: Notes){
    const [title, setTitle] = useState(note.title);
    const [tags, setTags] = useState(note.tags);
    const [body, setBody] = useState(note.body);
    const [modal, setModal] = useState(false);
    const router = useRouter();
    async function handleUpdate(e: SyntheticEvent){
        e.preventDefault();
        await fetch(`api/updateData/${note.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title:title,
                tags:tags,
                body:body
            })
        })
        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }


    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit {note.title}</h3>
                    <form onSubmit={handleUpdate}>
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
                        <div className="modal-action">
                            <button type="button" onClick={handleChange} className="btn">Close</button>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}