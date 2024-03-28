import axios, { AxiosInstance } from 'axios';


interface Subtask {
    subtask_id: string;
}

interface SubtaskInput {
    subtask_id: string;
    [key: string]: any;
}

class Twitter {
    private USER_AGENT: string;
    private AUTHORIZATION: string;
    private sSecChUa: string;
    private sSecChUaPlatform: string
    private proxies: any;
    private session: AxiosInstance;
    private method_check_bypass: boolean;
    private flow_token: string | null;
    private language: string;
    private cookie: string | null;
    private ct0: string | null;
    private tProxy: any;
    private content: any; // Update the type according to your needs

    constructor(proxies: any = {}, language: string = 'tr') {
        this.USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15';
        this.AUTHORIZATION = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
        this.sSecChUa = '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"';
        this.sSecChUaPlatform = 'macOS';
        this.proxies = proxies;
        this.session = axios.create();
        this.method_check_bypass = false;
        this.flow_token = null;
        this.language = language;
        this.cookie = null;
        this.ct0 = null;
        this.tProxy = null;
        this.content = null;
    }

    private async __get_guest_token(): Promise<string> {
        try {
            const headers = {
                'authorization': this.AUTHORIZATION,
                'User-Agent': this.USER_AGENT,
                'Sec-Ch-Ua': this.sSecChUa,
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': this.sSecChUaPlatform,
            };
            const response = await this.session.post('https://api.twitter.com/1.1/guest/activate.json', {}, { headers });
            return response.data.guest_token;
        } catch (error) {
            throw new Error('Guest token retrieval failed');
        }
    }

    private async __get_headers(): Promise<any> {
        return {
            'authorization': this.AUTHORIZATION,
            'User-Agent': this.USER_AGENT,
            'Sec-Ch-Ua': this.sSecChUa,
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': this.sSecChUaPlatform,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'Content-type': 'application/json',
            'x-guest-token': await this.__get_guest_token(),
            'x-csrf-token': await this.ct0,
            'x-twitter-active-user': 'yes',
            'x-twitter-client-language': this.language,
            'Cookie': this.cookie || ''
        };
    }

    async __error_check(content?: any) {
        if (content && content.errors) {
            throw new Error(content.errors[0].message);
        }
    }

    private async __method_check(method_name: string): Promise<void> {
        if (this.method_check_bypass) {
            return;
        }

        const subtaskIds = this.get_subtask_ids();
        if (!subtaskIds.includes(method_name)) {
            /* console.log('HATA');
            console.log(this.get_subtask_ids()); */
        }
    }


   public get_subtask_ids(): string[] {
        // Güvenliğin sağlanması için nullish koşullu işleci (?.) kullanılır
        return this.content?.subtasks?.map((subtask: any) => subtask.subtask_id) || [];
    }



    private async __flow_token_check(): Promise<void> {
        if (!this.flow_token) {
            throw new Error('Token not found');
        }
    }

    private async __twitter(): Promise<Twitter> {
        return this.session
            .get('https://twitter.com/')
            .then(() => this)
            .catch((error) => Promise.reject(error.toJSON()));
    }

