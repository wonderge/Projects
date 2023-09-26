import { MiddlewareHandler, RequestValidator, RouteHandler } from "@utils/types";
import { NextResponse } from "next/server";

const withCheck = (handler: RouteHandler, checkInputs: RequestValidator): MiddlewareHandler => async (req) => {
  req.content = await req.json();
  const valid = checkInputs(req);
  if (!valid) {
    return NextResponse.json({ message: "Invalid inputs" }, { status: 400 })
  }

  return handler(req);
}

export default withCheck