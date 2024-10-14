import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function middleware(req) {
  const cookieStore = req.cookies;
  const sessionToken = cookieStore.get("session_token");

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true }, // 유저 정보도 포함
  });

  if (!session || session.expires < new Date()) {
    // 세션이 없거나 만료된 경우
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 세션이 유효한 경우
  req.user = session.user; // 요청에 사용자 정보 추가
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // 인증이 필요한 경로
};
