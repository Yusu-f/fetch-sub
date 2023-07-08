import { YoutubeTranscript } from "youtube-transcript";

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    if (event.path == "/fetchjobs") {
      return {
        statusCode: 200,
        body: JSON.stringify({ transcript: "fetchnjobs hit" }),
        Headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    } else {
      let transcript = "";
      const transcriptArray = await YoutubeTranscript.fetchTranscript(
        event.queryStringParameters.v
      );

      transcriptArray.forEach((i) => {
        transcript += i.text + " ";
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ transcript: transcript }),
        Headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
