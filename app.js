const express = require('express');
const app = express();
const cors = require('cors');
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

app.use(cors());

app.use(express.json());

app.use('/abc', movies);


app.get('/', (req,res) => {
    res.send('Welcome to Daily Code Buffer in Heroku Auto Deployment!!');
})

app.get('/repos/:owner/:repo/issues', async (req, res) => {
    const owner = req.params.owner;
    const repo = req.params.repo;

    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner,
            repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        res.send(response.data);
    } catch (e) {
        res.statusCode(400).send();
    }
    
})
//true
app.get('/repos/:owner/:repo', async (req, res) => {
    const owner = req.params.owner;
    const repo = req.params.repo;

    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}', {
            owner,
            repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        res.send(response.data);
    } catch (e) {
        res.statusCode(400).send();
    }
    
})

const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));