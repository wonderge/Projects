import { NextRequest, NextResponse } from "next/server"

export enum SideType {
  Hemmed = "Hemmed",
  Marrow = "Marrow"
}

export enum EndType {
  Slant = "Slant",
  Straight = "Straight"
}

export type ResType = {
  status: number,
  result: Data
}

export type Data = {
  yards?: number,
  meters?: number,
  amount?: number,
  message?: string,
  required?: number,
  result?: number,
  extras?: any
}


export type MiddlewareHandler = (req: NextRequest & { content: any }) => Promise<NextResponse>
export type RouteHandler = (req: NextRequest & { content: any }) => NextResponse
export type RequestValidator = (req: NextRequest & { content: any }) => boolean