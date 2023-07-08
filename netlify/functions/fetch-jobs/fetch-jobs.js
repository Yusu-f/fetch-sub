import { YoutubeTranscript } from "youtube-transcript";

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {

    return {
      statusCode: 200,
      body: JSON.stringify({ transcript: "fetchjobs"}),
      Headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
