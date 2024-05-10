# Twitter Unofficial API

**Mevcut Diller**: [🇹🇷](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Turkish") [🇺🇸](https://www.cy4u.dev/Twitter-Unofficial-API/ "English") 

[**Twitter Unofficial API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Twitter Unofficial API"), web sitelerine ve uygulamalara kolayca entegre edilebilen bir kütüphanedir.

[**Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Twitter API"), kullanıcıların Twitter hesaplarıyla hızlı ve güvenli bir şekilde giriş yapmalarını sağlar. Sadece birkaç basit adımda, kullanıcıların hesaplarına erişim sağlanır.

[**Twitter Login API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Twitter Login API"), kullanıcıya **Twitter**'da oturum açma fırsatı sunar. Eğer ekstra bilgi istenirse, kullanıcı bunları da sağlayabilir.

Örneğin kullanıcıların "**checkpoint**" adı verilen ekstra güvenlik adımlarını geçmelerini isterler. [**Unofficial Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Unofficial Twitter API"), bu tür durumları da dikkate alır ve kullanıcıların giriş işlemlerini sorunsuz bir şekilde tamamlamalarını sağlar.

Son olarak, kullanıcının giriş işlemi başarıyla tamamlandığında, kütüphane oturum açan kullanıcının hesabına ait "**çerez**" verilerini alır. Bu bilgiler kullanıcının işlem yapabilmesi için kullanılabilir.

## Twitter Kütüphanesine Giriş

Çok yönlü bir çalışma zamanı ortamı olan **Node.js**, geliştiricilere ölçeklenebilir ve verimli web uygulamaları oluşturma olanağı sağlar.

Geliştiriciler, **JavaScript**'ten yararlanarak eşzamansız programlamanın gücünden yararlanabilir, bu da onu ağ isteklerini ve API entegrasyonlarını yönetmek için ideal bir seçim haline getirir.

[**Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Twitter API")'miz, geliştiricilerin çeşitli eylemleri sorunsuz bir şekilde gerçekleştirmeleri için basitleştirilmiş bir arayüz sunarak **Twitter** ile etkileşimin inceliklerini özetlemeyi amaçlamaktadır.

### Başlarken

Geliştirme sürecini başlatmak için sisteminizde **Node.js**'nin kurulu olduğundan emin olun. Resmi **Node.js website**sinden indirebilir veya yüklemek için **npm** (**Node Package Manager**) gibi bir paket yöneticisi kullanabilirsiniz.


#### Kurulum

```
$ npm i twitter-unofficial-api
$ bun i twitter-unofficial-api
$ pnpm i twitter-unofficial-api
```

#### Nasıl içe aktarılır

```js
const { Twitter } = require('twitter-unofficial-api');
const { HttpsProxyAgent } = require('https-proxy-agent');
```


#### Twitter ile giriş yapın

```js
async function login() {
    const sleep = (t) => new Promise((s) => setTimeout(s, t));

    const twitterFlow = new Twitter();

    twitterFlow.tProxy = new HttpsProxyAgent('http://proxy_username:proxy_password@proxy_ip:proxy_port');

    await sleep(10000);

    await twitterFlow.login_flow();

    let loginSuccess = false;

    const username = 'your twitter username';
    const password = 'your twitter password';
    const mail = 'your twitter mail';

    while (loginSuccess == false) {
        console.log(await twitterFlow.get_subtask_ids());

        if (await twitterFlow.get_subtask_ids().includes('LoginJsInstrumentationSubtask')) {
            await twitterFlow.LoginJsInstrumentationSubtask();
        }
        else if (await twitterFlow.get_subtask_ids().includes('LoginEnterUserIdentifierSSO')) {
            await twitterFlow.LoginEnterUserIdentifierSSO(username);
        }
        else if (await twitterFlow.get_subtask_ids().includes('LoginEnterUserIdentifier')) {
            await twitterFlow.LoginEnterUserIdentifier(username);
        }
        else if (await twitterFlow.get_subtask_ids().includes('LoginEnterPassword')) {
            await twitterFlow.LoginEnterPassword(password).catch(async (error) => {
                if (error.response?.data?.errors?.[0]?.message == 'Wrong password!') {
                    console.log('Wrong password');
                    loginSuccess = true;
                }
            })
        }
        else if (await twitterFlow.get_subtask_ids().includes('AccountDuplicationCheck')) {
            await twitterFlow.AccountDuplicationCheck().then((response) => {
                if (response?.content?.subtasks[0].enter_text?.hint_text == 'Verification Code') {
                    console.log('Verification code required!');
                }
            })
        }
        else if (await twitterFlow.get_subtask_ids().includes('LoginEnterAlternateIdentifierSubtask')) {
            {
                await twitterFlow.LoginEnterAlternateIdentifierSubtask(mail).catch(err => {
                    console.log('Alternate login email is incorrect: ' + username, ':', password);
                    console.log('-------------------------------------');
                    loginSuccess = true;
                })

            }
        }

        else if (await twitterFlow.get_subtask_ids().includes('LoginAcid')) {

            await twitterFlow.LoginAcid('YOUR CHECKPOINT CODE HERE').catch(err => {
                console.log('ACCOUNT CHECKPOINT MAIL CONFIRMATION: ' + err.response.data.errors[0].message + ' -> ' + username, ':', password);
                console.log('-------------------------------------');
                loginSuccess = true;
            })

        }
        else if (await twitterFlow.get_subtask_ids().includes('SuccessExit')) {
            await twitterFlow.successExit().then((result) => {
                loginSuccess = true;
                console.log('------------------------------');
                console.log('CT0: ' + twitterFlow.ct0);
                console.log('------------------------------');
                console.log('COOKIE:' + twitterFlow.cookie);
                console.log('------------------------------');
            }).catch((err) => {
                loginSuccess = true;
                console.log(err);
            });
        }
    }
} login()
```

#### Anahtar Kelimeler

[**Twitter**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Twitter"), [**Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Twitter API"), [**Twitter Unofficial API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Twitter Unofficial API"), [**Unofficial Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Unofficial Twitter API"), [**Twitter Login API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Twitter Login API"), [**X API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "X API"), [**X Unofficial API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "X Unofficial API"), [**Unofficial X API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Unofficial X API"), [**X Login API**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "X Login API"), [**twitter api in typescript**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api in typescript"), [**twitter api in javascript**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api in javascript"), [**twitter api in nodejs**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api in nodejs"), [**twitter api for students**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api for students"), [**twitter api client-not-enrolled**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api client-not-enrolled"), [**twitter api data collection**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api data collection"), [**twitter api authentication**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api authentication"), [**twitter api javascript sdk**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api javascript sdk"), [**twitter api typescript sdk**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api typescript sdk"), [**twitter api nodejs sdk**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api nodejs sdk"), [**twitter api enterprise pricing**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api enterprise pricing"), [**twitter api bearer token**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api bearer token"), [**twitter api get replies**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api get replies"), [**twitter api for academic research**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api for academic research"), [**twitter api cost**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api cost"), [**twitter api help**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api help"), [**twitter api client forbidden**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api client forbidden"), [**twitter api impressions**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api impressions"), [**twitter api get tweets**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api get tweets"), [**twitter api delete tweet**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api delete tweet"), [**twitter api analytics**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api analytics"), [**twitter api javascript authentication**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api javascript authentication"), [**twitter api typescript authentication**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api typescript authentication"), [**twitter api nodejs authentication**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api nodejs authentication"), [**twitter api expensive**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api expensive"), [**twitter api block user**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api block user"), [**twitter api historical data**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api historical data"), [**twitter api fees**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api fees"), [**twitter api consumer key**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api consumer key"), [**twitter api issues**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api issues"), [**twitter api dashboard**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api dashboard"), [**twitter api alternative**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api alternative"), [**twitter api json**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api json"), [**twitter api error codes**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api error codes"), [**twitter api basic**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api basic"), [**twitter api key price**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api key price"), [**twitter api get tweets by hashtag**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api get tweets by hashtag"), [**twitter api free limits**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api free limits"), [**twitter api bad authentication data**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api bad authentication data"), [**twitter api hashtag count**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api hashtag count"), [**twitter api in r**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api in r"), [**twitter api github**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api github"), [**twitter api callback url**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api callback url"), [**twitter api documentation javascript**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api documentation javascript"), [**twitter api documentation typescript**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api documentation typescript"), [**twitter api documentation nodejs**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api documentation nodejs"), [**twitter api access levels**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api access levels"), [**twitter api javascript example**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api javascript example"), [**twitter api typescript example**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api typescript example"), [**twitter api nodejs example**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api nodejs example"), [**twitter api education**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api education"), [**twitter api bot**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api bot"), [**twitter api hashtag**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api hashtag"), [**twitter api followers**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api followers"), [**twitter api client**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api client"), [**twitter api integration**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api integration"), [**twitter api developer account**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api developer account"), [**twitter api access**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api access"), [**twitter api endpoints**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api endpoints"), [**twitter api oauth**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api oauth"), [**twitter api key and secret**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api key and secret"), [**twitter api get following list**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api get following list"), [**twitter api free**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api free"), [**twitter api block**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api block"), [**twitter api html**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api html"), [**twitter api image**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api image"), [**twitter api fetch tweets**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api fetch tweets"), [**twitter api create tweet**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api create tweet"), [**twitter api down**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api down"), [**twitter api access cost**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api access cost"), [**twitter api json example**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api json example"), [**twitter api enterprise**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api enterprise"), [**twitter api basic plan**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api basic plan"), [**twitter api get user id from username**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api get user id from username"), [**twitter api for developers**](https://www.cy4u.dev/Twitter-Unofficial-API/tr ""), [**twitter api credentials**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api credentials"), [**twitter api http**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api http"), [**twitter api developer**](https://www.cy4u.dev/Twitter-Unofficial-API/tr ""), [**twitter api javascript**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api javascript"), [**twitter api example**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api example"), [**twitter api access token**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api access token"), [**twitter api key**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api key"), [**twitter api get user info**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api get user info"), [**twitter api engagement**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api engagement"), [**twitter api bearer token not working**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api bearer token not working"), [**twitter api health**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api health"), [**twitter api id**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api id"), [**twitter api for posting tweets**](https://www.cy4u.dev/Twitter-Unofficial-API/tr ""), [**twitter api cost per month**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api cost per month"), [**twitter api dataset**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api dataset"), [**twitter api academic**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api academic"), [**twitter api java examples**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api java examples"), [**twitter api explorer**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api explorer"), [**twitter api bookmarks**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api bookmarks"), [**twitter api golang**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api golang"), [**twitter api for sentiment analysis**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api for sentiment analysis"), [**twitter api changes**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api changes"), [**twitter api hootsuite**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api hootsuite"), [**twitter api get followers**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api get followers"), [**twitter api documentation**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api documentation"), [**twitter api interface**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api interface"), [**twitter api dev**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api dev"), [**twitter api alternative reddit**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api alternative reddit"), [**twitter api get tweets by user**](https://www.cy4u.dev/Twitter-Unofficial-API/tr ""), [**twitter api elevated access**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api elevated access"), [**twitter api basic access**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api basic access"), [**twitter api headers**](https://www.cy4u.dev/Twitter-Unofficial-API/tr "twitter api headers"), [**NodeJS Developer**](https://www.cy4u.dev "NodeJS Developer"), [**Back-end Developer**](https://www.cy4u.dev "Back-end Developer"), [**Node.JS Developer**](https://www.cy4u.dev "Node.JS Developer"), [**Backend Developer**](https://www.cy4u.dev "Backend Developer")

#### Sponsorluk & Bağış

[Github](https://github.com/sponsors/cy4udev "cy4udev github") | [Patreon](https://patreon.com/cy4udev "cy4udev patreon") | [BuyMeaCoffee](https://www.buymeacoffee.com/cy4udev "cy4udev BuyMeaCoffee")

#### Telif Hakkı ve Diğer Konular

Telif Hakkı: [copyright@cy4u.dev](mailto:copyright@cy4u.dev "copyright@cy4u.dev") | Diğer Konular: [hello@cy4u.dev](mailto:hello@cy4u.dev "hello@cy4u.dev")

#### Sosyal Medya

[Linkedin](https://www.linkedin.com/company/cy4udev/ "cy4udev linkedin") | [Twitter](https://twitter.com/cy4udev "cy4udev twitter") | [Bluesky](https://bsky.app/profile/cy4u.dev "cy4udev bluesky") | [Instagram](https://instagram.com/cy4udev "cy4udev instagram") | [Youtube](https://www.youtube.com/@cy4udev "cy4udev youtube") | [Telegram](https://t.me/cy4udev "cy4udev telegram") | [Github](https://github.com/cy4udev "cy4udev github") | [Npmjs](https://www.npmjs.com/~cy4udev "cy4udev npmjs")

#### Lisans

[**Can Yesilyurt**](https://canyesilyurt.com "Can Yesilyurt") | [**cy4udev**](https://www.cy4u.dev "cy4udev")
