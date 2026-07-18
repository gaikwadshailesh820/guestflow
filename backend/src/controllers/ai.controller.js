const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_API_KEY);

exports.recommendRoom = async (req, res) => {

  try {
    const {
      guestName,
      numGuests,
      minBudget,
      maxBudget,
      ac,
      roomType,
      availableRooms,
    } = req.body;

    const prompt = `
You are an AI Hotel Room Recommendation Assistant.

Recommend ONLY ONE best room from the available rooms.

Guest Details:

Name: ${guestName}
Number of Guests: ${numGuests}
Budget: ₹${minBudget} - ₹${maxBudget}
AC Preference: ${ac}
Room Type Preference: ${roomType}

Available Rooms:
${JSON.stringify(availableRooms)}

IMPORTANT RULES:

1. Recommend ONLY ONE room.
2. Mention the Room Number clearly.
3. Consider the guest's budget and preferences.
4. Explain your recommendation in less than 100 words.

Example format:

Recommended Room: 101

Reason:
Room 101 perfectly matches the guest's budget, AC preference, and room type.
`;

    const response = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 200,
    });

    return res.status(200).json({
      recommendation: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("HF ERROR :", error);

    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};