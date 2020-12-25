import React from 'react';
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
	root : {
		width : "100%",
		margin : theme.spacing(3),
		OverflowX : "auto"
	},
	table : {
		minWidth : 1080
	},
	progress : {
		margin : theme.spacing(2)
	},
});

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			customers : '',
			completed : 0
		}
	}

	stateRefresh = () => {
		this.setState({
			customers : '',
			completed : 0
		});
		this.callApi()
		.then(res => this.setState({customers : res}))
		.then(err => console.log(err));
	}

	componentDidMount() {
		this.timer = setInterval(this.progress, 20);
		this.callApi()
		.then(res => this.setState({customers : res}))
		.then(err => console.log(err));
	}

	callApi = async () => {
		const reponse = await fetch('/api/customers');
		const body = await reponse.json();
		return body;
	}

	progress = () => {
		const {completed} = this.state;
		this.setState({completed : completed >= 100 ? 0: completed + 1});
	}

	render() {
		const {classes} = this.props;
		return (
			<div>
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
								this.state.customers ? this.state.customers.map(c => {
									return (
									<Customer key = {c.id} id = {c.id} image = {c.image} name = {c.name} birthday = {c.birthday} gender = {c.gender} jobs = {c.jobs}/>
									);
								}) : 
								<TableRow>
									<TableCell colSpan = "6" align="center">
										<CircularProgress className = {classes.progress} varient = "determinate" value = {this.state.completed} />
									</TableCell>
								</TableRow>
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
				<CustomerAdd stateRefresh={this.stateRefresh}/>
			</div>
		);
	}
}

export default withStyles(styles)(App);
