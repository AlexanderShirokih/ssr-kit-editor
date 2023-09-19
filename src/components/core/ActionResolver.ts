
type ResolverFunction = (params: Record<string, string>) => void;

class ActionResolver {
    private resolverRegistry: Record<string, ResolverFunction>;

    constructor() {
        this.resolverRegistry = {};
    }

    registerResolver(actionName: string, resolverFunction: ResolverFunction): void {
        this.resolverRegistry[actionName] = resolverFunction;
    }

    evaluateAction(action: string): void {
        const { functionName, params } = this.parseStatement(action);

        const resolver = this.resolverRegistry[functionName];
        if (resolver) {
            resolver(params);
        } else {
            console.warn(`No resolver found for action "${functionName}"`);
        }
    }

    private parseStatement(statement: string): { functionName: string; params: Record<string, string> } {
        const functionNameMatch = statement.match(/^(\w+)\(/);
        const functionName = functionNameMatch ? functionNameMatch[1] : "";

        const paramsMatch = statement.match(/\(([^)]+)\)/);
        let paramsStr = paramsMatch ? paramsMatch[1] : "";
        let paramsArray = paramsStr.split(", ");

        const params: Record<string, any> = {};
        for (const param of paramsArray) {
            let [key, value] = param.split("=");
            if (!value) {
                value = key;
                key = "default";
            }
            params[key.trim()] = value.trim();
        }

        return {
            functionName,
            params
        };
    }
}

export default ActionResolver;
