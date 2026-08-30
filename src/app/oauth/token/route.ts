export async function POST() {
  return Response.json(
    { error: "oauth_not_enabled", message: "This portfolio does not issue OAuth access tokens." },
    { status: 501 },
  );
}
