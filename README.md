# YouTube Data

This is a client project for parsing simple YouTube data from web page, m.youtube.com, which are not able to get via the official YouTube Data API.

## How

This client is implemented trying to act like a real browser.

## APIs

### `getSuggestionsByKeyword(keyword: string)`

```js
> await youtube.getSuggestionsByKeyword('i am')
> [
  { suggestion: 'i am', score: 0 },
  { suggestion: 'i am moana', score: 0 },
  { suggestion: 'i am iron man', score: 0 },
  { suggestion: 'i am better off', score: 0 },
  { suggestion: 'i am not the only one', score: 0 },
  { suggestion: 'i am yours', score: 0 },
  { suggestion: 'i am sarah', score: 0 },
  { suggestion: 'i am your father', score: 0 },
  { suggestion: 'i am a poor wayfaring stranger', score: 131 },
  { suggestion: 'i am the one', score: 0 }
]
```

### `getTrendingItems(findCondition?: RegExp)`

The argument findCondition is a regex pattern that can be one of:

- music
- gaming
- movies

As you can find these keywords in [YouTube's trending page](https://www.youtube.com/feed/trending).

```js
> await youtube.getTrendingItems(/음악|music/)
> [
  {
    durationSeconds: 219,
    videoId: 'fE2h3lGlOsk',
    publisher: 'jypentertainment',
    title: 'ITZY(있지) "WANNABE" M/V'
  },
  {
    durationSeconds: 218,
    videoId: '0lapF4DQPKQ',
    publisher: 'Big Hit Labels',
    title: "BTS (방탄소년단) 'Black Swan' Official MV"
  },
  {
    durationSeconds: 355,
    videoId: 'mPVDGOVjRQ0',
    publisher: 'Big Hit Labels',
    title: "BTS (방탄소년단) 'ON' Official MV"
  },
  {
    durationSeconds: 299,
    videoId: 'gwMa6gpoE9I',
    publisher: 'Big Hit Labels',
    title: "BTS (방탄소년단) 'ON' Kinetic Manifesto Film : Come Prima"
  },
  {
    durationSeconds: 239,
    videoId: '2OvyA2__Eas',
    publisher: 'SMTOWN',
    title: "NCT 127 엔시티 127 '영웅 (英雄; Kick It)' MV"
  },
  {
    durationSeconds: 267,
    videoId: 'r_0JjYUe5jo',
    publisher: 'Lyrical Lemonade',
    title: 'Eminem - Godzilla ft. Juice WRLD (Dir. by @_ColeBennett_)'
  },
  {
    durationSeconds: 292,
    videoId: 'LpLPoRs3mlk',
    publisher: 'BANGTANTV',
    title: '[CHOREOGRAPHY] BTS (방탄소년단) ‘ON’ Dance Practice (Fix ver.)'
  },
  {
    durationSeconds: 292,
    videoId: 'VkuEzN8IS_o',
    publisher: 'BANGTANTV',
    title: '[CHOREOGRAPHY] BTS (방탄소년단) ‘ON’ Dance Practice'
  },
  {
    durationSeconds: 274,
    videoId: 'r0SPHx4EHFY',
    publisher: 'Official MAKTUB',
    title: '[8K]마크툽,이라온,반광옥,정영은,전상근-마음이 말하는 행복 Happy Ending'
  },
  {
    durationSeconds: 211,
    videoId: 'fPlcZsCOugA',
    publisher: 'VICTON 빅톤',
    title: 'VICTON 빅톤 Howling (하울링) MV'
  },
  {
    durationSeconds: 181,
    videoId: 'bmZvCXAhOLE',
    publisher: 'Lauv - Topic',
    title: 'Who'
  },
  {
    durationSeconds: 476,
    videoId: '3-5PYmgi3sA',
    publisher: 'official IZ*ONE',
    title: "IZ*ONE 에너지 캠 플러스(ENOZI Cam +) '언젠가 우리의 밤도 지나가겠죠' 레코딩 비하인드"
  },
  {
    durationSeconds: 316,
    videoId: '6rDo1MKPal8',
    publisher: '1theK (원더케이)',
    title: '[MV] CODE KUNST(코드 쿤스트) _ JOKE! (Feat. C JAMM, Simon Dominic(사이먼 도미닉))'
  },
  {
    durationSeconds: 183,
    videoId: 'GsEo4_9mIMg',
    publisher: 'official IZ*ONE',
    title: "IZ*ONE (아이즈원) - 'SPACESHIP' Choreography (Close up ver.)"
  },
  {
    durationSeconds: 211,
    videoId: '18FTS5NKCSE',
    publisher: 'SEVENTEEN',
    title: '[COVER] WOOZI - Bye bye my blue (원곡 : 백예린)'
  },
  {
    durationSeconds: 231,
    videoId: 'mXekvk0JEzk',
    publisher: 'OVAN - Topic',
    title: 'I Need You (어떻게 지내)'
  }
]
```

## Contributing

TBW