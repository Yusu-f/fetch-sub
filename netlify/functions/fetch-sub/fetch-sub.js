import { YoutubeTranscript } from "youtube-transcript";

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    let transcript = await YoutubeTranscript.fetchTranscript("A-PFgCM4jwM")

    
      return {
        statusCode: 200,
        body: transcript[0],
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      };
    
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