    public async login_flow(): Promise<Twitter> {
        const data = JSON.stringify({
            "input_flow_data": {
              "flow_context": {
                "debug_overrides": {},
                "start_location": {
                  "location": "manual_link"
                }
              }
            },
            "subtask_versions": {
              "action_list": 2,
              "alert_dialog": 1,
              "app_download_cta": 1,
              "check_logged_in_account": 1,
              "choice_selection": 3,
              "contacts_live_sync_permission_prompt": 0,
              "cta": 7,
              "email_verification": 2,
              "end_flow": 1,
              "enter_date": 1,
              "enter_email": 2,
              "enter_password": 5,
              "enter_phone": 2,
              "enter_recaptcha": 1,
              "enter_text": 5,
              "enter_username": 2,
              "generic_urt": 3,
              "in_app_notification": 1,
              "interest_picker": 3,
              "js_instrumentation": 1,
              "menu_dialog": 1,
              "notifications_permission_prompt": 2,
              "open_account": 2,
              "open_home_timeline": 1,
              "open_link": 1,
              "phone_verification": 4,
              "privacy_options": 1,
              "security_key": 3,
              "select_avatar": 4,
              "select_banner": 2,
              "settings_list": 7,
              "show_code": 1,
              "sign_up": 2,
              "sign_up_review": 4,
              "tweet_selection_urt": 1,
              "update_users": 1,
              "upload_media": 1,
              "user_recommendations_list": 4,
              "user_recommendations_urt": 1,
              "wait_spinner": 3,
              "web_modal": 1
            }
          });

        const params = { flow_name: 'login' };
        return this.session
            .post('https://api.twitter.com/1.1/onboarding/task.json', data, {
                headers: await this.__get_headers(),
                params,
                httpAgent: await this.tProxy,
                httpsAgent: await this.tProxy,
            })
            .then((response) => {
                this.__error_check(response.data);
                this.flow_token = response.data.flow_token;
                this.content = response.data;

                this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                return this;
            })
            .catch((error) => Promise.reject(error));
    }

