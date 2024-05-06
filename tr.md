# Twitter Unofficial API

**Mevcut Diller**: [🇹🇷](https://cy4u.dev/Twitter-Unofficial-API/tr "Turkish") [🇺🇸](https://cy4u.dev/Twitter-Unofficial-API/ "English") 

[**Twitter Unofficial API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter Unofficial API"), web sitelerine ve uygulamalara kolayca entegre edilebilen bir kütüphanedir.

[**Twitter API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter API"), kullanıcıların Twitter hesaplarıyla hızlı ve güvenli bir şekilde giriş yapmalarını sağlar. Sadece birkaç basit adımda, kullanıcıların hesaplarına erişim sağlanır.

[**Twitter Login API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter Login API"), kullanıcıya **Twitter**'da oturum açma fırsatı sunar. Eğer ekstra bilgi istenirse, kullanıcı bunları da sağlayabilir.

Örneğin kullanıcıların "**checkpoint**" adı verilen ekstra güvenlik adımlarını geçmelerini isterler. [**Unofficial Twitter API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Unofficial Twitter API"), bu tür durumları da dikkate alır ve kullanıcıların giriş işlemlerini sorunsuz bir şekilde tamamlamalarını sağlar.

Son olarak, kullanıcının giriş işlemi başarıyla tamamlandığında, kütüphane oturum açan kullanıcının hesabına ait "**çerez**" verilerini alır. Bu bilgiler kullanıcının işlem yapabilmesi için kullanılabilir.

## Twitter Kütüphanesine Giriş

Çok yönlü bir çalışma zamanı ortamı olan **Node.js**, geliştiricilere ölçeklenebilir ve verimli web uygulamaları oluşturma olanağı sağlar.

Geliştiriciler, **JavaScript**'ten yararlanarak eşzamansız programlamanın gücünden yararlanabilir, bu da onu ağ isteklerini ve API entegrasyonlarını yönetmek için ideal bir seçim haline getirir.

[**Twitter API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter API")'miz, geliştiricilerin çeşitli eylemleri sorunsuz bir şekilde gerçekleştirmeleri için basitleştirilmiş bir arayüz sunarak **Twitter** ile etkileşimin inceliklerini özetlemeyi amaçlamaktadır.

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

[**Twitter**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter"), [**Twitter API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter API"), [**Twitter Unofficial API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter Unofficial API"), [**Unofficial Twitter API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Unofficial Twitter API"), [**Twitter Login API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter Login API"), [**X API**](https://cy4u.dev/Twitter-Unofficial-API/tr "X API"), [**X Unofficial API**](https://cy4u.dev/Twitter-Unofficial-API/tr "X Unofficial API"), [**Unofficial X API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Unofficial X API"), [**X Login API**](https://cy4u.dev/Twitter-Unofficial-API/tr "X Login API"), [**twitter api in typescript**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api in typescript"), [**twitter api in javascript**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api in javascript"), [**twitter api in nodejs**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api in nodejs"), [**twitter api for students**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api for students"), [**twitter api client-not-enrolled**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api client-not-enrolled"), [**twitter api data collection**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api data collection"), [**twitter api authentication**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api authentication"), [**twitter api javascript sdk**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api javascript sdk"), [**twitter api typescript sdk**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api typescript sdk"), [**twitter api nodejs sdk**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api nodejs sdk"), [**twitter api enterprise pricing**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api enterprise pricing"), [**twitter api bearer token**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api bearer token"), [**twitter api get replies**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api get replies"), [**twitter api for academic research**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api for academic research"), [**twitter api cost**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api cost"), [**twitter api help**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api help"), [**twitter api client forbidden**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api client forbidden"), [**twitter api impressions**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api impressions"), [**twitter api get tweets**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api get tweets"), [**twitter api delete tweet**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api delete tweet"), [**twitter api analytics**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api analytics"), [**twitter api javascript authentication**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api javascript authentication"), [**twitter api typescript authentication**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api typescript authentication"), [**twitter api nodejs authentication**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api nodejs authentication"), [**twitter api expensive**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api expensive"), [**twitter api block user**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api block user"), [**twitter api historical data**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api historical data"), [**twitter api fees**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api fees"), [**twitter api consumer key**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api consumer key"), [**twitter api issues**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api issues"), [**twitter api dashboard**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api dashboard"), [**twitter api alternative**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api alternative"), [**twitter api json**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api json"), [**twitter api error codes**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api error codes"), [**twitter api basic**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api basic"), [**twitter api key price**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api key price"), [**twitter api get tweets by hashtag**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api get tweets by hashtag"), [**twitter api free limits**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api free limits"), [**twitter api bad authentication data**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api bad authentication data"), [**twitter api hashtag count**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api hashtag count"), [**twitter api in r**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api in r"), [**twitter api github**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api github"), [**twitter api callback url**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api callback url"), [**twitter api documentation javascript**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api documentation javascript"), [**twitter api documentation typescript**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api documentation typescript"), [**twitter api documentation nodejs**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api documentation nodejs"), [**twitter api access levels**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api access levels"), [**twitter api javascript example**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api javascript example"), [**twitter api typescript example**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api typescript example"), [**twitter api nodejs example**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api nodejs example"), [**twitter api education**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api education"), [**twitter api bot**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api bot"), [**twitter api hashtag**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api hashtag"), [**twitter api followers**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api followers"), [**twitter api client**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api client"), [**twitter api integration**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api integration"), [**twitter api developer account**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api developer account"), [**twitter api access**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api access"), [**twitter api endpoints**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api endpoints"), [**twitter api oauth**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api oauth"), [**twitter api key and secret**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api key and secret"), [**twitter api get following list**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api get following list"), [**twitter api free**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api free"), [**twitter api block**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api block"), [**twitter api html**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api html"), [**twitter api image**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api image"), [**twitter api fetch tweets**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api fetch tweets"), [**twitter api create tweet**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api create tweet"), [**twitter api down**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api down"), [**twitter api access cost**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api access cost"), [**twitter api json example**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api json example"), [**twitter api enterprise**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api enterprise"), [**twitter api basic plan**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api basic plan"), [**twitter api get user id from username**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api get user id from username"), [**twitter api for developers**](https://cy4u.dev/Twitter-Unofficial-API/tr ""), [**twitter api credentials**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api credentials"), [**twitter api http**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api http"), [**twitter api developer**](https://cy4u.dev/Twitter-Unofficial-API/tr ""), [**twitter api javascript**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api javascript"), [**twitter api example**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api example"), [**twitter api access token**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api access token"), [**twitter api key**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api key"), [**twitter api get user info**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api get user info"), [**twitter api engagement**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api engagement"), [**twitter api bearer token not working**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api bearer token not working"), [**twitter api health**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api health"), [**twitter api id**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api id"), [**twitter api for posting tweets**](https://cy4u.dev/Twitter-Unofficial-API/tr ""), [**twitter api cost per month**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api cost per month"), [**twitter api dataset**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api dataset"), [**twitter api academic**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api academic"), [**twitter api java examples**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api java examples"), [**twitter api explorer**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api explorer"), [**twitter api bookmarks**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api bookmarks"), [**twitter api golang**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api golang"), [**twitter api for sentiment analysis**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api for sentiment analysis"), [**twitter api changes**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api changes"), [**twitter api hootsuite**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api hootsuite"), [**twitter api get followers**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api get followers"), [**twitter api documentation**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api documentation"), [**twitter api interface**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api interface"), [**twitter api dev**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api dev"), [**twitter api alternative reddit**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api alternative reddit"), [**twitter api get tweets by user**](https://cy4u.dev/Twitter-Unofficial-API/tr ""), [**twitter api elevated access**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api elevated access"), [**twitter api basic access**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api basic access"), [**twitter api headers**](https://cy4u.dev/Twitter-Unofficial-API/tr "twitter api headers"), [**NodeJS Developer**](https://cy4u.dev "NodeJS Developer"), [**Back-end Developer**](https://cy4u.dev "Back-end Developer"), [**Node.JS Developer**](https://cy4u.dev "Node.JS Developer"), [**Backend Developer**](https://cy4u.dev "Backend Developer")

#### Sponsorluk & Bağış

[Github](https://github.com/sponsors/cy4udev "cy4udev github") | [Patreon](https://patreon.com/cy4udev "cy4udev patreon") | [BuyMeaCoffee](https://www.buymeacoffee.com/cy4udev "cy4udev BuyMeaCoffee")

#### Telif Hakkı ve Diğer Konular

Telif Hakkı: [copyright@cy4u.dev](mailto:copyright@cy4u.dev "copyright@cy4u.dev") | Diğer Konular: [hello@cy4u.dev](mailto:hello@cy4u.dev "hello@cy4u.dev")

#### Sosyal Medya

[Linkedin](https://www.linkedin.com/company/cy4udev/ "cy4udev linkedin") | [Twitter](https://twitter.com/cy4udev "cy4udev twitter") | [Bluesky](https://bsky.app/profile/cy4u.dev "cy4udev bluesky") | [Instagram](https://instagram.com/cy4udev "cy4udev instagram") | [Youtube](https://www.youtube.com/@cy4udev "cy4udev youtube") | [Telegram](https://t.me/cy4udev "cy4udev telegram") | [Github](https://github.com/cy4udev "cy4udev github") | [Npmjs](https://www.npmjs.com/~cy4udev "cy4udev npmjs")

#### Lisans

[**Can Yesilyurt**](https://canyesilyurt.com "Can Yesilyurt") | [**cy4udev**](https://cy4u.dev "cy4udev")
