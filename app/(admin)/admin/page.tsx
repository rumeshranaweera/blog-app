import { getCurrentUser } from "@/actions/user";

export default async function Page() {
  const user = await getCurrentUser();
  return (
    <div>
      <h1>Admin</h1>
      <pre>{JSON.stringify(user.id)}</pre>
      <p>Protected by middleware.ts</p>
    </div>
  );
}
