import { useTranslation } from "react-i18next";
import { Col, Form, Input, Select, Space } from "antd";
import { PhoneInput } from "./phoneInput";
import { PassportNumber, PassportPNFL, PassportSeria } from "./passportDataInputs";
import { TimeInput } from "./timeInput";
import { DateInput } from "./dateInput";
import type { IField, ITypeFormUIBuilder } from "./types/formUIBuilder";
import { NumberInput } from "./numberInput";
import { PasswordInput } from "./passwordInput";

const FormUIBuilder: React.FC<ITypeFormUIBuilder> = ({ formUIData }) => {
    const {t} = useTranslation()
    
    return 	<>
        {formUIData?.map((field: IField | string, index: number) =>
            typeof field === 'string' ? null : field.type === 'text' ? (
                <Col key={index} span={field.col ? field.col : 4}>
                    <Form.Item name={field.name} label={t(field.label)}
                        rules={[
                            {
                                required: field.required,
                                message: `${t(
                                    `Please input your ${field.label.toLowerCase()}`
                                )}`,
                            },
                        ]}
                        validateTrigger={['onBlur', 'onSubmit']} className='capitalize w-full' >
                        <Input onChange={field.onChange} readOnly={field.readonly} placeholder={`${t(`Enter ${field.label.toLowerCase()}`)} ...`} maxLength={field.maxCount} minLength={field.minCount} allowClear />
                    </Form.Item>
                </Col>
            ) 
            : 
            field.type === 'number' ? (
					<Col key={index} span={field.col ? field.col : 4}>
						<Form.Item name={field.name} label={t(field.label)}
							rules={[
								{
									required: field.required,
									message: t('Please fill input'),
								},
							]} validateTrigger={['onBlur', 'onSubmit']} className='capitalize w-full' >
							<NumberInput defaultValue={field.defaultValue} onChange={field.onChange} maxLength={field.maxCount} minLenth={field.minCount} placeholder={`${t(`Enter ${field.label.toLowerCase()}`)} ...`} readonly={field.readonly} />
						</Form.Item>
					</Col>
				) 
                : 
                field.type === 'password' ? (
					<Col key={index} span={field.col ? field.col : 4}>
						<Form.Item name={field.name} label={t(field.label)}
							rules={[
								{
									required: field.required,
									message: `${t(`Please input your password`)}`,
								},
							]} validateTrigger={['onBlur', 'onSubmit']} className='capitalize w-full'>
							<PasswordInput defaultValue={field.defaultValue} onChange={field.onChange} maxLength={field.maxCount} minLenth={field.minCount} placeholder={`${t(`Enter ${field.label.toLowerCase()}`)} ...`} readonly={field.readonly} />
						</Form.Item>
					</Col>
				) 
                : 
                field.type === 'textarea' ? (
					<Col key={index} span={field.col ? field.col : 4}>
						<Form.Item name={field.name} label={t(field.label)}
							rules={[
								{
									required: field.required,
									message: `${t( `Please input your ${field.label.toLowerCase()}`)}`,
								},
							]} validateTrigger={['onBlur', 'onSubmit']} className='capitalize w-full'>
							<Input.TextArea readOnly={field.readonly} onChange={field.onChange} placeholder={`${t(`Enter ${field.name}`)} ...`} className={'w-full rounded-xl! py-2!'} rows={field.textareaRow ? field.textareaRow : 5} allowClear/>
						</Form.Item>
					</Col>
				) 
                : 
                field.type === 'time' ? (
					<Col key={index} span={field.col ? field.col : 4}>
						<Form.Item name={field.name} label={t(field.label)} rules={[{ required: field.required, message: `` }]} validateTrigger={['onBlur', 'onSubmit']} className='capitalize w-full' >
							<TimeInput/>
						</Form.Item>
					</Col>
				) 
                : 
                field.type === 'date' ? (
					<Col key={index} span={field.col ? field.col : 4}>
						<Form.Item name={field.name} label={t(field.label)} rules={[{ required: field.required, message: `` }]} validateTrigger={['onBlur', 'onSubmit']} className='capitalize w-full' >
							<DateInput/>
						</Form.Item>
					</Col>
				) 
                : 
                field.type === 'select' ? (
					<Col key={index} span={field.col ? field.col : 4}>
						<Form.Item name={field.name} label={t(`${field.label}`)} rules={[{ required: field.required, message: `` }]} validateTrigger={['onBlur', 'onSubmit']} className='capitalize w-full' >
							<Select
								showSearch={ field.onSearch || field.filterOptions ? true : false }
								filterOption={ field.filterOptions ? field.filterOptions : false}
								optionFilterProp='label'
								onSearch={field.onSearch}
								onChange={field.onChange}
								disabled={field.readonly}
								placeholder={`${t(`Select ${field.name}`)} ...`}
								className='w-full custom-select'
								popupClassName='custom-select-dropdown'
								onDropdownVisibleChange={(isOpen: boolean) => { field.setIsOpen && field?.setIsOpen(isOpen)}}
								loading={field.isLoading}
								allowClear 
                                options={field.options}/>
						</Form.Item>
					</Col>
				) 
                : 
                field.type === 'multiselect' ? (
					<Col key={index} span={field.col ? field.col : 4}>
						<Form.Item name={field.name} label={t(`${field.label}`)} rules={[{ required: field.required, message: `` }]} validateTrigger={['onBlur', 'onSubmit']} className='capitalize w-full' >
							<Select
								showSearch={ field.onSearch || field.filterOptions ? true : false}
								filterOption={ field.filterOptions ? field.filterOptions : false}
								onSearch={field.onSearch}
								disabled={field.readonly}
								optionFilterProp='label'
                                options={field.options}
								mode='multiple'
								placeholder={`${t(`Select ${field.name}`)} ...`}
								className='w-full custom-multiselect'
								popupClassName='custom-select-dropdown'
								onDropdownVisibleChange={(isOpen: boolean) => { field.setIsOpen && field?.setIsOpen(isOpen)}}
								loading={field.isLoading}
								allowClear />
						</Form.Item>
					</Col>
				) 
                : 
                field.type === 'phone' ? (
					<Col key={index} span={field.col || 4}>
						<Form.Item name={field.name} label={t(`${field.label}`)}
							rules={[
								{
									required: field.required,
									message: t(`Please enter your phone number`),
								},
							]} validateTrigger={['onBlur', 'onSubmit']} className='capitalize w-full' >
							<PhoneInput />
						</Form.Item>
					</Col>
				) 
                : 
                field.type === 'passport_seria' ? (
					<Col key={index} span={field.col ? field.col : 4}>
						<p className='mb-2.25'>{t(`${field.label}`)}</p>
                        <Space.Compact>
                        {/* Seriya input */}
                        <Form.Item name={field.name} style={{ width: '20%' }}
                            rules={[
                            { required: true, message: "Seriya kiritilishi kerak" },
                            {
                                pattern: /^[A-Za-z]{2}$/,
                                message: "Faqat 2 ta harf bo‘lishi kerak",
                            },
                            ]} >
                            <PassportSeria/>
                        </Form.Item>

                        {/* Raqam input */}
                        <Form.Item name={field.name} style={{ width: '80%' }}
                            rules={[
                            { required: true, message: "Raqam kiritilishi kerak" },
                            {
                                pattern: /^\d{7}$/,
                                message: "Raqam aniq 7 ta raqam bo‘lishi kerak",
                            },
                            ]} >
                            <PassportNumber/>
                        </Form.Item>
                        </Space.Compact>
					</Col>
				) 
                : 
                field.type === 'passport_jshshr' ? (
					<Col key={index} span={field.col ? field.col : 4}>
						<Form.Item name={field.name} label={t(`${field.label}`)} validateTrigger={['onBlur', 'onSubmit']}
							rules={[
								{
									required: field.required,
									message: t('Iltimos, JSHSHIR kiriting!'),
								},
								{
									validator: (_, value) => {
										const digits = String( value || '' ).replace(/\D/g, '')
										const need = field.maxCount || 14
										if (!value) return Promise.resolve()
										if (digits.length === need) return Promise.resolve()
										return Promise.reject(
											new Error(
												t(`JSHSHIR ${need} ta raqamdan iborat bo'lishi kerak`)
											)
										)
									},
								},
							]} className='capitalize w-full'>
							<PassportPNFL />
						</Form.Item>
					</Col>
				) : null)}
        </>
}

export default FormUIBuilder