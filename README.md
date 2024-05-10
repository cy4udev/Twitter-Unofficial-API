# Twitter Unofficial API

**Available Languages**: [🇺🇸](https://www.cy4u.dev/Twitter-Unofficial-API/ "English") [🇹🇷](https://www.cy4u.dev/Twitter-Unofficial-API/tr "Turkish")

[**Twitter Unofficial API**](https://www.cy4u.dev/Twitter-Unofficial-API "Twitter Unofficial API") is a library that can be easily integrated into websites and applications.

The [**Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API "Twitter API") allows users to log in quickly and securely with their Twitter account. In just a few simple steps, users can access their accounts.

The [**Twitter Login API**](https://www.cy4u.dev/Twitter-Unofficial-API "Twitter Login API") gives the user the opportunity to log in to Twitter. If extra information is requested, the user can also provide it.

For example, they ask users to pass extra security steps called "**checkpoints**". The [**Unofficial Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API "Unofficial Twitter API") takes these situations into account and allows users to complete the login process without any problems.

Finally, once a user has successfully logged in, the library retrieves "**cookie**" data from the logged-in user's account. This information can be used for the user to take action.

## Introduction to Twitter Library

A versatile runtime environment, **Node.js** gives developers the ability to build scalable and efficient web applications.

By leveraging **JavaScript**, developers can harness the power of asynchronous programming, making it an ideal choice for managing network requests and API integrations.

Our [**Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API "Twitter API") aims to encapsulate the intricacies of interacting with **Twitter** by providing a simplified interface for developers to seamlessly perform various actions.

### Getting Started

To kickstart the development process, ensure you have **Node.js** installed on your system. You can download it from the official **Node.js website** or use a package manager like **npm** (**Node Package Manager**) to install it.


#### Installation

```
$ npm i twitter-unofficial-api
$ bun i twitter-unofficial-api
$ pnpm i twitter-unofficial-api
```

#### How to import

```js
const { Twitter } = require('twitter-unofficial-api');
const { HttpsProxyAgent } = require('https-proxy-agent');
const sleep = (t) => new Promise((s) => setTimeout(s, t));
```


#### Login with Twitter

```js
async function login() {

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

#### Keywords

[**Twitter**](https://www.cy4u.dev/Twitter-Unofficial-API/ "Twitter"), [**Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API/ "Twitter API"), [**Twitter Unofficial API**](https://www.cy4u.dev/Twitter-Unofficial-API/ "Twitter Unofficial API"), [**Unofficial Twitter API**](https://www.cy4u.dev/Twitter-Unofficial-API/ "Unofficial Twitter API"), [**Twitter Login API**](https://www.cy4u.dev/Twitter-Unofficial-API "Twitter Login API"), [**X API**](https://www.cy4u.dev/Twitter-Unofficial-API/ "X API"), [**X Unofficial API**](https://www.cy4u.dev/Twitter-Unofficial-API/ "X Unofficial API"), [**Unofficial X API**](https://www.cy4u.dev/Twitter-Unofficial-API/ "Unofficial X API"), [**X Login API**](https://www.cy4u.dev/Twitter-Unofficial-API/ "X Login API"), [**twitter api in typescript**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api in typescript"), [**twitter api in javascript**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api in javascript"), [**twitter api in nodejs**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api in nodejs"), [**twitter api for students**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api for students"), [**twitter api client-not-enrolled**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api client-not-enrolled"), [**twitter api data collection**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api data collection"), [**twitter api authentication**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api authentication"), [**twitter api javascript sdk**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api javascript sdk"), [**twitter api typescript sdk**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api typescript sdk"), [**twitter api nodejs sdk**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api nodejs sdk"), [**twitter api enterprise pricing**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api enterprise pricing"), [**twitter api bearer token**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api bearer token"), [**twitter api get replies**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api get replies"), [**twitter api for academic research**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api for academic research"), [**twitter api cost**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api cost"), [**twitter api help**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api help"), [**twitter api client forbidden**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api client forbidden"), [**twitter api impressions**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api impressions"), [**twitter api get tweets**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api get tweets"), [**twitter api delete tweet**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api delete tweet"), [**twitter api analytics**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api analytics"), [**twitter api javascript authentication**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api javascript authentication"), [**twitter api typescript authentication**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api typescript authentication"), [**twitter api nodejs authentication**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api nodejs authentication"), [**twitter api expensive**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api expensive"), [**twitter api block user**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api block user"), [**twitter api historical data**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api historical data"), [**twitter api fees**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api fees"), [**twitter api consumer key**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api consumer key"), [**twitter api issues**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api issues"), [**twitter api dashboard**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api dashboard"), [**twitter api alternative**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api alternative"), [**twitter api json**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api json"), [**twitter api error codes**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api error codes"), [**twitter api basic**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api basic"), [**twitter api key price**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api key price"), [**twitter api get tweets by hashtag**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api get tweets by hashtag"), [**twitter api free limits**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api free limits"), [**twitter api bad authentication data**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api bad authentication data"), [**twitter api hashtag count**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api hashtag count"), [**twitter api in r**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api in r"), [**twitter api github**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api github"), [**twitter api callback url**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api callback url"), [**twitter api documentation javascript**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api documentation javascript"), [**twitter api documentation typescript**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api documentation typescript"), [**twitter api documentation nodejs**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api documentation nodejs"), [**twitter api access levels**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api access levels"), [**twitter api javascript example**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api javascript example"), [**twitter api typescript example**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api typescript example"), [**twitter api nodejs example**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api nodejs example"), [**twitter api education**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api education"), [**twitter api bot**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api bot"), [**twitter api hashtag**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api hashtag"), [**twitter api followers**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api followers"), [**twitter api client**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api client"), [**twitter api integration**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api integration"), [**twitter api developer account**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api developer account"), [**twitter api access**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api access"), [**twitter api endpoints**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api endpoints"), [**twitter api oauth**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api oauth"), [**twitter api key and secret**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api key and secret"), [**twitter api get following list**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api get following list"), [**twitter api free**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api free"), [**twitter api block**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api block"), [**twitter api html**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api html"), [**twitter api image**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api image"), [**twitter api fetch tweets**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api fetch tweets"), [**twitter api create tweet**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api create tweet"), [**twitter api down**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api down"), [**twitter api access cost**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api access cost"), [**twitter api json example**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api json example"), [**twitter api enterprise**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api enterprise"), [**twitter api basic plan**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api basic plan"), [**twitter api get user id from username**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api get user id from username"), [**twitter api for developers**](https://www.cy4u.dev/Twitter-Unofficial-API/ ""), [**twitter api credentials**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api credentials"), [**twitter api http**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api http"), [**twitter api developer**](https://www.cy4u.dev/Twitter-Unofficial-API/ ""), [**twitter api javascript**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api javascript"), [**twitter api example**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api example"), [**twitter api access token**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api access token"), [**twitter api key**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api key"), [**twitter api get user info**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api get user info"), [**twitter api engagement**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api engagement"), [**twitter api bearer token not working**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api bearer token not working"), [**twitter api health**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api health"), [**twitter api id**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api id"), [**twitter api for posting tweets**](https://www.cy4u.dev/Twitter-Unofficial-API/ ""), [**twitter api cost per month**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api cost per month"), [**twitter api dataset**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api dataset"), [**twitter api academic**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api academic"), [**twitter api java examples**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api java examples"), [**twitter api explorer**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api explorer"), [**twitter api bookmarks**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api bookmarks"), [**twitter api golang**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api golang"), [**twitter api for sentiment analysis**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api for sentiment analysis"), [**twitter api changes**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api changes"), [**twitter api hootsuite**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api hootsuite"), [**twitter api get followers**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api get followers"), [**twitter api documentation**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api documentation"), [**twitter api interface**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api interface"), [**twitter api dev**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api dev"), [**twitter api alternative reddit**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api alternative reddit"), [**twitter api get tweets by user**](https://www.cy4u.dev/Twitter-Unofficial-API/ ""), [**twitter api elevated access**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api elevated access"), [**twitter api basic access**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api basic access"), [**twitter api headers**](https://www.cy4u.dev/Twitter-Unofficial-API/ "twitter api headers"), [**NodeJS Developer**](https://www.cy4u.dev "NodeJS Developer"), [**Back-end Developer**](https://www.cy4u.dev "Back-end Developer"), [**Node.JS Developer**](https://www.cy4u.dev "Node.JS Developer"), [**Backend Developer**](https://www.cy4u.dev "Backend Developer")

#### Sponsor & Donate

[Github](https://github.com/sponsors/cy4udev "cy4udev github") | [Patreon](https://patreon.com/cy4udev "cy4udev patreon") | [BuyMeaCoffee](https://www.buymeacoffee.com/cy4udev "cy4udev BuyMeaCoffee")

#### Copyright & Other Issues

Copyright: [copyright@cy4u.dev](mailto:copyright@cy4u.dev "copyright@cy4u.dev") | Other Issues: [hello@cy4u.dev](mailto:hello@cy4u.dev "hello@cy4u.dev")

#### Social Media

[Linkedin](https://www.linkedin.com/company/cy4udev/ "cy4udev linkedin") | [Twitter](https://twitter.com/cy4udev "cy4udev twitter") | [Bluesky](https://bsky.app/profile/cy4u.dev "cy4udev bluesky") | [Instagram](https://instagram.com/cy4udev "cy4udev instagram") | [Youtube](https://www.youtube.com/@cy4udev "cy4udev youtube") | [Telegram](https://t.me/cy4udev "cy4udev telegram") | [Github](https://github.com/cy4udev "cy4udev github") | [Npmjs](https://www.npmjs.com/~cy4udev "cy4udev npmjs")

#### License

[**Can Yesilyurt**](https://canyesilyurt.com "Can Yesilyurt") | [**cy4udev**](https://www.cy4u.dev "cy4udev")
