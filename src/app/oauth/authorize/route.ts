export function GET() {
  return Response.json(
    { error: "oauth_not_enabled", message: "OAuth authorization is documented but not enabled on this public portfolio." },
    { status: 501 },
  );
}
