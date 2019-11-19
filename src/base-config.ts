export default {
  contexts: [
    { name: 'local', baseURL: "https://1.2.3.4", password: "some-local-password", username: "local" },
    { name: 'development', baseURL: "https://1.2.3.4", password: "some-dev-password", username: "dev" },
    { name: 'stage', baseURL: "https://1.2.3.4", password: "some-stage-password", username: "stage" },
  ],
  "currentContext": 'local',
};
