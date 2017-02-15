module.exports = {
  host: "localhost",
  port: 3030,
  mongodb: process.env.DATABASE_URL || "DATABASE_URL",
  public: "../../client/public/",
  auth: {
    token: {
      secret: process.env.FEATHERS_AUTH_SECRET || "FEATHERS_AUTH_SECRET",
    },
    local: {},
    google: {
      clientID: process.env.OAUTH2_GOOGLE_CLIENT_ID || "your google client id",
      clientSecret: process.env.OAUTH2_GOOGLE_CLIENT_SECRET || "your google client secret",
      permissions: {
        scope: ["profile", "email"],
      }
    }
  }
};
