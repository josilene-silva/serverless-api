import 'dotenv/config';
import axios from 'axios';

const url = process.env.API_URL;

test('consult access returns 200 OK', async () => {
    const response = await axios.get(`${url}/consultAccess`);
    expect(response.status).toBe(200);
});
