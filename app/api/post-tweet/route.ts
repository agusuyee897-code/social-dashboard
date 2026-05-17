 import { NextRequest, NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { content, userId } = await req.json()

    const { data: account, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('platform', 'x')
      .eq('status', 'active')
      .single()

    if (error || !account) {
      return NextResponse.json({ error: 'Akun Twitter tidak ditemukan' }, { status: 404 })
    }

    const client = new TwitterApi({
      appKey:       account.api_field1_value,
      appSecret:    account.api_field2_value,
      accessToken:  account.api_field3_value,
      accessSecret: account.api_field4_value,
    })

    const tweet = await client.v2.tweet(content)

    return NextResponse.json({ success: true, tweetId: tweet.data.id })
  } catch (err: any) {
    console.error('Twitter error:', err)
    return NextResponse.json({ error: err.message || 'Gagal posting' }, { status: 500 })
  }
}
