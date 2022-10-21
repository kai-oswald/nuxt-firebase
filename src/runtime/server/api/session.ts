import { readBody, setCookie, assertMethod, defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig().public

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')
  const cookieOptions = config.firebase.cookies
  const { event: signEvent, token } = await readBody(event)

  if (!event) { throw new Error('Auth event missing!') }

  if (signEvent === 'SIGNED_IN') {
    if (!token) { throw new Error('Auth token missing!') }
    setCookie(event, `${cookieOptions.name}-access-token`, token, {
      domain: cookieOptions.domain,
      maxAge: cookieOptions.lifetime ?? 0,
      path: cookieOptions.path,
      sameSite: cookieOptions.sameSite as boolean | 'lax' | 'strict' | 'none'
    }
    )
  }

  if (signEvent === 'SIGNED_OUT') {
    setCookie(event, `${cookieOptions.name}-access-token`, '', {
      maxAge: -1,
      path: cookieOptions.path
    })
  }

  return 'auth cookie set'
})
