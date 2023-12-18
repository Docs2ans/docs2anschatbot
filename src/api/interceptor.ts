export default async function Interceptor(body: string) {
  const req = await fetch("http://localhost:8000/", {
    method: "post",
    body: body,
    // headers: {

    // },
  });
}
