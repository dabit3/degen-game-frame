import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { base } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: base,
  transport:  http()
})

export const publicClient = createPublicClient({
  chain: base,
  transport: http()
})

export const account = privateKeyToAccount(`0x${process.env.WK}`)