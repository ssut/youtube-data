import { IYouTube } from './../youtube';
import * as cheerio from 'cheerio';

export default async function getTrendingItems(this: IYouTube, findCondition?: Parameters<typeof this.getTrendingLink>[0]) {
  const targetTrendingLink = await this.getTrendingLink(findCondition);
  if (!targetTrendingLink) {
    return [];
  }

  const resp = await this.client.get('https://m.youtube.com' + targetTrendingLink);
  const $ = cheerio.load(resp.data);

  const initialData = JSON.parse($('#initial-data').html()!.replace(/^([\<\!\- ]+)(\{)/, '$2').replace(/(\})[\>\!\- ]+$/, '$1'));

  let trendings = [] as {
    durationSeconds: number;
    videoId: string;
    publisher: string;
    title: string;
  }[];
  try {
    const itemSections = initialData.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents as any[];

    trendings = itemSections.map(({ itemSectionRenderer: { contents: [{ videoWithContextRenderer: item }] } }) => {
      const { text: lengthText } = item.lengthText.runs[0];
      const { videoId } = item.navigationEndpoint.watchEndpoint;
      const { text: publisher } = item.shortBylineText.runs[0];
      const { text: title } = item.headline.runs[0];

      const lengthParts = lengthText.split(':');

      let durationSeconds: number = 0;
      // hh:mm:ss
      if (lengthParts.length === 3) {
        durationSeconds = Number(lengthParts[0]) * 3600 + Number(lengthParts[1]) * 60 + Number(lengthParts[2]);
      } else if (lengthParts.length === 2) {
        durationSeconds = Number(lengthParts[0]) * 60 + Number(lengthParts[1]);
      } else if (lengthParts.length === 1) {
        durationSeconds = Number(lengthParts[0]);
      }

      return {
        durationSeconds,
        videoId: videoId as string,
        publisher: publisher as string,
        title: title as string,
      };
    });

  } catch (e) {
  }

  return trendings;
}
