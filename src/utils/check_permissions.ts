import useAuth from "../hooks/useAuth"

const checkPermissions = (permission: string) => {
    const { permissions } = useAuth()
    if (Array.isArray(permissions) && permissions.length > 0) {
        return permissions.some(perm => perm === permission)
    }
}

export default checkPermissions