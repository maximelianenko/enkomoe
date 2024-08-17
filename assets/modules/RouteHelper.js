class RouterHelper {
    constructor(router) {
        this.router = router
    }
    treeInfo(treePath) {
        const router = this.router
        const routes = treePath.match(/\/[a-zA-Z0-9]+/g)
        if (!routes) return []
        const routesWithInfo = []
        let routeNow = ""
        for(let route of routes) {
            routeNow += route
            routesWithInfo.push(router.resolve(routeNow))
        }
        return routesWithInfo
    }
    directoryRoutes(directory) {
        // const currentPath = path.replace(/\/$/,'')
        const routes = this.router.getRoutes()
        const directoryRoutes = []
        const regex = new RegExp(`^${directory}`)
        for(const route of routes) {
            if (regex.test(route.path)) {
                directoryRoutes.push(route)
            }
        }
        return directoryRoutes
    }
}
export default RouterHelper