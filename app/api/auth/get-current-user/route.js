import { GET as getCurrentUser } from '@/features/user/get-current-user.action'

export async function GET() {
  const response = await getCurrentUser()
  const user = await response.json()

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
  }

  return new Response(JSON.stringify(user), { status: 200 })
}
