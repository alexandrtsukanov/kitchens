import { type NextRequest, NextResponse } from "next/server";
import { TPage } from "./model";
import { getToken } from "next-auth/jwt";
import { siteConfig } from "./config";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    const protectedRoutes: TPage[] = ['/ingredients'];
    const outerRoutes = ['/error'];

    if (protectedRoutes.some(route => pathname.toString().startsWith(route))) {
        if (!token) {
            const url = new URL('/error', request.url);
            url.searchParams.set(siteConfig.errorMessageKey, siteConfig.permissionDeniedMsg);
            return NextResponse.redirect(url);
        }
    }

    if (outerRoutes.some(route => pathname.toString().startsWith(route))) {
        if (token) {
            const url = new URL('/', request.url);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/ingredients', '/error'],
}