    public async LoginJsInstrumentationSubtask(): Promise<Twitter> {
        await this.__flow_token_check();
        await this.__method_check('LoginJsInstrumentationSubtask');
        const data = JSON.stringify({
            "flow_token": this.flow_token,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginJsInstrumentationSubtask",
                    "js_instrumentation": {
                        "response": JSON.stringify({
                            // Add your response data here
                        }),
                        "link": "next_link",
                    },
                }
            ],
        });

        return this.session
            .post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.__get_headers(),
                httpAgent: await this.tProxy,
                httpsAgent: await this.tProxy,
            })
            .then(async (response) => {
                this.flow_token = response.data.flow_token;
                this.content = response.data;
                await this.__error_check();
                return this; // Return an instance of Twitter
            })
            .catch((error) => {
                if (error.response?.data) {
                    // Handle error response
                } else {
                    // Handle other errors
                }
                // Make sure to return something here if necessary
                throw error; // Re-throw the error if needed
            });
    }


    async LoginEnterUserIdentifierSSO(user_id: string): Promise<Twitter> {
        await this.__flow_token_check();
        await this.__method_check('LoginEnterUserIdentifierSSO');
        const data = JSON.stringify({
            "flow_token": this.flow_token,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginEnterUserIdentifierSSO",
                    "settings_list": {
                        "setting_responses": [
                            {
                                "key": "user_identifier",
                                "response_data": { "text_data": { "result": user_id } },
                            }
                        ],
                        "link": "next_link",
                    },
                }
            ],
        });
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.__get_headers(),
                httpAgent: await this.tProxy,
                httpsAgent: await this.tProxy,
            });
            await this.__error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            if (response.headers['set-cookie']) {
                const ct0Regex = /ct0=([^;]+)/;
                for (const cookieItem of response.headers['set-cookie']) {
                    if (typeof cookieItem === 'string') {
                        const ct0Match = cookieItem.match(ct0Regex);
                        if (ct0Match) {
                            this.ct0 = ct0Match[1];
                            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                        }
                    }
                }
            }
            return this;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async AccountDuplicationCheck(): Promise<Twitter> {
        await this.__flow_token_check();
        await this.__method_check('AccountDuplicationCheck');
        const data = {
            "flow_token": this.flow_token,
            "subtask_inputs": [
                {
                    "check_logged_in_account": {
                        "link": "AccountDuplicationCheck_false"
                    },
                    "subtask_id": "AccountDuplicationCheck"
                }
            ]
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.__get_headers(),
                httpAgent: await this.tProxy,
                httpsAgent: await this.tProxy,
            });
            await this.__error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            if (response.headers['set-cookie']) {
                const ct0Regex = /ct0=([^;]+)/;
                for (const cookieItem of response.headers['set-cookie']) {
                    if (typeof cookieItem === 'string') {
                        const ct0Match = cookieItem.match(ct0Regex);
                        if (ct0Match) {
                            this.ct0 = ct0Match[1];
                            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                        }
                    }
                }
            }
            return this;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async successExit(): Promise<Twitter> {
        await this.__flow_token_check();
        await this.__method_check('SuccessExit');
        const data = {
            flow_token: this.flow_token,
            subtask_inputs: [
                {
                    subtask_id: 'SuccessExit',
                    open_link: {
                        link: {
                            link_type: 'subtask',
                            link_id: 'next_link',
                            subtask_id: 'LoginOpenHomeTimeline'
                        }
                    }
                },
            ],
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.__get_headers(),
            });
            await this.__error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            if (response.headers['set-cookie']) {
                const ct0Regex = /ct0=([^;]+)/;
                for (const cookieItem of response.headers['set-cookie']) {
                    if (typeof cookieItem === 'string') {
                        const ct0Match = cookieItem.match(ct0Regex);
                        if (ct0Match) {
                            this.ct0 = ct0Match[1];
                            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                        }
                    }
                }
            }
            return this;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async LoginEnterAlternateIdentifierSubtask(text: string): Promise<Twitter> {
        await this.__flow_token_check();
        await this.__method_check('LoginEnterAlternateIdentifierSubtask');
        const data = {
            flow_token: this.flow_token,
            subtask_inputs: [
                {
                    subtask_id: 'LoginEnterAlternateIdentifierSubtask',
                    enter_text: { text: text, link: 'next_link' },
                },
            ],
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.__get_headers(),
                httpAgent: await this.tProxy,
                httpsAgent: await this.tProxy,
            });
            await this.__error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            return this;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async LoginEnterPassword(password: string): Promise<Twitter> {
        await this.__flow_token_check();
        await this.__method_check('LoginEnterPassword');
        const data = {
            flow_token: this.flow_token,
            subtask_inputs: [
                {
                    subtask_id: 'LoginEnterPassword',
                    enter_password: { password: password, link: 'next_link' },
                },
            ],
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.__get_headers(),
                httpAgent: await this.tProxy,
                httpsAgent: await this.tProxy,
            });
            await this.__error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            if (response.headers['set-cookie']) {
                const ct0Regex = /ct0=([^;]+)/;
                for (const cookieItem of response.headers['set-cookie']) {
                    if (typeof cookieItem === 'string') {
                        const ct0Match = cookieItem.match(ct0Regex);
                        if (ct0Match) {
                            this.ct0 = ct0Match[1];
                            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                        }
                    }
                }
            }
            return this;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async LoginTwoFactorAuthChallenge(TwoFactorCode: string): Promise<Twitter> {
        await this.__flow_token_check();
        await this.__method_check('LoginTwoFactorAuthChallenge');
        const data = {
            flow_token: this.flow_token,
            subtask_inputs: [
                {
                    subtask_id: 'LoginTwoFactorAuthChallenge',
                    enter_text: { text: TwoFactorCode, link: 'next_link' },
                },
            ],
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.__get_headers(),
            });
            await this.__error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            return this;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async LoginAcid(AcidCode: string): Promise<Twitter> {
        await this.__flow_token_check();
        await this.__method_check('LoginAcid');
        const data = {
            "flow_token": this.flow_token,
            "subtask_inputs": [
                {
                    "enter_text": {
                        "link": "next_link",
                        "text": AcidCode.trim()
                    },
                    "subtask_id": "LoginAcid"
                }
            ]
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.__get_headers(),
                httpAgent: await this.tProxy,
                httpsAgent: await this.tProxy,
            });
            await this.__error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            if (response.headers['set-cookie']) {
                const ct0Regex = /ct0=([^;]+)/;
                for (const cookieItem of response.headers['set-cookie']) {
                    if (typeof cookieItem === 'string') {
                        const ct0Match = cookieItem.match(ct0Regex);
                        if (ct0Match) {
                            this.ct0 = ct0Match[1];
                            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                        }
                    }
                }
            }
            return this;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    

}

export { Twitter };
