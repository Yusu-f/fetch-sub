// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    ("use strict");
    var __awaiter =
      (this && this.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    var __importDefault =
      (this && this.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports, "__esModule", { value: true });
    const rss_parser_1 = __importDefault(require("rss-parser"));
    const parser = new rss_parser_1.default();
    const feedUrl =
      "https://www.upwork.com/ab/feed/topics/rss?securityToken=fdde7ca08b9f7687a22ad462a9971afea43aa5967e0060d3cf7faba9789633c5a79875dc4f9270ec265526af2a9122c1404da59f8965b27d0c5684388621cee6&userUid=1452770585860366336&orgUid=1452770585860366337";
    let lastItem;
    const checkForUpdates = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const feed = yield parser.parseURL(feedUrl);
        console.log(feed.title);
        let newItems = [];
        feed.items.reverse().forEach((item) => {
          if (lastItem == null) {
            newItems.push(item);
            lastItem = item;
          }
          if (new Date(item.pubDate) > new Date(lastItem.pubDate)) {
            newItems.push(item);
            lastItem = item;
          }
        });
        // newItems.forEach((newItem) => console.log(newItem.title + ":" + newItem.link));
        return newItems;
      });
    // call the function at 5 second intervals
    // setInterval(checkForUpdates, 5000);

    const newJobs = await checkForUpdates();

    return {
      statusCode: 200,
      body: JSON.stringify({ newjobs: newJobs }),
      Headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
