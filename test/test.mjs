import { expect } from 'chai';
import fetch from 'node-fetch';

// Utility function for generating random numbers
const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

describe("Comprehensive API Tests", function() {
    
    describe("Add Two Numbers API", function() {
        const baseUrl = "http://localhost:3000/addTwoNumbers";

        it("should return status 200 when valid numbers are provided", async function() {
            const url = `${baseUrl}/3/5`;
            const response = await fetch(url);
            const body = await response.json();
            expect(response.status).to.equal(200);
            expect(body.result).to.equal(8);
        });

        it("should return the correct result when random numbers are provided", async function() {
            const num1 = generateRandomNumber(1, 100);
            const num2 = generateRandomNumber(1, 100);
            const url = `${baseUrl}/${num1}/${num2}`;
            const response = await fetch(url);
            const body = await response.json();
            expect(body.result).to.equal(num1 + num2);
            expect(body.result).to.be.a('number');
        });

        it("should handle non-numeric inputs and return a 400 status", async function() {
            const url = `${baseUrl}/abc/xyz`;
            const response = await fetch(url);
            const body = await response.json();
            expect(response.status).to.equal(400);
            expect(body.result).to.be.null;
        });

        it("should return correct results for negative numbers", async function() {
            const url = `${baseUrl}/-5/-7`;
            const response = await fetch(url);
            const body = await response.json();
            expect(body.result).to.equal(-12);
        });

        it("should handle missing parameters and return a 400 status", async function() {
            const url = `${baseUrl}/5/`;
            const response = await fetch(url);
            const body = await response.json();
            expect(response.status).to.equal(400);
            expect(body.result).to.be.null;
        });

        it("should perform efficiently under load", async function() {
            const requests = [];
            for (let i = 0; i < 50; i++) {
                const num1 = generateRandomNumber(1, 100);
                const num2 = generateRandomNumber(1, 100);
                const url = `${baseUrl}/${num1}/${num2}`;
                requests.push(fetch(url).then(response => response.json()));
            }
            const results = await Promise.all(requests);
            results.forEach(body => {
                expect(body.result).to.be.a('number');
            });
        });
    });
});
