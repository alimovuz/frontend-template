import { Pagination, Spin, Table } from "antd"
import type React from "react"
import useAuth from "../../hooks/useAuth"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import Actions from "./actions"
import type { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"

type TableProps = {
  data: {
    count?: number,
    data: any[]
  },
  columns: any[],
  loading?: boolean,
  actions?: {
    delete_url: string
    view_permession: string
    edit_permession: string
    delete_permession: string
	confirmPlacement?: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
    refetch?: ReturnType<typeof useQuery<any>>['refetch'];
    onViewClick: (id?: string) => void
    onEditClick: (id?: string) => void
  } 
  extraActions?: (record: any) => React.ReactNode
}

const TableComponent: React.FC<TableProps> = ({data, columns, loading, actions, extraActions}) => {
  const {offset, limit, setOffset, setLimit} = useAuth()
  const { t } = useTranslation()
  const { pathname } = useLocation();
  
  useEffect(() => {
    setOffset(0)
    setLimit(10)
  }, [pathname])
  

  const columnsTable = [
    {
        title: '№',
        width: 50,
        fixed: 'left' as const,
        align: 'center' as const,
        render: (_: any, __: any, index: number) => offset + index + 1,
    },
    ...columns,
    ...(actions ? [{
        title: t('Actions'),
        key: 'actions',
        fixed: 'right' as const,
        width: 150,
        align: 'center' as const,
        render: (_: any, record: any) => (
            <div className="flex items-center justify-center gap-3">
                {extraActions && extraActions(record)}
                <Actions 
                    id={record?.id} 
                    url={actions.delete_url} 
                    edit={actions.edit_permession} 
                    view={actions.view_permession}
                    remove={actions.delete_permession} 
                    confirmPlacement={actions?.confirmPlacement}
                    refetch={actions?.refetch} 
                    onClickEdit={actions.onEditClick} 
                    onClickView={actions.onViewClick}
                />
            </div>
        )
    }]: []),
  ]
  return (
    <>
      <Table loading={loading} columns={columnsTable} dataSource={data.data} bordered pagination={false}/>
    		<div className='flex items-center justify-between mt-4'>
				<div className='font-semibold text-slate-700 px-2 py-1 bg-slate-100 rounded-[8px] border-1 border-slate-200 flex items-center gap-2'>
					{t('Total')}:{' '}
					{loading ? <Spin size='small' /> : data?.count || 0}
				</div>

				<Pagination
					current={Math.floor(offset / limit) + 1}
					pageSize={limit}
					total={data?.count || 0}
					onChange={(page, pageSize) => {
						setOffset((page - 1) * pageSize)
						setLimit(pageSize)
					}}
					showSizeChanger
					disabled={loading}
				/>
			</div>
    </>

  )
}

export default TableComponent