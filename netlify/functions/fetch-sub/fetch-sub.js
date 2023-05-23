import { YoutubeTranscript } from "youtube-transcript";

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    let transcript = "";

    YoutubeTranscript.fetchTranscript("A-PFgCM4jwM").then((transcriptArray) => {
      transcriptArray.forEach((e) => {
        console.log(e.text);
        transcript += e.text.replace(/\n/g, "");
      });
      console.log(YoutubeTranscript);
      return {
        statusCode: 200,
        body: "transcript",
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      };
    });
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
