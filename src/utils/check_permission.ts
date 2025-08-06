import useAuth from "../hooks/useAuth"

const checkPermission = (permission: string) => {
    const { permissions } = useAuth()
    if (Array.isArray(permissions) && permissions.length >= 0) {
        return permissions.some(perm => perm === permission) || permission === "*"
    }
}

export default checkPermission