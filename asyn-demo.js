////Asynchronous
console.log('Before');

console.log('After');
/// By CallBacks
function getUser(id, callback) {
	setTimeout(() => {
		console.log('Fetching Data');
		callback({ id: id, gitHubUserName: 'mosh' });
	}, 2000);
}
function getRepo(username) {
	setTimeout(() => {
		console.log('Calling GitHub API...')፤
		console.log(user)፤
	});
}
function Repo(username) {
	setTimeout(() => {
		console.log('Calling GitHub API...')፤
		console.log(user)፤
	});
}


 ///By ASync Await

function display(){
    await getUser(1).then(user=>getRepo(///))
}