import { YoutubeTranscript } from "youtube-transcript";

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    let transcript = ""
    const transcriptArray = await YoutubeTranscript.fetchTranscript(event.queryStringParameters.v);

    transcriptArray.forEach(i => {
      transcript += i.text + " "
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ transcript: transcript}),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };

