import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const { prompt, userID, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = await Prompt.create({
            creator: userID,
            prompt,
            tag, 
        })
        
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status:201});

    }catch (err) {
        return new Response(JSON.stringify(err), {status:500});
    }
    
}
