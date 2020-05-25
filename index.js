const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/courses', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connected to Mongodb'));

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean
});
async function createCourse() {
	const Course = mongoose.model('Course', courseSchema); // Pascal Convation Course =  Class  course=object
	const course = new Course({
		name: 'Node.js Course',
		author: 'Mosh',
		tags: ['node', 'backend'],
		isPublished: true
	});
	const result = await course.save();
	console.log(result);
}
createCourse();
