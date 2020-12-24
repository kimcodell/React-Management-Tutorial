import React from 'react';
import Customer from './components/Customer'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root : {
		width : "100%",
		//margin : theme.spacing.unit * 3,
		OverflowX : "auto"
	},
	table : {
		minWidth : 1080
	}
}

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


class App extends React.Component {
	render() {
		const {classes} = this.props;
		return (
			<Paper className = {classes.root}>
				<Table className = {classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>번호</TableCell>
							<TableCell>프로필 사진</TableCell>
							<TableCell>이름</TableCell>
							<TableCell>생년월일</TableCell>
							<TableCell>성별</TableCell>
							<TableCell>직업</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							customers.map(c => {
								return (
								<Customer key = {c.id} id = {c.id} image = {c.image} name = {c.name} birthday = {c.birthday} gender = {c.gender} jobs = {c.jobs}/>
								);
							})	
						}
					</TableBody>
				</Table>
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
			</Paper>
		);
	}
}

export default withStyles(styles)(App);
