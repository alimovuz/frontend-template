export interface IField {
	name: string
	label: string
	type:
		| 'text'
		| 'number'
		| 'date'
		| 'password'
		| 'textarea'
		| 'select'
		| 'multiselect'
		| 'phone'
		| 'passport_seria'
		| 'passport_jshshr'
		| 'time'
	required: boolean
	readonly?: boolean
	maxCount?: number
	minCount?: number
	col?: number
	textareaRow?: number
	options?: any
	onChange?: any
	onSearch?: any
	isLoading?: boolean
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
	filterOptions?: any
	defaultValue?: string | number
	showTime?: boolean
	labelInValue?: boolean
	optionLabelProp?: string
}

export type ITypeFormUIBuilder = {
	formUIData: (IField | string)[]
}
