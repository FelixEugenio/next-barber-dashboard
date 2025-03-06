import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // Usando cookies do lado do servidor

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;


  if (pathname.startsWith("/_next") || pathname === "/") {
    return NextResponse.next();
  }

  // Obter o token do cookie
  const token = cookies().get('token'); // Acessando o cookie do lado do servidor

  // Se o token não estiver presente e o usuário estiver tentando acessar /Home, redireciona para a página de login
  if (pathname.startsWith("/Home") && !token) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirecionar para a página inicial
  }

  return NextResponse.next(); // Caso o token exista ou a página não precise de autenticação
}
