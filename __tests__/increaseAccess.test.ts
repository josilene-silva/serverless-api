import 'dotenv/config';
import axios from 'axios';

const url = process.env.API_URL;

test('increase access returns 200 OK', async () => {
    const response = await axios.post(`${url}/increaseAccess`);
    expect(response.status).toBe(200);
});
