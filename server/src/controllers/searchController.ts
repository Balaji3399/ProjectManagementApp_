import { Request , Response } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient() ;

export const Search = async (
    req : Request,
    res : Response 
): Promise<void> => {
    const { query } = req.query ;
    try {
        const tasks = await prisma.task.findMany({
            where : {
                OR : [
                    {title : {contains : query as string}},
                    {description : {contains : query as string}} ,
                ]
            }
        })
        const projects = await prisma.project.findMany({
            where : {
                OR : [
                    {name : {contains : query as string}},
                    {description : {contains : query as string}} ,
                ]
            }
        })
        const users = await prisma.user.findMany({
            where : {
                OR : [
                    {username : {contains : query as string}},
                ]
            }
        })
        res.json({tasks , projects , users}) ;
    }catch (err : any) {
        res.status(500).json({message : `Error searching : ${err.message}`}) ;
    }
}