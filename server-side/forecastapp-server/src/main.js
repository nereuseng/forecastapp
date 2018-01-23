const yargs = require('yargs');

const postModel = require('./model/posts.js');
const voteModel = require('./model/votes.js');

const moodOptions = {
    describe: "User's mood",
    demand: true,
    alias: 'm'
};
const argv = yargs
    .help().alias('help', 'h')
    .usage('Usage: $0 <command> [options]')
    .command('list', 'List all posts', {
        searchText: {
            describe: 'Search Text',
            demand: false,
            alias: 's'
        }
    })
    .command('create', 'Create a new post', {
        mood: moodOptions,
        text: {
            describe: 'Content of post',
            demand: true,
            alias: 't'
        }
    })
    .command('vote', 'Create a vote of a post', {
        postId: {
            describe: 'ID of a post',
            demand: true,
            alias: 't'
        },
        mood: moodOptions
    })
    .demandCommand()
    .argv;

var command = argv._[0];

console.log(`Processing command "${command}"`);

switch (command) {
    case 'list':
        postModel.list(argv.searchText).then(posts => {
            console.log(`Listting ${posts.length} post(s)`);
            console.log(JSON.stringify(posts, null, 4));            
        }).catch(err => console.log(err));
        break;
    case 'create':
        postModel.create(argv.mood, argv.text).then(posts => {
            console.log(`Create:`);
            console.log(JSON.stringify(posts, null, 4));            
        }).catch(err => console.log(err));
        break;
    case 'list':
        voteModel.list(argv.postId, argv.mood).then(posts => {
            console.log(`Voted:`);
            console.log(JSON.stringify(posts, null, 4));            
        }).catch(err => console.log(err));
        break;
    default:
        console.log('Command not recognized. See usage via --help');
}

console.log('Exit');