import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import toughCookie from 'tough-cookie';
import getTrendingLink from './features/get-trending-link';
import getSuggestionsByKeyword from './features/get-suggestions-by-keyword';
import getTrendingItems from './features/get-trending-items';

axiosCookieJarSupport(axios);

export class YouTubeClient {
  public readonly client: AxiosInstance;
  private jar = new toughCookie.CookieJar();
  private isSessionSet = false;

  public readonly tokens = {
    psuggestion: '',
    id: '',
    xsrf: '',
  };

  public readonly sboxSettings = Object.freeze({
    REQUEST_LANGUAGE: 'en',
    REQUEST_DOMAIN: 'kr',
    SEND_VISITOR_DATA: false,
  });

  public constructor(axiosConfig?: AxiosRequestConfig) {
    this.client = axios.create({
      jar: this.jar,
      withCredentials: true,
      headers: {
        'sec-ch-ua': 'Google Chrome 80',
        'sec-fetch-site': 'none',
        'sec-origin-policy': '0',
        'upgrade-insecure-requests': '0',
        'user-agent': process.env.YOUTUBE_DATA_USER_AGENT || 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
      },
      ...axiosConfig,
    });
  }

  public extractToken(content: string, tokenName: string) {
    const regex = new RegExp(`"${tokenName}":"(?<token>[a-z0-9=]+)"`, 'ig');

    const execResult = regex.exec(content);
    if (!execResult) {
      return null;
    }

    const token = execResult.groups?.['token'] ?? null;
    return token;
  }

  public async ensureSession() {
    if (this.isSessionSet) {
      return;
    }

    const resp = await this.client.get('https://m.youtube.com/?app=m&persist_app=1');
    const body = resp.data;

    this.tokens.psuggestion = this.extractToken(body, 'PSUGGEST_TOKEN') ?? '';
    this.tokens.id = this.extractToken(body, 'ID_TOKEN') ?? '';
    this.tokens.xsrf = this.extractToken(body, 'XSRF_TOKEN') ?? '';
    this.isSessionSet = true;
  }

  // ?
  public generateGSGBG() {
    let a = '';
    for (var f = 4 + Math.floor(32 * Math.random()), g = 0, h; g < f; ++g) {
      h = .3 > Math.random() ? 48 + Math.floor(10 * Math.random()) : (.5 < Math.random() ? 65 : 97) + Math.floor(26 * Math.random());
      a += String.fromCharCode(h);
    }

    return a;
  }
}

const features = Object.freeze({
  getSuggestionsByKeyword,
  getTrendingItems,
  getTrendingLink,
});

export type IYouTube = YouTubeClient & typeof features;

const YouTube: new (...params: ConstructorParameters<typeof YouTubeClient>) => IYouTube = function (...params: ConstructorParameters<typeof YouTubeClient>) {
  const client = new YouTubeClient(...params);

  const proxy = new Proxy(client, {
    get(target: YouTubeClient, propertyKey: string) {
      if (propertyKey in target) {
        return Reflect.get(target, propertyKey);
      }

      if (propertyKey in features) {
        return (...args: any[]) => Reflect.apply(Reflect.get(features, propertyKey), proxy, args);
      }
    },
  });

  return proxy;
} as any;

export default YouTube;
