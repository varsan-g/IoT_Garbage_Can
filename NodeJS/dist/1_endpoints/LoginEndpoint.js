class LoginEndpoint {
    static async evaluate(request, response) {
        try {
            const user = request.body;
            // Very primitive
            if (user.psw === '123')
                return response.status(200).json("authorized");
            return response.status(404).json("Not authorized");
        }
        catch (e) {
            console.error(e);
        }
    }
}
export { LoginEndpoint };
//# sourceMappingURL=LoginEndpoint.js.map