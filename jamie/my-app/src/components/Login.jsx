import {useState} from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': 'c4d3b966-c2e6-4806-8ede-3039893da1e3', 'User-Name': username, 'User-Secret:': password};

        try {
            await axios.get('https://api.chatengine.io/chats', { header: authObject});

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
            setError('');

        } catch (err) {
            setError('Typo, try again');
        }
    };

    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='input' placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align = 'center'>
                        <button type='submit' className='button'>
                            <span>Start chatting</span>
                        </button>
                    </div>
                </form>
                <h2 className='error' align='center'>{error}</h2>
            </div>
        </div>
    );
};

export default Login;