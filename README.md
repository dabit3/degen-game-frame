# Degen Follower Giveaway Frame

See `.env.local.example` for environment variables.

### How it works

1. User guesses a number
2. Check to see if they are following you
3. If they are not, respond with an image / message saying they need to follow you first
4. If they are following you, check to see if the number is correct
5. If number is not correct, return "wrong number" image
6. If number is correct, update KV store to set that the game is over, and respond to the winner with a message letting them know
7. Once the game is over, respond with a message letting them know the game is over.

Uses:

- Vercel KV for persistence
- Airstack for follow and id information
- Next.js for API routes