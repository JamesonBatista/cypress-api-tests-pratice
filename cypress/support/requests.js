
export class Requests {

    static Environment() {
        return Cypress.env(Cypress.env('environment'))
    }
    static async request(env, request) {

        return await cy.request({
            method: request ? request : 'GET',
            url: env,
            headers: {},
            body: {},
        })
            .then((response) => {
                return response;
            }).as('response')
    }

    static validateJSONFields(jsonObj, fieldsToIgnore = []) {
        const errors = [];

        for (const field in jsonObj) {
            if (!fieldsToIgnore.includes(field)) {
                if (jsonObj[field] === null || jsonObj[field] === undefined) {
                    errors.push(`Field "${field}" is null or undefined.\n`);
                }
            }
        }
        if (errors.length > 0) {
            throw new Error(`Validation errors:\n ${errors.join(' ')}`);
        }
    }

    static findInJson(obj, keyToFind, position = 1) {
        let result = null;
        let fullValue = null;
        let count = 0;

        function traverse(obj) {
            let value;
            if (Array.isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    value = traverse(obj[i]);
                    if (value) return value;
                }
            } else if (typeof obj === 'object' && obj !== null) {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (key === keyToFind && Array.isArray(obj[key])) {
                            if (obj[key].length >= position) {
                                result = obj[key][position - 1];
                                fullValue = obj[key];
                                throw new Error('Found value');
                            }
                        } else if (key === keyToFind) {
                            count++;
                            if (count === position) {
                                result = obj[key];
                                throw new Error('Found value');
                            }
                        }
                        value = traverse(obj[key]);
                        if (value) return value;
                    }
                }
            }
        }

        try {
            traverse(obj);
        } catch (e) {
            if (e.message !== 'Found value') {
                throw e;
            }
        }

        return fullValue ? { object: fullValue, value: result } : result ? result : console.error(`Path ** ${keyToFind} ** not found`);
    }


    static expect_validation(response, path, equal) {
        const search = this.findInJson(response, path)

        if (equal) {
            expect(search).to.not.null
            expect(search).to.not.undefined
            expect(search).to.eql(equal)
        }

        if (!equal) {
            expect(search).to.not.be.undefined;
            expect(search).to.not.be.null
        }
    }
}