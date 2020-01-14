let StatesEnum = Object.freeze({
    "Normal": 0,
    "StringSingle": 1, "StringDouble": 2,
});

let StyleTypesEnum = Object.freeze({
    "Space": 0, "SpecSymb1": 1, "SpecSymb2": 2,
    "Digits": 3, "Comment": 4, "String": 5,
    "SpecWord": 6, "Word": 7, "BuiltIn": 8,
});

let SpecialSymbols = {
    ' ': StyleTypesEnum.Space, '\t': StyleTypesEnum.Space, '\r': StyleTypesEnum.Space,
    '\f': StyleTypesEnum.Space, '\v': StyleTypesEnum.Space,
    '!': StyleTypesEnum.SpecSymb1, '@': StyleTypesEnum.SpecSymb1, '%': StyleTypesEnum.SpecSymb1,
    '^': StyleTypesEnum.SpecSymb1, '&': StyleTypesEnum.SpecSymb1,
    '*': StyleTypesEnum.SpecSymb1, '+': StyleTypesEnum.SpecSymb1, '-': StyleTypesEnum.SpecSymb1,
    '=': StyleTypesEnum.SpecSymb1, '<': StyleTypesEnum.SpecSymb1,
    '>': StyleTypesEnum.SpecSymb1, '?': StyleTypesEnum.SpecSymb1, '/': StyleTypesEnum.SpecSymb1,
    '|': StyleTypesEnum.SpecSymb1, '\\': StyleTypesEnum.SpecSymb1,
    '(': StyleTypesEnum.SpecSymb2, ')': StyleTypesEnum.SpecSymb2, ',': StyleTypesEnum.SpecSymb2,
    '.': StyleTypesEnum.SpecSymb2, ':': StyleTypesEnum.SpecSymb2,
    '{': StyleTypesEnum.SpecSymb2, '}': StyleTypesEnum.SpecSymb2,
};

let SpecialWords = {
    'False': StyleTypesEnum.SpecWord, 'None': StyleTypesEnum.SpecWord, 'True': StyleTypesEnum.SpecWord,
    'and': StyleTypesEnum.SpecWord, 'as': StyleTypesEnum.SpecWord, 'yield': StyleTypesEnum.SpecWord,
    'assert': StyleTypesEnum.SpecWord, 'break': StyleTypesEnum.SpecWord, 'class': StyleTypesEnum.SpecWord,
    'continue': StyleTypesEnum.SpecWord, 'def': StyleTypesEnum.SpecWord, 'del': StyleTypesEnum.SpecWord,
    'elif': StyleTypesEnum.SpecWord, 'else': StyleTypesEnum.SpecWord, 'except': StyleTypesEnum.SpecWord,
    'finally': StyleTypesEnum.SpecWord, 'for': StyleTypesEnum.SpecWord, 'from': StyleTypesEnum.SpecWord,
    'global': StyleTypesEnum.SpecWord, 'if': StyleTypesEnum.SpecWord, 'import': StyleTypesEnum.SpecWord,
    'in': StyleTypesEnum.SpecWord, 'is': StyleTypesEnum.SpecWord, 'lambda': StyleTypesEnum.SpecWord,
    'nonlocal': StyleTypesEnum.SpecWord, 'not': StyleTypesEnum.SpecWord, 'or': StyleTypesEnum.SpecWord,
    'pass': StyleTypesEnum.SpecWord, 'raise': StyleTypesEnum.SpecWord, 'return': StyleTypesEnum.SpecWord,
    'try': StyleTypesEnum.SpecWord, 'while': StyleTypesEnum.SpecWord, 'with': StyleTypesEnum.SpecWord,
};

let BuiltInFunctions = [
    'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'breakpoint', 'bytearray', 'bytes', 'callable',
    'chr', 'classmethod', 'compile', 'complex', 'delattr', 'dict', 'dir', 'divmod', 'enumerate',
    'eval', 'exec', 'filter', 'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr',
    'hash', 'help', 'hex', 'id', 'input', 'int', 'isinstance', 'issubclass', 'iter', 'len',
    'list', 'locals', 'map', 'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open',
    'ord', 'pow', 'print', 'property', 'range', 'repr', 'reversed', 'round', 'set', 'setattr',
    'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip',
    '__import__',
];

function beginFromString(line, splitter) {
    let next_index = line.indexOf(splitter);
    let success, block, delta;
    if (next_index === -1) {
        success = false;
        block = {"type": StyleTypesEnum.String, "string": line};
        delta = line.length;
    }
    else {
        success = true;
        block = {"type": StyleTypesEnum.String, "string": line.slice(0, next_index + 3)};
        delta = next_index + 3;
    }
    return [success, block, delta];
}

