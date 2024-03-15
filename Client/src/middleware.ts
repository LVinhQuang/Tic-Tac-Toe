import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const id = req.sessionID;
    if (user && req.nextUrl.pathname.startsWith("/login")) {
        console.log(user);
        return NextResponse.redirect("http://localhost:3000/");
    }
}