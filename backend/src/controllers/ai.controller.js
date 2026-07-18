const { HfInference } = require("@huggingface/inference");

// Initialize using your Render Environment Variable key
const client = new HfInference(process.env.HF_API_KEY);

exports.recommendRoom = async (req, res) => {
  try {
    const {
      guestName,
      numGuests,
      nights, // Explicitly mapped to match frontend form state payload
      minBudget,
      maxBudget,
      ac,
      roomType,
      availableRooms,
    } = req.body;

    if (!availableRooms || !Array.isArray(availableRooms) || availableRooms.length === 0) {
      return res.status(400).json({
        message: "Validation Error: availableRooms is required and must be a non-empty array."
      });
    }

    // Clean up input contexts with clean fallback properties
    const nameStr = guestName || "Valued Guest";
    const guestCount = numGuests || 1;
    const durationNights = nights || 1;
    const minPrice = minBudget !== undefined ? minBudget : 0;
    const maxPrice = maxBudget !== undefined ? maxBudget : "No Limit";
    const preferredType = roomType || "Any";

    // Standardize text strings to handle "No Preference", "Air Conditioned", or "Non-AC"
    let acInstruction = "No Preference";
    if (ac === "Air Conditioned" || ac === true) acInstruction = "AC Required";
    if (ac === "Non-AC" || ac === false) acInstruction = "Non-AC / Regular ventilation required";

    // Standardize the target availableRooms array structure so the AI reads the correct keys
    const normalizedRooms = availableRooms.map(room => ({
      roomNumber: String(room.id || room.roomNumber || ""),
      type: room.type || "Standard",
      pricePerNight: Number(room.price || room.pricePerNight || 0),
      hasAC: room.ac !== undefined ? room.ac : room.hasAC,
      capacity: Number(room.capacity || 1),
      floor: room.floor || 1
    }));

    const prompt = `
You are an AI Hotel Room Recommendation Assistant.
Recommend ONLY ONE best room from the available rooms list.

Guest Requirements:
Name: ${nameStr}
Number of Guests: ${guestCount}
Stay Duration: ${durationNights} nights
Budget per Night: ₹${minPrice} - ₹${maxPrice}
AC Preference: ${acInstruction}
Room Type Preference: ${preferredType}

Available Rooms Dataset:
${JSON.stringify(normalizedRooms, null, 2)}

CRITICAL SYSTEM RULES:
1. Output the room identity exactly in this format line: "Recommended Room: <Room Number>". Do not deviate from this identifier format.
2. Recommend ONLY ONE room.
3. Consider the guest's budget constraints, room capacities, and explicit preferences.
4. Explain your matching choice concisely in less than 80 words.

Example Format Output:
Recommended Room: 101
Reason: Room 101 matches the guest's capacity criteria and budget line perfectly.
`;

    // Execute completion using the stable production-grade framework router model
    const response = await client.chatCompletion({
      model: "meta-llama/Llama-3.3-70B-Instruct", 
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 250,
      temperature: 0.1 // Kept low to enforce strict adherence to the rules
    });

    return res.status(200).json({
      recommendation: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("HF CONTROLLER ERROR :", error);
    return res.status(500).json({
      message: error.message || "An internal error occurred while generating the AI recommendation.",
      error: error,
    });
  }
};