const supertest = require("supertest");
const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true, strict: false });

class ApiMethods {

    constructor(world = null) {
        this.world = world; // Cucumber world (optional)
    }


    attachJSON(title, data) {
        if (!this.world) return;

        const formatted = `
==============================
${title}
==============================
${JSON.stringify(data, null, 2)}
==============================
        `;

        this.world.attach(formatted, "text/plain");
    }


    attachError(error) {
        if (!this.world) return;

        const formatted = `
❌ ERROR
------------------------------
${error}
------------------------------
        `;

        this.world.attach(formatted, "text/plain");
    }

    applyHeaders(req, token, headers) {
        if (token) req.set("Authorization", `Bearer ${token}`);
        if (headers && Object.keys(headers).length > 0) req.set(headers);
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
            if (!url) throw new Error("Base URL is required");

            const request = supertest(url);
            let req = request.get(endpoint).query(queryParams);

            req = this.applyHeaders(req, token, headers);

            const response = await req;

            this.validateStatus(response, expectedStatus, "GET", endpoint);
            this.validateSchema(schema, response.body, "GET", endpoint);

            this.attachJSON(`GET ${endpoint} Response`, response.body);

            return response;

        } catch (error) {
            this.attachError(error.message);
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
            if (!url) throw new Error("Base URL is required");

            const request = supertest(url);
            let req = request.post(endpoint).send(body);

            req = this.applyHeaders(req, token, headers);

            const response = await req;

            this.validateStatus(response, expectedStatus, "POST", endpoint);
            this.validateSchema(schema, response.body, "POST", endpoint);

            this.attachJSON(`POST ${endpoint} Response`, response.body);

            return response;

        } catch (error) {
            this.attachError(error.message);
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
            if (!url) throw new Error("Base URL is required");

            const request = supertest(url);
            let req = request.put(endpoint).send(body);

            req = this.applyHeaders(req, token, headers);

            const response = await req;

            this.validateStatus(response, expectedStatus, "PUT", endpoint);
            this.validateSchema(schema, response.body, "PUT", endpoint);

            this.attachJSON(`PUT ${endpoint} Response`, response.body);

            return response;

        } catch (error) {
            this.attachError(error.message);
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
            if (!url) throw new Error("Base URL is required");

            const request = supertest(url);
            let req = request.delete(endpoint);

            req = this.applyHeaders(req, token, headers);

            const response = await req;

            this.validateStatus(response, expectedStatus, "DELETE", endpoint);
            this.validateSchema(schema, response.body, "DELETE", endpoint);

            this.attachJSON(`DELETE ${endpoint} Response`, response.body);

            return response;

        } catch (error) {
            this.attachError(error.message);
            throw error;
        }
    }
}

module.exports = ApiMethods;
