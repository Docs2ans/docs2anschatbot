export interface InterceptorProps {
  body: BodyInit;
  method?: string;
}

export default async function Interceptor({
  body,
  method = "get",
}: InterceptorProps) {
  const req = await fetch(`${process.env.Base_URL}`, {
    method: "post",
    body: JSON.stringify({ query: body.valueOf() }),
    headers: {
      "Content-type": "application/json",
    },
  });

  return req;
}
