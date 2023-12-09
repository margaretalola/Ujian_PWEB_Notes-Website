import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function DELETE(req:Request, {params}:{params:{id:string}}){
    const { id } = params

    try{
        const deletedUser = await prisma.notes.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({msg:"Success deleted data"},{status:200})
    }catch(error){
        return NextResponse.json(error)
    }
}