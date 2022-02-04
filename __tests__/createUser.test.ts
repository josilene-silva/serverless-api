import 'dotenv/config';
import axios from 'axios';

const url = process.env.API_URL;

describe('Create User', () => {
    it('should be able to create new user', async () => {
        const newUser =  {
            name: 'teste',
            email: `${new Date().getTime()}@gmail.com`
        }

        const response = await axios.post(`${url}/createUser`, newUser)
        const user = response.data;
        expect(user).toHaveProperty('id');
    });

    it('should not be able to create new user with the same e-mail', async () => {
        const newUser = {
            name: 'teste',
            email: `${new Date().getTime()}@gmail.com`
        }

        await axios.post(`${url}/createUser`, newUser);

        await expect(
            axios.post(`${url}/createUser`, {
                name: 'The same',
                email: newUser.email
            })
        ).rejects.toBeInstanceOf(Error);
    });
});