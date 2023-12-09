import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

//update : patch & put
export async function PATCH(req:Request, {params}:{params:{id:string}}){
    const bodi = await req.json()
    const { id } = params
    const {title, tags, body} = bodi
    try{
        const user = await prisma.notes.update({
            where: { id: Number(id) },
            data: { title: title, tags:tags, body:body },
        });
        return NextResponse.json({msg:"Success Updated"},{status:200})
    }catch(error){
        return NextResponse.json(error)
    }
}