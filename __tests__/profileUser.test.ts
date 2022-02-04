import 'dotenv/config';
import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

const url = process.env.API_URL;

describe('Profile User', () => {
    it('should be able to get profile user', async () => {
        const newUser = {
            name: 'teste',
            email: `${new Date().getTime()}@gmail.com`
        }

        const { data: user } = await axios.post(`${url}/createUser`, newUser)

        const { data: profile } = await axios.get(`${url}/profileUser/${user.id}`);

        expect(profile).toHaveProperty('id');
    });

    it('should not be able to get profile user', async () => {
        const newUser = {
            name: 'teste',
            email: `${new Date().getTime()}@gmail.com`
        }

        await axios.post(`${url}/createUser`, newUser)
        expect.assertions(1);

        await expect(
            axios.get(`${url}/profileUser/${uuidV4()}`)
        ).rejects.toBeInstanceOf(Error);
    });
});