import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req:Request){
    const bodi = await req.json()
    const {title, tags, body} = bodi

    try{
        const user = await prisma.notes.create({
            data:{
                title:title,
                tags:tags,
                body:body
            }
        })
        return NextResponse.json({msg:"Success created notes"},{status:200})
    }catch(error){
        return NextResponse.json(error)
    }
}