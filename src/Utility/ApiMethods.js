const supertest = require("supertest");
const Ajv = require("ajv");
const endpoints = require("../config/endpoints");
const payloads = require("../test-data/payloads");

const ajv = new Ajv({ allErrors: true, strict: false });

class ApiMethods {

    constructor() {
        this.defaultHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
    }

    // ===============================
    // TOKEN GENERATOR
    // ===============================
    async tokengenerator() {
        const response = await this.request({
            method: "POST",
            url: endpoints.url,
            endpoint: endpoints.Tokengenerator,
            body: payloads.createtoken,
            expectedStatus: 200
        });

        const tokenId = response.body.token;

        if (!tokenId) {
            throw new Error("Token not found in response");
        }

        return tokenId;
    }

    // ===============================
    // STATUS VALIDATION
    // ===============================
    validateStatus(response, expectedStatus, method, endpoint) {
        if (response.status !== expectedStatus) {
            throw new Error(
                `${method} ${endpoint} failed.
Expected: ${expectedStatus}
Actual: ${response.status}
Response: ${JSON.stringify(response.body)}`
            );
        }
    }

    // ===============================
    // SCHEMA VALIDATION
    // ===============================
    validateSchema(schema, responseBody, method, endpoint) {
        if (!schema) return;

        const validate = ajv.compile(schema);
        const valid = validate(responseBody);

        if (!valid) {
            throw new Error(
                `Schema Validation Failed for ${method} ${endpoint}
${JSON.stringify(validate.errors, null, 2)}`
            );
        }
    }

    // ===============================
    // MAIN REQUEST ENGINE
    // ===============================
    async request({
        method,
        url,
        endpoint,
        token = null,
        body = {},
        queryParams = {},
        headers = {},
        expectedStatus = 200,
        schema = null
    }) {

        if (!url) throw new Error("Base URL is required");

        const fullUrl = `${url}${endpoint}`;
        console.log("URL:", fullUrl);

        const request = supertest(url);
        let req;

        switch (method.toUpperCase()) {

            case "GET":
                req = request.get(endpoint).query(queryParams);
                break;

            case "POST":
                req = request.post(endpoint).send(body);
                break;

            case "PUT":
                req = request.put(endpoint).send(body);
                break;

            case "DELETE":
                req = request.delete(endpoint);
                break;

            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        // Merge default headers
        const finalHeaders = {
            ...this.defaultHeaders,
            ...headers
        };

        req.set(finalHeaders);

        // Token handling (Restful Booker style)
        if (token) {
            req.set("Cookie", `token=${token}`);
        }

        const response = await req;

        this.validateStatus(response, expectedStatus, method, endpoint);
        this.validateSchema(schema, response.body, method, endpoint);

        console.log(`${method} ${endpoint} Response:`, response.body);

        return response;
    }

    // ===============================
// DEEP CLONE
// ===============================
async deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// ===============================
// BUILD DYNAMIC PAYLOAD
// ===============================
async buildPayload(basePayload, overrides = {}) {

    const clone = await this.deepClone(basePayload);

    for (const key of Object.keys(overrides)) {
        clone[key] = overrides[key];
    }

    return clone;
}

}

module.exports = ApiMethods;
