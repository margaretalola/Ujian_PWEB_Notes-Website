import AddNotes from "./notes/addNotes";
import DeleteNotes from "./notes/deleteNotes";
import UpdateNotes from "./notes/updateNotes";
import { PrismaClient } from "@prisma/client";

type Notes = {
    id: number;
    title: string;
    tags: string;
    body: string;
    created_at: string;
    updated_at: string;
}

async function getNotes(){

    const prisma = new PrismaClient();
    const allNotes = await prisma.notes.findMany();
    return allNotes
}

export default async function NotesList(){
    const notes: Notes[] = await getNotes();
    return(
        <div className="container mx-auto">
            <h1 className="text-center py-10 text-[20px] font-bold text-[#000]">Notes</h1>
            <div className="my-10 mx-10">
                <div className="py-2">
                    <AddNotes/>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Tags</th>
                            <th>Body</th>
                            <th>Created Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                {notes.map((note,index)=>(
                    <tr key={note.id}>
                        <td>{index + 1}</td>
                        <td>{note.title}</td>
                        <td>{note.tags}</td>
                        <td>{note.body}</td>
                        <td>{String(note.created_at)}</td>
                        <td className="flex gap-4">
                            <UpdateNotes {...note}/>
                            <DeleteNotes {...note}/>
                        </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}