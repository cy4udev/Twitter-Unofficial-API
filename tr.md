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

[**Twitter**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter"), [**Twitter API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter API"), [**Twitter Unofficial API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Twitter Unofficial API"), [**Unofficial Twitter API**](https://cy4u.dev/Twitter-Unofficial-API/tr "Unofficial Twitter API"), [**NodeJS Developer**](https://cy4u.dev "NodeJS Developer"), [**Back-end Developer**](https://cy4u.dev "Back-end Developer"), [**Node.JS Developer**](https://cy4u.dev "Node.JS Developer")

#### Sponsorluk & Bağış

[Patreon](https://patreon.com/cy4udev "cy4udev patreon")

#### Copyright & Other Issues

[hello@cy4u.dev](mailto:hello@cy4u.dev "hello@cy4u.dev")

#### Lisans

[**Can Yesilyurt**](https://canyesilyurt.com "Can Yesilyurt") & [**cy4udev**](https://cy4u.dev "cy4udev")