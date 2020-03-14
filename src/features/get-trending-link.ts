import { YouTubeClient } from './../youtube';
import * as cheerio from 'cheerio';

export default async function getTrendingLink(this: YouTubeClient, findCondition = /음악|Music/g) {
  await this.ensureSession();

  const cond = new RegExp(`"${findCondition.source}"`, 'g');

  const resp = await this.client.get('https://m.youtube.com/feed/trending');
  const $ = cheerio.load(resp.data);

  const initialData = JSON.parse($('#initial-data').html()!.replace(/^([\<\!\- ]+)(\{)/, '$2').replace(/(\})[\>\!\- ]+$/, '$1'));

  let targetMenuLink: string | null = null;
  try {
    const menus = initialData.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.subMenu.channelListSubMenuRenderer.contents as any[];

    const targetMenu = menus.find(({ channelListSubMenuAvatarRenderer: menu }) => {
      const json = JSON.stringify(menu);
      return cond.test(json);
    });
    targetMenuLink = targetMenu.channelListSubMenuAvatarRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url;
  } catch { }

  return targetMenuLink;
}
