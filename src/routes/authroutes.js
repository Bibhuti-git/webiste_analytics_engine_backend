const express = require("express");
const router = express.Router();
const { register, getKey, revoke } = require("../controllers/authController");
const passport = require("passport");

/**
 * @swagger
 * tags:
 *   name: API Key Management
 *   description: Manage API keys for authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new website/app and generate an API key
 *     tags: [API Key Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               website:
 *                 type: string
 *                 example: "https://example.com"
 *     responses:
 *       201:
 *         description: API Key generated successfully
 *       400:
 *         description: Missing website parameter
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/api-key:
 *   get:
 *     summary: Retrieve the API key for a registered website/app
 *     tags: [API Key Management]
 *     parameters:
 *       - in: query
 *         name: website
 *         required: true
 *         schema:
 *           type: string
 *           example: "https://example.com"
 *     responses:
 *       200:
 *         description: API Key retrieved successfully
 *       404:
 *         description: API Key not found
 */
router.get("/api-key", getKey);

/**
 * @swagger
 * /api/auth/revoke:
 *   post:
 *     summary: Revoke an API key to prevent further use
 *     tags: [API Key Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               website:
 *                 type: string
 *                 example: "https://example.com"
 *     responses:
 *       200:
 *         description: API Key revoked successfully
 */
router.post("/revoke", revoke);


/**
 * @sagger
 * /api/auth/google:
 *   get:
 *     summary: Authenticate a website/app using Google OAuth
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google for authentication
 */
router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));


/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback to issue API Key
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: API Key issued successfully
 *       401:
 *         description: Authentication failed
 */
router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/api/auth/failure",
    }),
    (req, res) => {
      res.json({ message: "Authentication successful!", apiKey: req.user.key });
    }
  );
  
  /**
   * @swagger
   * /api/auth/logout:
   *   get:
   *     summary: Logout the user
   *     tags: [Authentication]
   *     responses:
   *       200:
   *         description: Logged out successfully
   */
  router.get("/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Logged out successfully" });
    });
  });
  
  /**
   * @swagger
   * /api/auth/failure:
   *   get:
   *     summary: Authentication failure
   *     tags: [Authentication]
   *     responses:
   *       401:
   *         description: Google authentication failed
   */
  router.get("/failure", (req, res) => {
    res.status(401).json({ error: "Authentication failed" });
  });
  
module.exports = router;
