import { type TableProps } from "antd";
import Container from "../../components/container"
import TableComponent from "../../components/table"

const Dashboard = () => {
	const columns: TableProps['columns'] = [
	{
		title: 'Name',
		dataIndex: 'name',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Cash Assets',
		className: 'column-money',
		dataIndex: 'money',
		align: 'right',
	},
	{
		title: 'Address',
		dataIndex: 'address',
	},
	];

	const data = [
	{
		key: '1',
		name: 'John Brown',
		money: '￥300,000.00',
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Jim Green',
		money: '￥1,256,000.00',
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Joe Black',
		money: '￥120,000.00',
		address: 'Sydney No. 1 Lake Park',
	},
	];

	return (
	<Container title={"Dashboard"} isButton={true} create_permession="">
		<TableComponent data={{count: data.length, data}} columns={columns}/>
	</Container> 
	)

}

export default Dashboard