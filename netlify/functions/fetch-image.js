const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const imageUrl = event.queryStringParameters.url;

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching image' }),
    };
  }
};
