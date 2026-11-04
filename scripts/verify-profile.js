// 檢查公開頁面實際顯示什麼（用「觀眾視角」驗證品牌資訊）
// 用法：node verify-profile.js https://www.tiktok.com/@handle [https://...]
// 輸出用 base64，避免 Windows 主控台把中文顯示成亂碼
const { connect } = require('./cdp');

const decode = (s) => Buffer.from(s, 'base64').toString('utf8');

(async () => {
  const urls = process.argv.slice(2);
  if (!urls.length) {
    console.error('usage: node verify-profile.js <url> [url...]');
    process.exit(1);
  }
  const { browser, ctx } = await connect();
  const page = ctx.pages()[0] || (await ctx.newPage());

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(7000);
    const info = await page.evaluate(() => {
      const body = document.body.innerText.replace(/\n+/g, ' | ');
      return {
        url: location.href,
        title: document.title,
        notFound: /找不到|not found|page isn.t available/i.test(body),
        text: body.slice(0, 400),
        avatar: document.querySelector('img[src*="avt"], header img')?.src || null,
      };
    });
    console.log('---');
    console.log('B64:' + Buffer.from(JSON.stringify(info), 'utf8').toString('base64'));
  }
  await browser.close();
})().catch((e) => {
  console.error('ERR', e.message);
  process.exit(1);
});
