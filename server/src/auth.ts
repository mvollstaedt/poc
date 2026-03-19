import { createClerkClient } from '@clerk/express';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function verifyToken(token: string): Promise<{ userId: string }> {
  const payload = await clerk.verifyToken(token);
  return { userId: payload.sub };
}
