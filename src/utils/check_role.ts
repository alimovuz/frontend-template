import useAuth from "../hooks/useAuth"

const checkRole = (roles?: Array<string>) => {
    const { role } = useAuth()
    if (Array.isArray(roles) && roles.length >= 0) {
        return roles.some(tempRole => tempRole === role) || roles.includes("*")
    }
}

export default checkRole