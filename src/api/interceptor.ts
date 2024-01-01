import { useContext } from "react";
import { ApiContext } from "../context/context";

export interface InterceptorProps {
  url: string;
  body: BodyInit;
  method?: string;
}

export default async function Interceptor({
  url,
  body,
  method = "get",
}: InterceptorProps) {
  const req = await fetch(`${url}`, {
    method: "post",
    body: JSON.stringify({ query: body.valueOf() }),
    headers: {
      "Content-type": "application/json",
    },
  });

  return req;
}
