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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const styles = makeStyles((theme) => ({
	root : {
		width : "100%",
		// margin : theme.spacing(3),
		// OverflowX : "auto",
		minWidth : 1080,
		
	},
	menu : {
		marginTop : 15,
		marginBottom : 15,
		display : 'flex',
		justifyContent : 'center'
	},
	paper : {
		marginLeft : 18,
		marginRight : 18,
	},
	tableHead : {
		fontSize : '1.0rem'
	},
	grow : {
		flexGrow : 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	  },
	  title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
		  display: 'block',
		},
	  },
	  search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
		  backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
		  marginLeft: theme.spacing(1),
		  width: 'auto',
		},
	  },
	  searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	  inputRoot: {
		color: 'inherit',
	  },
	  inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
		  width: '12ch',
		  '&:focus': {
			width: '20ch',
		  },
		},
	  },
	// table : {
	// 	minWidth : 1080
	// },
	progress : {
		margin : theme.spacing(2)
	}
}));

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			customers : '',
			completed : 0,
			searchKeyword : '',
		}
	}

	stateRefresh = () => {
		this.setState({
			customers : '',
			completed : 0,
			searchKeyword : '',
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

	handleValueChange = (e) => {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	render() {
		const filteredComponent = (data) => {
			data = data.filter((c) => {
				return c.name.indexOf(this.state.searchKeyword) > -1;
			})
			return data.map((c) => {
				return <Customer stateRefresh={this.props.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} jobs={c.jobs} />
			})
		}
		const {classes} = this.props;
		const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"]
		return (
			<div className = {classes.root}>
				<AppBar position="static">
					<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						고객 관리 시스템
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
						<SearchIcon />
						</div>
						<InputBase
						placeholder="검색하기"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						name = "searchKeyword"
						value = {this.state.searchKeyword}
						onChange = {this.handleValueChange}
						inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					</Toolbar>
				</AppBar>
				<div className={classes.menu}>
					<CustomerAdd stateRefresh={this.stateRefresh}/>
				</div>
				<Paper>
					<Table className = {classes.table}>
						<TableHead>
							<TableRow>
								{cellList.map(c => {
									return <TableCell className={classes.tableHead}>{c}</TableCell>
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{
								this.state.customers ? filteredComponent(this.state.customers) : 
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
			</div>
		);
	}
}

export default withStyles(styles)(App);
