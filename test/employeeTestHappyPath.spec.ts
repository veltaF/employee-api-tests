import { test, expect, APIResponse } from '@playwright/test';
import { createUniqName, logResponse, attachResponseDetails } from '../lib/utils';
import { proxyRequest } from '../lib/utils'; 
import dotenv from 'dotenv';
import { baseUrl } from '../data/testData'; 

dotenv.config();
const SCRAPERAPI_KEY = process.env.SCRAPERAPI_KEY;


test.describe('Employee API Test Suite', () => {

  test('POST: Add New Record to the system', async ({ request }, testInfo) => {
    let responseBody: any;
    const employeeData = {
      name: createUniqName(),
      salary: '123',
      age: '23',
    };

    await test.step("Given that a user prepares data for a new employee record", async () => {
      testInfo.attach('Input Data', {
        body: JSON.stringify(employeeData, null, 2),
        contentType: 'application/json',
      });
    });

    await test.step("When the user sends the POST request to create a new record", async () => {
      const response = await proxyRequest('POST','/create', {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'CustomUserAgent/1.0 (Employee Creator)',
        },
        data: employeeData,
      }, request, SCRAPERAPI_KEY, baseUrl);

      expect(response.status()).toBe(200);
      responseBody = await response.json();
      await attachResponseDetails(response, testInfo, "Employee Details POST Response");
    });

    await test.step("Then the user verifies that the new record was created successfully", async () => {
        const employeeId = responseBody.data.id;
        expect(employeeId).toBeDefined(); 
        expect(employeeId).toBeGreaterThan(0); 
      });

    await test.step("Then the user verifies that the new record was created successfully", async () => {
      expect(responseBody.status).toBe('success');
      expect(responseBody.data).toHaveProperty('name', employeeData.name);
      expect(responseBody.data).toHaveProperty('salary', employeeData.salary);
      expect(responseBody.data).toHaveProperty('age', employeeData.age);
      expect(responseBody.message).toBe('Successfully! Record has been added.');
    });
  });


  test('GET /employee/{id} - Fetch employee by ID ', async ({ request }, testInfo) => {
    let responseBody: any;
    const employeeId = 7502

    await test.step("When the user sends a GET request to fetch the employee", async () => {
      const response = await proxyRequest('GET', `/employee/${employeeId}`, {
        headers: {
          'User-Agent': 'CustomUserAgent/2.0 (Employee Fetcher)',
        },
      }, request, SCRAPERAPI_KEY, baseUrl);
  
      expect(response.status()).toBe(200);
      responseBody = await response.json();
      await attachResponseDetails(response, testInfo, "Employee Details GET Response");
    });
  
    await test.step("And the user verifies the success message in the response", async () => {
        expect(responseBody.message).toBe('Successfully! Record has been fetched.');
        console.log('Response Body:', responseBody);
    });
  });
});
