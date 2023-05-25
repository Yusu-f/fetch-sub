import { YoutubeTranscript } from "youtube-transcript";

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    let transcript = ""
    const transcriptArray = await YoutubeTranscript.fetchTranscript("A-PFgCM4jwM");
    
    transcriptArray.forEach(i => {
      transcript += i.text + " "
    })

    console.log(event.queryStringParameters.v);

    return {
      statusCode: 200,
      body: JSON.stringify({ transcript: transcript, query: event.queryStringParameters.v }),
      Headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
