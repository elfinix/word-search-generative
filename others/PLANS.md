Plans and Tasks

1. Instead of seed data, get random pokemon directly from PokeAPI: https://pokeapi.co/

2. Develop a prompt/modal first before entering the play page. This will allow players to input any free-text grouping/categorization/characteristics they want for that word search round

3. This free-text will then be handled by our LLM. Use this configs for our .env:
   .env

```
- API Key: <YOUR_API_KEY_HERE>
- Model: models/gemma-4-31b-it
- API Version: v1beta
```

Then I have this preconfig prompt if replicable:

```
I need to integrate Google Gemini API for [DESCRIBE YOUR USE CASE].

API Configuration:
- API Key: <key-here>
- Model: models/gemma-4-31b-it
- API Version: v1beta

Requirements:
1. Use the Gemma 4 31B Instruct model directly (models/gemma-4-31b-it)
2. Make API requests to: <https://generativelanguage.googleapis.com/v1beta/models/gemma-4-31b-it:generateContent?key={API_KEY}>
3. Use POST method with JSON body format:
   {
     "contents": [{
       "parts": [{
         "text": "YOUR_PROMPT_HERE"
       }]
     }]
   }
4. Extract response from: data.candidates[0].content.parts[0].text
5. Include error handling for:
   - 429: Rate limit exceeded
   - 403: API key authentication failed
   - 400: Invalid request
   - 404: Model not found
6. Display loading state while waiting for API response
7. Show error messages to user in a user-friendly format

This model (gemma-4-31b-it) is a powerful text-only model optimized for instruction following and text generation tasks.
```

4. Setup Supabase in my project
   Now, integrate the existing app design with a connected Supabase data source.
   Use the Supabase project at the following endpoint:

Project URL: https://iudaicigclucruffjfqk.supabase.co
Anon Key: <YOUR_SUPABASE_ANON_KEY_HERE>

Schema: public

Install the necessary dependencies in case not present

5. Write a md file "VERCEL_GUIDE" for us to publish to Vercel with the FastAPI and Supabase connected
