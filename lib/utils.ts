export function createUniqName(baseName: string = 'test'): string {
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString().slice(0, 16).replace('T', '_').replace(':', '');
    return `${baseName}_${formattedTime}`;
  }

  export async function logResponse(response: any): Promise<void> {
    const responseBody = await response.json();
    console.log('Response Status:', response.status());
    console.log('Response Headers:', JSON.stringify(response.headers(), null, 2));
    console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  }

  export const proxyRequest = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, options: any, request: any, apiKey: any, baseUrl: string) => {
    const proxyUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(baseUrl + endpoint)}`;
    
    console.log(`Request URL: ${proxyUrl}`); 
  
    switch (method) {
      case 'POST':
        return await request.post(proxyUrl, options);
      case 'GET':
        return await request.get(proxyUrl, options);
      case 'PUT':
        return await request.put(proxyUrl, options);
      case 'DELETE':
        return await request.delete(proxyUrl, options);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  };

  export const attachResponseDetails = async (response: any, testInfo: any, attachmentName: any) => {
    const responseDetails = `
      Status: ${response.status()}\n
      Headers: ${JSON.stringify(response.headers(), null, 2)}\n
      Body: ${JSON.stringify(await response.json(), null, 2)}
    `;
    

    testInfo.attach(attachmentName, {
      body: responseDetails,
      contentType: 'text/plain',
    });
  };
