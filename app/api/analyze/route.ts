import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { image, language } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
Analyze this skin image.

Respond ONLY in ${language}.

Create a professional wellness report.

Sections:

1. Visible Findings

2. Possible Similarities
- Fungal Infection
- Eczema
- Psoriasis
- Acne
- Dermatitis

3. Confidence Score (0-100)

4. Wellness Score (0-100)

5. Home Care Suggestions

6. Thermal & Peloid Wellness Suggestions

Important Rules:

- Do NOT provide a medical diagnosis.
- State clearly that only a physician can diagnose.
- If fungal infection, eczema, psoriasis or another condition is suspected, advise consultation with a dermatologist.
- Users must always follow their doctor's recommendations.

If appropriate, mention these products as supportive wellness products only:

- Zamavil
- Dr. Peloid
- Dr. Bentonit
- Dr. Mineral

Do not claim treatment or cure.
Keep recommendations neutral and wellness-oriented.
              `,
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 1200,
    });

    return Response.json({
      result: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}