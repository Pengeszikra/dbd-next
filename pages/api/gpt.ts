import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
req: NextApiRequest,
  res: NextApiResponse
) {

  if (!req.query?.seek) return res.status(404).json({msg:"Seek something?"});

  const key = process.env.GPT_3_KEY || '- - -';

  const headers = new Headers({
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
  });

  fetch(
    "https://api.openai.com/v1/completions",
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": req.query.seek,
        "max_tokens": 4000,
        "temperature": 1.0
      })
    }
  )
  .then(r => r.json())
  .then(msg => res.status(200).json(msg?.choices?.[0]?.text || '- - no answer - -'))
  // .then(msg => res.status(200).json(msg))
  .catch(error => res.status(404).json(error))

  // return res.status(200).json({msg: req.query.seek});
}

/*

curl https://api.openai.com/v1/completions \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer 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" \
  -d '{
  "model": "text-davinci-003",
  "prompt": "Ki írta? Alakul a molekula",
  "max_tokens": 4000,
  "temperature": 1.0
}'

*/