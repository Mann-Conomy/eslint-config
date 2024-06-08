const { ESLint } = require("eslint");
const configs = require("../eslint.config.js");
const { describe, expect, test } = require("@jest/globals");

describe("eslint.config.js", () => {
    // Create the JavaScript linter using the configs
    const eslint = createLinter(configs);

    test("should return a singlequote error", async() => {
        // Arrange
        const code = createCodeWithSinglequotes();

        // Act
        const results = await eslint.lintText(code);

        const errors = results.reduce((accumulator, result) => accumulator + result.errorCount, 0);

        // Assert
        expect(errors).toBe(1);
    });

    test("should return missing semicolon errors", async() => {
        // Arrange
        const code = createCodeWithMissingSemicolon();

        // Act
        const results = await eslint.lintText(code);

        const errors = results.reduce((accumulator, result) => accumulator + result.errorCount, 0);

        // Assert
        expect(errors).toBe(2);
    });

    test("should return a indention error", async() => {
        // Arrange
        const code = createCodeWithoutIndention();

        // Act
        const results = await eslint.lintText(code);

        const errors = results.reduce((accumulator, result) => accumulator + result.errorCount, 0);

        // Assert
        expect(errors).toBe(1);
    });

    test("should contain no errors", async() => {
        // Arrange
        const code = createCodeWithoutErrors();

        // Act
        const results = await eslint.lintText(code);

        const errors = results.reduce((accumulator, result) => accumulator + result.errorCount, 0);

        // Assert
        expect(errors).toBe(0);
    });
});

function createLinter(configs) {
    const { rules } = configs.pop();

    return new ESLint({
        overrideConfigFile: true,
        overrideConfig: {
            rules
        }
    });
}

function createCodeWithoutErrors() {
    return "function add(a, b) { \n    return a + b;\n}\nmodule.exports = add;";
}

function createCodeWithSinglequotes() {
    return "let key = 'useRelativePath';\nkey = null;";
}

function createCodeWithMissingSemicolon() {
    return "let key = \"useRelativePath\"\nkey = null";
}

function createCodeWithoutIndention() {
    return "function add(a, b) { \nreturn a + b;\n}\nmodule.exports = add;";
}
