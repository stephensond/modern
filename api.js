/**
 * Sends an HTTP request to the given endpoint.
 *
 * @param httpRequestOptions configuration for an HTTP request
 * @param httpRequestOptions.method HTTP method
 * @param httpRequestOptions.requestBody request body to send
 * @param httpRequestOptions.endpoint endpoint to send the request to
 *
 * @returns the status and body of the response
 */
const httpRequest = async ({
  method, requestBody, endpoint,
}) => {
  try {
    // if (method === 'GET') {
    //   const
    // }
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    }
    console.log(requestOptions);

    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}${endpoint}`, requestOptions);
    const { status, ok } = response;

    let responseBody;
    try {
      responseBody = await response.json();
    } catch (error) {
      // response body is empty
      responseBody = {};
    }

    return {
      status,
      ok,
      responseBody,
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      responseBody: { error },
    };
  }
};

export default httpRequest;
