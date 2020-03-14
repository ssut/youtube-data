import { YouTubeClient } from './../youtube';
import * as qs from 'qs';
import { vmContext } from '../vm';
import * as vm from 'vm';

export default async function getSuggestionsByKeyword(this: YouTubeClient, keyword: string) {
  await this.ensureSession();

  const query = qs.stringify({
    client: 'youtube-reduced',
    hl: 'ko',
    gs_ri: 'youtube-reduced',
    tok: this.tokens.psuggestion,
    ds: 'yt',
    cp: 1,
    gs_id: 6,
    q: keyword,
    callback: 'google.sbox.p50',
    gs_gbg: this.generateGSGBG(),
  });
  const resp = await this.client.get('https://clients1.google.com/complete/search?' + query, {
    headers: {
      referer: 'https://m.youtube.com/?app=m&persist_app=1',
    },
  });
  const data = resp.data;
  const result = vm.runInContext(`(() => { return ${data}; })()`, vmContext);
  const [
    requestedKeyword,
    suggestions,
    meta,
  ] = result as [string, [
    string,
    number,
    [number],
  ][], { a: string; j: string; k: number; q: string }];

  return suggestions.map((suggestion) => ({
    suggestion: suggestion?.[0] ?? '',
    score: suggestion?.[2]?.[0] ?? 0,
  })).filter(({ suggestion }) => suggestion !== '');
}
