import { test, expect } from '@playwright/test';
import { createUniqueName, logResponse } from '../lib/utils';
import dotenv from 'dotenv';
import { baseUrl } from '../data/testData';

dotenv.config();

test.describe('API Test Suite with Steps', () => {
  test('GET /employee/{id} - Fetch Non-Existing Employee', async ({ request }) => {
    const invalidEmployeeId = 0;
    let responseBody: any;

    await test.step("When the user sends a GET request to fetch the employee", async () => {
      const response = await request.get(`${baseUrl}/employee/${invalidEmployeeId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await logResponse(response);
      expect(response.status()).toBe(400);
      responseBody = await response.json();
    });

    await test.step("And the user verifies the message in the response", async () => {
      expect(responseBody.message).toBe('Not found record');
    });
  });

  test('POST - Expect 429 Too Many Requests after two quick requests', async ({ request }) => {
    let response: any;
    const employeeData = {
      name: createUniqueName(),
      salary: '123',
      age: '23',
    };

    await test.step("When the user sends the second request in less than one minute", async () => {
      response = await request.post(`${baseUrl}/create`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: employeeData,
      });
    });

    await test.step("And the user verifies the 429 status in the response", async () => {
      expect(response.status()).toBe(429);
    });
  });

});
