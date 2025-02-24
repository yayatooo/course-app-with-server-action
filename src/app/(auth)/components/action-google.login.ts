"use server"

import { google } from "@/utils/arctic";
import { generateCodeVerifier, generateState } from "arctic"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export async function loginWithGoogleAction(formData:FormData) {

    const state = generateState();
    const code = generateCodeVerifier();
    const cookiesSet = await cookies();

    cookiesSet.set("code", code)

    const  url = google.createAuthorizationURL(state, code, ["email", "profile"]);

    redirect(url.href)
}