const express = require("express");
const router = express.Router();
const { collect, eventSummary, userStats } = require('../controllers/analyticscontroller');

/**
 * @swagger
 * /api/analytics/collect:
 *   post:
 *     summary: Collect analytics event data
 *     tags: [Event Data Collection]
 *     security:
 *       - APIKeyHeader: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *                 example: "login_form_cta_click"
 *               url:
 *                 type: string
 *                 example: "https://example.com/page"
 *               referrer:
 *                 type: string
 *                 example: "https://google.com"
 *               device:
 *                 type: string
 *                 example: "mobile"
 *               ipAddress:
 *                 type: string
 *                 example: "192.168.1.1"
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-02-20T12:34:56Z"
 *               metadata:
 *                 type: object
 *                 example: { "browser": "Chrome", "os": "Android", "screenSize": "1080x1920" }
 *     responses:
 *       201:
 *         description: Event collected successfully
 */
router.post("/collect", collect);

/**
 * @swagger
 * /api/analytics/event-summary:
 *   get:
 *     summary: Retrieve analytics summary for a specific event type
 *     tags: [Analytics & Reporting]
 *     parameters:
 *       - in: query
 *         name: event
 *         required: true
 *         schema:
 *           type: string
 *           example: "login_form_cta_click"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-02-15"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-02-20"
 *       - in: query
 *         name: app_id
 *         schema:
 *           type: string
 *           example: "xyz123"
 *     responses:
 *       200:
 *         description: Event summary retrieved successfully
 */
router.get("/event-summary", eventSummary);

/**
 * @swagger
 * /api/analytics/user-stats:
 *   get:
 *     summary: Retrieve user statistics based on unique user events
 *     tags: [Analytics & Reporting]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "user789"
 *     responses:
 *       200:
 *         description: User stats retrieved successfully
 */
router.get("/user-stats", userStats);

module.exports = router;
