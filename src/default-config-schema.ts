export const configSchema = {
  servers: [
    { name: "development-server", baseURL: "https://1.2.3.4" },
    { name: "local-server", baseURL: "https://5.6.7.8" }
  ],
  contexts: [
    {
      server: "development-server",
      user: "development-developer",
      name: "ninja-context"
    },
    { server: "local-server", user: "local-developer", name: "local-context" }
  ],
  "currentContext": "local-context",
  users: [
    {
      name: "development-developer",
      user: {
        "token-file": "fake-cert-file"
      }
    },
    {
      name: "local-developer",
      user: {
        password: "some-password",
        username: "exp"
      }
    }
  ]
};
