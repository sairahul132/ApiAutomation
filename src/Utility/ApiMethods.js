const supertest = require("supertest");
const axios = require("axios");
const endpoints = require("../config/endpoints");
const payloads = require("../test-data/payloads");
const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true, strict: false });

class ApiMethods {

    async tokengenerator() {
        try {
            const response = await this.post({
                url: endpoints.url,
                endpoint: endpoints.Tokengenerator,
                body: payloads.createtoken,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                expectedStatus: 200

            })
            const tokenId = await response.body.token
            return tokenId;
        }
        catch (error) {
            console.error("POST: Create Token Error:", error.message);
            throw error;
        }
    }

    applyHeaders(req, token, headers = {}) {

        const defaultHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        const finalHeaders = {
            ...defaultHeaders,
            ...headers
        };

        if (token) {
            req.set("Authorization", `Bearer ${token}`);
        }

        req.set(finalHeaders);

        return req;
    }


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

    async get({
        url,
        endpoint,
        token = "",
        queryParams = {},
        headers = {},
        expectedStatus = 200,
        schema = null
    }) {
        try {
            console.log("URL :" + url + endpoint);

            if (!url) throw new Error("Base URL is required");

            const request = supertest(url);
            let req = request.get(endpoint).query(queryParams);

            req = this.applyHeaders(req, token, headers);

            const response = await req;

            this.validateStatus(response, expectedStatus, "GET", endpoint);
            this.validateSchema(schema, response.body, "GET", endpoint);

            return response;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async post({
        url,
        endpoint,
        token = "",
        body = {},
        headers = {},
        expectedStatus = 200,
        schema = null
    }) {
        try {
            console.log("URL :" + url + endpoint);
            if (!url) throw new Error("Base URL is required");
            const request = supertest(url);
            let req = request.post(endpoint).send(body);

            req = this.applyHeaders(req, token, headers);

            const response = await req;

            this.validateStatus(response, expectedStatus, "POST", endpoint);
            this.validateSchema(schema, response.body, "POST", endpoint);

            console.log(`POST ${endpoint} Response`, response.body);

            return response;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


    async put({
        url,
        endpoint,
        token = "",
        body = {},
        headers = {},
        expectedStatus = 200,
        schema = null
    }) {
        try {
            console.log("URL :" + url + endpoint);
            if (!url) throw new Error("Base URL is required");

            const request = supertest(url);
            let req = request.put(endpoint).send(body);

            req = this.applyHeaders(req, token, headers);

            const response = await req;

            this.validateStatus(response, expectedStatus, "PUT", endpoint);
            this.validateSchema(schema, response.body, "PUT", endpoint);

            console.log(`PUT ${endpoint} Response`, response.body);

            return response;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async delete({
        url,
        endpoint,
        token = "",
        headers = {},
        expectedStatus = 200,
        schema = null
    }) {
        try {
            console.log("URL :" + url + endpoint);
            if (!url) throw new Error("Base URL is required");

            const request = supertest(url);
            let req = request.delete(endpoint);

            req = this.applyHeaders(req, token, headers);

            const response = await req;

            this.validateStatus(response, expectedStatus, "DELETE", endpoint);
            this.validateSchema(schema, response.body, "DELETE", endpoint);

            console.log(`DELETE ${endpoint} Response`, response.body);

            return response;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

module.exports = new ApiMethods();
