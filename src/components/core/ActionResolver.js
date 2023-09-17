
class ActionResolver {

    constructor() {
        this.resolverRegistry = {};
    }

    registerResolver(actionName, resolverFunction) {
        this.resolverRegistry[actionName] = resolverFunction;
    }

    evaluateAction(action) {
        const { functionName, params } = this.parseStatement(action);

        const resolver = this.resolverRegistry[functionName];
        if (resolver) {
            resolver(params);
        } else {
            console.warn(`No resolver found for action "${functionName}"`);
        }
    }

    parseStatement(statement) {
        const functionNameMatch = statement.match(/^(\w+)\(/);
        const functionName = functionNameMatch ? functionNameMatch[1] : "";

        const paramsMatch = statement.match(/\(([^)]+)\)/);
        let paramsStr = paramsMatch ? paramsMatch[1] : "";
        let paramsArray = paramsStr.split(", ");

        const params = {};
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
