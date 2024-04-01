# Twitter Unofficial API

**Available Languages**: [🇺🇸](https://cy4u.dev/Twitter-Unofficial-API/ "English") [🇹🇷](https://cy4u.dev/Twitter-Unofficial-API/tr.html "Turkish")

[**Twitter Unofficial API**](https://cy4u.dev/Twitter-Unofficial-API "Twitter Unofficial API") is a library that can be easily integrated into websites and applications.

The [**Twitter API**](https://cy4u.dev/Twitter-Unofficial-API "Twitter API") allows users to log in quickly and securely with their Twitter account. In just a few simple steps, users can access their accounts.

The [**Twitter Login API**](https://cy4u.dev/Twitter-Unofficial-API "Twitter Login API") gives the user the opportunity to log in to Twitter. If extra information is requested, the user can also provide it.

For example, they ask users to pass extra security steps called "**checkpoints**". The [**Unofficial Twitter API**](https://cy4u.dev/Twitter-Unofficial-API "Unofficial Twitter API") takes these situations into account and allows users to complete the login process without any problems.

Finally, once a user has successfully logged in, the library retrieves "**cookie**" data from the logged-in user's account. This information can be used for the user to take action.

## Introduction to Twitter Library

A versatile runtime environment, **Node.js** gives developers the ability to build scalable and efficient web applications.

By leveraging **JavaScript**, developers can harness the power of asynchronous programming, making it an ideal choice for managing network requests and API integrations.

Our [**Twitter API**](https://cy4u.dev/Twitter-Unofficial-API "Twitter API") aims to encapsulate the intricacies of interacting with **Twitter** by providing a simplified interface for developers to seamlessly perform various actions.

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

[**Twitter**](https://cy4u.dev/Twitter-Unofficial-API/ "Twitter"), [**Twitter API**](https://cy4u.dev/Twitter-Unofficial-API/ "Twitter API"), [**Twitter Unofficial API**](https://cy4u.dev/Twitter-Unofficial-API/ "Twitter Unofficial API"), [**Unofficial Twitter API**](https://cy4u.dev/Twitter-Unofficial-API/ "Unofficial Twitter API"), [**Twitter Login API**](https://cy4u.dev/Twitter-Unofficial-API "Twitter Login API"), [**X API**](https://cy4u.dev/Twitter-Unofficial-API/ "X API"), [**X Unofficial API**](https://cy4u.dev/Twitter-Unofficial-API/ "X Unofficial API"), [**Unofficial X API**](https://cy4u.dev/Twitter-Unofficial-API/ "Unofficial X API"), [**X Login API**](https://cy4u.dev/Twitter-Unofficial-API/ "X Login API"), [**NodeJS Developer**](https://cy4u.dev "NodeJS Developer"), [**Back-end Developer**](https://cy4u.dev "Back-end Developer"), [**Node.JS Developer**](https://cy4u.dev "Node.JS Developer"), [**Backend Developer**](https://cy4u.dev "Backend Developer")

#### Sponsor & Donate

[Github](https://github.com/sponsors/cy4udev "cy4udev github") | [Patreon](https://patreon.com/cy4udev "cy4udev patreon") | [BuyMeaCoffee](https://www.buymeacoffee.com/cy4udev "cy4udev BuyMeaCoffee")

#### Copyright & Other Issues

Copyright: [copyright@cy4u.dev](mailto:copyright@cy4u.dev "copyright@cy4u.dev") | Other Issues: [hello@cy4u.dev](mailto:hello@cy4u.dev "hello@cy4u.dev")

#### Social Media

[Linkedin](https://www.linkedin.com/company/cy4udev/ "cy4udev linkedin") | [Twitter](https://twitter.com/cy4udev "cy4udev twitter") | [Bluesky](https://bsky.app/profile/cy4u.dev "cy4udev bluesky") | [Instagram](https://instagram.com/cy4udev "cy4udev instagram") | [Youtube](https://www.youtube.com/@cy4udev "cy4udev youtube") | [Telegram](https://t.me/cy4udev "cy4udev telegram") | [Github](https://github.com/cy4udev "cy4udev github") | [Npmjs](https://www.npmjs.com/~cy4udev "cy4udev npmjs")

#### License

[**Can Yesilyurt**](https://canyesilyurt.com "Can Yesilyurt") | [**cy4udev**](https://cy4u.dev "cy4udev")
