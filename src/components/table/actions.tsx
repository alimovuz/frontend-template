import type { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import checkPermission from "../../utils/check_permission"
import { Tooltip } from "antd"
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu"
import DeleteData from "./deleteData"

type TypeActions = {
    id: number | string
	url: string
	onClickView: () => void
	onClickEdit: () => void
	view_permission: string
	edit_permission: string
	delete_permission: string
	refetch?: ReturnType<typeof useQuery<any>>['refetch'];
	confirmPlacement?: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}

const Actions: React.FC<TypeActions> = ({ id, url, onClickView, onClickEdit, view_permission, edit_permission, delete_permission, refetch, confirmPlacement }) => {
    const { t } = useTranslation()

    return (
        <>
            {checkPermission(view_permission) && (
				<div onClick={onClickView}
					className='flex items-center justify-center py-1 px-2 rounded-md cursor-pointer border border-gray-200' >
					<Tooltip placement='top' title={t('View')}>
						<LuEye size={16} className='text-gray-500' />
					</Tooltip>
				</div>
			)}

			{checkPermission(edit_permission) && (
				<div
					onClick={onClickEdit}
					className='flex items-center justify-center bg-lime-50 py-1 px-2 rounded-md cursor-pointer border border-lime-200'>
					<Tooltip placement='top' title={t('Edit')}>
						<LuPencil size={16} className='text-green-500' />
					</Tooltip>
				</div>
			)}

			{checkPermission(delete_permission) && (
				<DeleteData permission={delete_permission} refetch={refetch} url={url} id={id} placement={confirmPlacement} >
					<div className='flex items-center justify-center bg-red-50 py-1 px-2 rounded-md cursor-pointer border border-red-200'>
						<LuTrash2 size={16} className='text-red-500' />
					</div>
				</DeleteData>
			)}
        </>
    )
}

export default Actions

