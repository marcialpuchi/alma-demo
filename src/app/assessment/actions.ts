"use server"

import { redirect } from "next/navigation"

export async function submitAssesment(data: unknown) {
    console.log('TODO: sumbmit to db', data)

    redirect('/')
}