function processSpecialSymbol(line, index) {
    let type = SpecialSymbols[line[index]];
    let delta = 0;
    while (index + delta < line.length &&
           line[index + delta] in SpecialSymbols &&
           SpecialSymbols[line[index + delta]] === type) {
        ++delta;
    }
    let curr_block = {"type": type, "string": line.substr(index, delta)};
    return [curr_block, delta];
}

function processStartingFromDigit(line, index) {
    let delta = 0;
    while (
        index + delta < line.length &&
        line[index + delta] !== '#' &&  // Comment in code started
        line[index + delta] !== '"' &&  // String in code started from "
        line[index + delta] !== "'" &&  // String in code started from '
        !(line[index + delta] in SpecialSymbols)
        ) {
        ++delta;
    }
    let block = {"type": StyleTypesEnum.Digits, "string": line.substr(index, delta)};
    return [block, delta];
}

function processComment(line, index) {
    let block = {"type": StyleTypesEnum.Comment, "string": line.substr(index)};
    let delta = line.length - index;
    return [block, delta];
}

function processMultilineString(line, index, quot_type) {
    let sep = quot_type.repeat(3);
    let next_ind = line.indexOf(sep, index + 3);
    if (next_ind === -1) {
        let block = {"type": StyleTypesEnum.String, "string": line.substr(index)};
        let delta = line.length - index;
        return [false, block, delta];
    }
    else {
        let block = {"type": StyleTypesEnum.String, "string": line.substring(index, next_ind + 3)};
        let delta = next_ind + 3 - index;
        return [true, block, delta];
    }
}

function processSinglelineString(line, index, quot_type) {
    let next_ind = line.indexOf(quot_type, index + 1);
    let block, delta;
    if (next_ind === -1) {
        block = {"type": StyleTypesEnum.String, "string": line.substr(index)};
        delta = line.length - index;
    }
    else {
        block = {"type": StyleTypesEnum.String, "string": line.substring(index, next_ind + 1)};
        delta = next_ind + 1 - index;
    }
    return [block, delta];
}

function processWord(line, index) {
    let delta = 0;
    while (index + delta < line.length &&
        !(line[index + delta] in SpecialSymbols) &&
        line[index + delta] !== '"' && line[index + delta] !== "'" &&
        line[index + delta] !== '#') {
        ++delta;
    }
    let substring = line.substr(index, delta);
    let block = {
        "string": substring,
    };
    if (substring in SpecialWords) {
        block.type = SpecialWords[substring];
    }
    else if (BuiltInFunctions.includes(substring)) {
        block.type = StyleTypesEnum.BuiltIn;
    }
    else {
        block.type = StyleTypesEnum.Word;
    }
    return [block, delta];
}

function divideToComponents(text) {
    if (text.length === 0) {
        return [];
    }
    let curr_state = StatesEnum.Normal;
    let result = [];
    let lines = text.split("\n");
    for (let index = 0; index < lines.length; index++) {
        let curr_line = lines[index];
        let string_index = 0;
        if (curr_state === StatesEnum.StringSingle ||
            curr_state === StatesEnum.StringDouble) {
            let [success, block, delta] = beginFromString(
                curr_line,
                (curr_state === StatesEnum.StringDouble ? '"""' : "'''"),
            );
            result.push(block);
            string_index += delta;
            if (success) {
                curr_state = StatesEnum.Normal;
            }
        }

        while (string_index < curr_line.length) {
            if (curr_line[string_index] in SpecialSymbols) {
                let [block, delta] = processSpecialSymbol(curr_line, string_index);
                result.push(block);
                string_index += delta;
                continue;
            }

            if (curr_line[string_index] >= '0' && curr_line[string_index] <= '9') {
                let [block, delta] = processStartingFromDigit(curr_line, string_index);
                result.push(block);
                string_index += delta;
                continue;
            }

            if (curr_line[string_index] === '#') {
                let [block, delta] = processComment(curr_line, string_index);
                result.push(block);
                string_index += delta;
                continue;
            }

            if (curr_line.substr(string_index, 3) === '"""' ||
                curr_line.substr(string_index, 3) === "'''") {
                let [success, block, delta] = processMultilineString(
                    curr_line, string_index,
                    curr_line[string_index],
                );
                result.push(block);
                if (!success) {
                    curr_state = (curr_line[string_index] === '"' ?
                                  StatesEnum.StringDouble :
                                  StatesEnum.StringSingle);
                }
                string_index += delta;
                continue;
            }

            if (curr_line[string_index] === "'" || curr_line[string_index] === '"') {
                let [block, delta] = processSinglelineString(
                    curr_line,
                    string_index,
                    curr_line[string_index]
                );
                result.push(block);
                string_index += delta;
                continue;
            }

            let [block, delta] = processWord(curr_line, string_index);
            result.push(block);
            string_index += delta;
        }
        let block = {"type": StyleTypesEnum.Space, "string": '\n'};
        result.push(block);
    }
    console.log(result);
    return result;
}

export {divideToComponents};