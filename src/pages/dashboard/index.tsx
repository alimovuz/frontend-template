import { Row } from "antd"
import FormUIBuilder from "../../components/formUIBuilder"
import type { ITypeFormUIBuilder } from "../../types/formUIBuilder"
import Container from "../../components/container"

const Dashboard = () => {
	const formUIData: ITypeFormUIBuilder['formUIData'] = [
		{
			name: 'first_name',
			label: 'Name',
			type: "text",
			required: true,
			col: 12,
		},
		{
			name: 'raqam',
			label: 'Raqam',
			type: "number",
			required: true,
			col: 12,
		},
		{
			name: 'password',
			label: 'Password',
			type: "password",
			required: true,
			col: 12,
		},
		{
			name: 'text',
			label: 'Text',
			type: "textarea",
			required: true,
			col: 12,
		},
		{
			name: 'time',
			label: 'Time',
			type: "time",
			required: true,
			col: 12,
		},
		{
			name: 'date',
			label: 'Date',
			type: "date",
			required: true,
			col: 12,
		},
	]

	return (
	<Container title={"Dashboard"} isButton={true} create_permession="">
		<Row gutter={12}>
			<FormUIBuilder formUIData={formUIData}/>
		</Row>
	</Container> 
	)

}

export default Dashboard