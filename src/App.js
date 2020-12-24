import Customer from './components/Customer'
import './App.css';

const customers = [
	{
		'id' : 1,
		'image' : 'https://placeimg.com/64/64/1',
		'name' : '김민혁',
		'birthday' : '991224',
		'gender' : '남',
		'jobs' : '대학생'
	},
	{
		'id' : 2,
		'image' : 'https://placeimg.com/64/64/2',
		'name' : '전보송',
		'birthday' : '941225',
		'gender' : '남',
		'jobs' : '프로그래머'
	},
	{
		'id' : 3,
		'image' : 'https://placeimg.com/64/64/3',
		'name' : '신선혜',
		'birthday' : '920214',
		'gender' : '여',
		'jobs' : '요리사'
	}
]


function App() {
	return (
		<div>
			{
				customers.map(c => {
					return (
					<Customer
						key = {c.id}
						id = {c.id}
						image = {c.image}
						name = {c.name}
						birthday = {c.birthday}
						gender = {c.gender}
						jobs = {c.jobs}
					/>
					);
				})
				
			}
			{/* <Customer
				id = {customers[1].id}
				image = {customers[1].image}
				name = {customers[1].name}
				birthday = {customers[1].birthday}
				gender = {customers[1].gender}
				jobs = {customers[1].jobs}
			/>
			<Customer
				id = {customers[2].id}
				image = {customers[2].image}
				name = {customers[2].name}
				birthday = {customers[2].birthday}
				gender = {customers[2].gender}
				jobs = {customers[2].jobs}
			/> */}
		</div>
	);
}

export default App;
