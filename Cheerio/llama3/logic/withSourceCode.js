import OpenAI from "openai";


export async function analysing(html, instructions, instructionsSystem) {


console.log("Der Code wird analisiert....")
  let i = 0;
  while (i < 5) {
    console.log("*")
    i++;
  }



  async function requestOpenAI(html, instructions, instructionsSystem) {
    const openai = new OpenAI({
      apiKey: 'sk-None-C2D5AiI8F2XD32eACscWT3BlbkFJeOODjCEzM7ZjSfYokrRI'
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          "role": "system",

          "content": instructionsSystem + " " + instructions
        },
        {
          "role": "user",
          "content": html
        }
      ],
      temperature: 0.7,
      max_tokens: 8000,
      top_p: 1,
    });

    return response.choices[0].message.content;
  }


  try {
      const response = await requestOpenAI(html, instructions, instructionsSystem);
      console.log("Rsponse wird zurück gegeben....");
      return response;
  } catch (error) {
      console.error('Error calling requestOpenAI:', error);
  }


  return response

}
