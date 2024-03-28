"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Twitter = void 0;
const axios_1 = require("axios");
class Twitter {
    constructor(proxies = {}, language = 'tr') {
        this.USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15';
        this.AUTHORIZATION = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
        this.sSecChUa = '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"';
        this.sSecChUaPlatform = 'macOS';
        this.proxies = proxies;
        this.session = axios_1.default.create();
        this.method_check_bypass = false;
        this.flow_token = null;
        this.language = language;
        this.cookie = null;
        this.ct0 = null;
        this.tProxy = null;
        this.content = null;
    }
    __get_guest_token() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = {
                    'authorization': this.AUTHORIZATION,
                    'User-Agent': this.USER_AGENT,
                    'Sec-Ch-Ua': this.sSecChUa,
                    'Sec-Ch-Ua-Mobile': '?0',
                    'Sec-Ch-Ua-Platform': this.sSecChUaPlatform,
                };
                const response = yield this.session.post('https://api.twitter.com/1.1/guest/activate.json', {}, { headers });
                return response.data.guest_token;
            }
            catch (error) {
                throw new Error('Guest token retrieval failed');
            }
        });
    }
    __get_headers() {
        return __awaiter(this, void 0, void 0, function* () {
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
                'x-guest-token': yield this.__get_guest_token(),
                'x-csrf-token': yield this.ct0,
                'x-twitter-active-user': 'yes',
                'x-twitter-client-language': this.language,
                'Cookie': this.cookie || ''
            };
        });
    }
    __error_check(content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (content && content.errors) {
                throw new Error(content.errors[0].message);
            }
        });
    }
    __method_check(method_name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.method_check_bypass) {
                return;
            }
            const subtaskIds = this.get_subtask_ids();
            if (!subtaskIds.includes(method_name)) {
                /* console.log('HATA');
                console.log(this.get_subtask_ids()); */
            }
        });
    }
    get_subtask_ids() {
        var _a, _b;
        // Güvenliğin sağlanması için nullish koşullu işleci (?.) kullanılır
        return ((_b = (_a = this.content) === null || _a === void 0 ? void 0 : _a.subtasks) === null || _b === void 0 ? void 0 : _b.map((subtask) => subtask.subtask_id)) || [];
    }
    __flow_token_check() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.flow_token) {
                throw new Error('Token not found');
            }
        });
    }
    __twitter() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.session
                .get('https://twitter.com/')
                .then(() => this)
                .catch((error) => Promise.reject(error.toJSON()));
        });
    }
    login_flow() {
        return __awaiter(this, void 0, void 0, function* () {
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
                headers: yield this.__get_headers(),
                params,
                httpAgent: yield this.tProxy,
                httpsAgent: yield this.tProxy,
            })
                .then((response) => {
                this.__error_check(response.data);
                this.flow_token = response.data.flow_token;
                this.content = response.data;
                this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                return this;
            })
                .catch((error) => Promise.reject(error));
        });
    }
    LoginJsInstrumentationSubtask() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__flow_token_check();
            yield this.__method_check('LoginJsInstrumentationSubtask');
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
                headers: yield this.__get_headers(),
                httpAgent: yield this.tProxy,
                httpsAgent: yield this.tProxy,
            })
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                this.flow_token = response.data.flow_token;
                this.content = response.data;
                yield this.__error_check();
                return this; // Return an instance of Twitter
            }))
                .catch((error) => {
                var _a;
                if ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) {
                    // Handle error response
                }
                else {
                    // Handle other errors
                }
                // Make sure to return something here if necessary
                throw error; // Re-throw the error if needed
            });
        });
    }
    LoginEnterUserIdentifierSSO(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__flow_token_check();
            yield this.__method_check('LoginEnterUserIdentifierSSO');
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
                const response = yield this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                    headers: yield this.__get_headers(),
                    httpAgent: yield this.tProxy,
                    httpsAgent: yield this.tProxy,
                });
                yield this.__error_check(response.data);
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
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    AccountDuplicationCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__flow_token_check();
            yield this.__method_check('AccountDuplicationCheck');
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
                const response = yield this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                    headers: yield this.__get_headers(),
                    httpAgent: yield this.tProxy,
                    httpsAgent: yield this.tProxy,
                });
                yield this.__error_check(response.data);
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
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    successExit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__flow_token_check();
            yield this.__method_check('SuccessExit');
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
                const response = yield this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                    headers: yield this.__get_headers(),
                });
                yield this.__error_check(response.data);
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
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    LoginEnterAlternateIdentifierSubtask(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__flow_token_check();
            yield this.__method_check('LoginEnterAlternateIdentifierSubtask');
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
                const response = yield this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                    headers: yield this.__get_headers(),
                    httpAgent: yield this.tProxy,
                    httpsAgent: yield this.tProxy,
                });
                yield this.__error_check(response.data);
                this.flow_token = response.data.flow_token;
                this.content = response.data;
                return this;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    LoginEnterPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__flow_token_check();
            yield this.__method_check('LoginEnterPassword');
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
                const response = yield this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                    headers: yield this.__get_headers(),
                    httpAgent: yield this.tProxy,
                    httpsAgent: yield this.tProxy,
                });
                yield this.__error_check(response.data);
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
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    LoginTwoFactorAuthChallenge(TwoFactorCode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__flow_token_check();
            yield this.__method_check('LoginTwoFactorAuthChallenge');
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
                const response = yield this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                    headers: yield this.__get_headers(),
                });
                yield this.__error_check(response.data);
                this.flow_token = response.data.flow_token;
                this.content = response.data;
                return this;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    LoginAcid(AcidCode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__flow_token_check();
            yield this.__method_check('LoginAcid');
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
                const response = yield this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                    headers: yield this.__get_headers(),
                    httpAgent: yield this.tProxy,
                    httpsAgent: yield this.tProxy,
                });
                yield this.__error_check(response.data);
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
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.Twitter = Twitter;
