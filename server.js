const PORT = 8000
import express from 'express'
import cors from 'cors'
const app = express()
import dotenv from 'dotenv';
dotenv.config();
app.use(express.json())
app.use(cors())

const RishikaSecretKey = process.env.API_KEY

app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + RishikaSecretKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            "max_tokens": 100,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const json = await response.json()
        res.json(json)
    }
    catch(error){
        console.log(error)
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

