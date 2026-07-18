require("dotenv").config();
const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_API_KEY);

async function test() {
    try {
        const res = await client.textGeneration({
            model: "Qwen/Qwen3-0.6B",
            inputs: "Say Hello",
            max_new_tokens: 50,
        });

        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

test();