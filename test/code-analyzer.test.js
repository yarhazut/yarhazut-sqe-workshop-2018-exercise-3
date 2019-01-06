import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {showSubCode} from '../src/js/code-analyzer';
import {showGraph} from '../src/js/code-analyzer';

describe('The javascript parser', () => {

    // // it('is parsing an substitusion with if', () => {
    // //     //     assert.equal(JSON.stringify(showSubCode('function foo(x, y, z){\n' +
    // //     //         '    let a = x + 1;\n' +
    // //     //         '    let b = a + y;\n' +
    // //     //         '    let c = 0;\n' +
    // //     //         '    \n' +
    // //     //         '    if (b < z) {\n' +
    // //     //         '        c = c + 5;\n' +
    // //     //         '        return x;\n' +
    // //     //         '    } else if (b < z * 2) {\n' +
    // //     //         '        c = 5;\n' +
    // //     //         '        return x;\n' +
    // //     //         '    } else {\n' +
    // //     //         '        c = c + z + 5;\n' +
    // //     //         '        return x;\n' +
    // //     //         '    }\n' +
    // //     //         '["function foo(x, y, z){","    if (((x) + (1)) + (y) < z) {","        return x + y + z + (0) + (5);","    } else if (((x) + (1)) + (y) < z * 2) {","        return x + y + z + ((0) + (x)) + (5);","    } else {","        return x + y + z + ((0) + (z)) + (5);","    }","}"]');
    // //     // });
    //
    it('test1', () => {
        assert.equal(
            JSON.stringify(showSubCode('function foo(x, y, z){\n' +
                '    let a = z[0];\n' +
                '    let b = z[a];\n' +
                '    if (a>b){\n' +
                '       let t=0;\n' +
                '    }\n' +
                '    return c;\n' +
                '}', '1,2,[0,1]')),
            '["function foo(x, y, z){","    if (z[0]>z[z[0]]){","    }","    return c;","}"]');
    });

    it('test', () => {
        assert.equal(
            JSON.stringify(showSubCode('function foo(x, y, z){\n' +
                '    let a = x;\n' +
                '    let b = y;\n' +
                '    let c = z;\n' +
                '}', '\'a\',\'b\',\'c\'')),
            '["function foo(x, y, z){","    let a = x;","    let b = y;","    let c = z;","}"]');
    });

    it('test2', () => {
        assert.equal(
            JSON.stringify(showSubCode('function foo(x, y, z){\n' +
                '   let a = z[0];\n' +
                '    let b = z[a];\n' +
                '    return c;\n' +
                '}', '[1,2],3,0')),
            '["function foo(x, y, z){","    return c;","}"]');
    });



    it('is parsing a while substitution', () => {
        assert.equal(
            JSON.stringify(showSubCode('function foo(x, y, z){\n' +
                '    let a = x + 1;\n' +
                '    let b = a + y;\n' +
                '    let c = 0;\n' +
                '    \n' +
                '    while (a < z) {\n' +
                '        c = a + b;\n' +
                '        z = c * 2;\n' +
                '    }\n' +
                '    \n' +
                '    return z;\n' +
                '}\n', '1,2,3')),
            '["function foo(x, y, z){","    while ((x) + (1) < z) {","        z = ((x) + (1)) + (((x) + (1)) + (y)) * 2;","    }","    return z;","}"]');
    });

    it('is parsing a global var with string substitution', () => {
        assert.equal(
            JSON.stringify(showSubCode('var start=0;\n' +
                'function foo(x, y, z){\n' +
                '    let a = y[start];\n' +
                '    let b = a + z;\n' +
                '    let c = x;\n' +
                '    \n' +
                '    while (y[b] < 10) {\n' +
                '        c = a + b;\n' +
                '        z = c * 2;\n' +
                '    }\n' +
                '    return z;\n' +
                '}', '0,[0,1,0,1,2],3')),
            '["var start=0;","function foo(x, y, z){","    while (y[(y[0]) + (z)] < 10) {","        z = (y[0]) + ((y[0]) + (z)) * 2;","    }","    return z;","}"]');
    });

    it('global var initialized', () => {
        assert.equal(
            JSON.stringify(showSubCode('var start=0;\n' +
                'function foo(x, y, z){\n' +
                '    let a = y[start];\n' +
                '    let b = a + z;\n' +
                '    let c = x;\n' +
                '    \n' +
                '    while (y[b] < 10) {\n' +
                '        c = a + b;\n' +
                '        z = c * 2;\n' +
                '    }\n' +
                '    return z;\n' +
                '}', '0,[0,1,0,1,2],3')),
            '["var start=0;","function foo(x, y, z){","    while (y[(y[0]) + (z)] < 10) {","        z = (y[0]) + ((y[0]) + (z)) * 2;","    }","    return z;","}"]');
    });

    // it('check array#1', () => {//no
    //     assert.equal(
    //         JSON.stringify(showSubCode('function foo(x, y){\n' +
    //             '    let a = y;\n' +
    //             '    let b = y;\n' +
    //             '    if (x[b] < 10) {\n' +
    //             '        b = 1 + b;\n' +
    //             '    }\n' +
    //             '    else if(x[b]<x[b+1]){\n' +
    //             '        return a[0];\n' +
    //             '    }\n' +
    //             '    return 0;\n' +
    //             '}', '[0,1,0,1,2,0,0,0,0],1')),
    //         '["function foo(x, y){","    if (x[y] < 10) {","    }","    else if(x[y]<x[y+1]){","        return y[0];","    }","    return 0;","}"]');
    // });
    // it('check array#2', () => {
    //     assert.equal(
    //         JSON.stringify(showSubCode('', '')),
    //         '');
    // });
    it('', () => {
        assert.equal(
            JSON.stringify(showSubCode('function foo(x){\n' +
                '    let a = x[0];\n' +
                '    let b = x[a];\n' +
                '    let c = 0;\n' +
                '    \n' +
                '    if (c < a) {\n' +
                '        c = 0;\n' +
                '    }\n' +
                '\telse if (b < c) {\n' +
                '        c = c + 5;\n' +
                '    }\n' +
                '    return c;\n' +
                '}', '[1,2,3]')),
            '["function foo(x){","    if (0 < x[0]) {","    }","\\telse if (x[x[0]] < 0) {","    }","    return (0) + (5);","}"]');
    });

    it('', () => {
        assert.equal(
            JSON.stringify(showSubCode('function foo(x, y, z){\n' +
                'let u=0;\n' +
                '   if (x>0){\n' +
                'y=1;}\n' +
                'else if (x>4){\n' +
                'x=2;}\n' +
                'else{\n' +
                'x=9;}\n' +
                '}\n', '1,2,3')),
            '["function foo(x, y, z){","let u=0;","   if (x>0){","y=1;}","else if (x>4){","x=2;}","else{","x=9;}","}"]');
    });

    it('', () => {
        assert.equal(
            JSON.stringify(showSubCode('function foo(x, y, z){\n' +
                '\n' +
                '    if (1 < 9) {\n' +
                '        c = c + 5;\n' +
                '        return x + y + z + c;\n' +
                '    } \n' +
                '\n' +
                '    else {\n' +
                '        c = c + z + 5;\n' +
                '        return x + y + z + c;\n' +
                '    }\n' +
                '}', '1,2,3')),
            '["function foo(x, y, z){","    if (1 < 9) {","        c = c + 5;","        return x + y + z + c;","    } ","    else {","        c = c + z + 5;","        return x + y + z + c;","    }","}"]');
    });

    // it('', () => {
    //     assert.equal(
    //         JSON.stringify(showSubCode('function foo(x){\n' +
    //             '    let a = x[0];\n' +
    //             '    let b = x[a];\n' +
    //             '    let c = 0;\n' +
    //             '    \n' +
    //             '    if (a < b) {\n' +
    //             '        c = 0;\n' +
    //             '    }\n' +
    //             '\telse if (b < c) {\n' +
    //             '        c = c + 5;\n' +
    //             '    }\n' +
    //             '    return c;\n' +
    //             '}', '1,2,3')),
    //         '["function foo(x){","    if (x[0] < x[x[0]]) {","    }","\\telse if (x[x[0]] < 0) {","    }","    return (0) + (5);","}"]');
    // });



    // it('test', () => {
    //     assert.equal(
    //         JSON.stringify(showSubCode('function foo( x, y, z){\n' +
    //             '   let a = z[0];\n' +
    //             '    let b = z[a];\n' +
    //             '    let c = 0;\n' +
    //             '    \n' +
    //             '    if (c < x) {\n' +
    //             '        c = 0;\n' +
    //             '    }\n' +
    //             '\telse if (y < c) {\n' +
    //             '        y = x + 5;\n' +
    //             '    }\n' +
    //             '    return c;\n' +
    //             '}', '1,2,[2,3]')),
    //         '["function foo(x, y, z){","    if (0 < x) {","    }","\t else if (y < 0) {","        y = x + 5;","    }","    return 0;","}"]');
    //
    // });


    //
    //
    // it('check array#4', () => {
    //     assert.equal(
    //         JSON.stringify(showSubCode('function foo(x, y, z){\n' +
    //             '    let a = z;\n' +
    //             '    let b = x[a];\n' +
    //             '    let c = x[b];\n' +
    //             '    \n' +
    //             '    if (c < z) {\n' +
    //             '        c = b;\n' +
    //             '    }\n' +
    //             '\telse if (y < c) {\n' +
    //             '        y = z + 5;\n' +
    //             '    }\n' +
    //             '    return c;\n' +
    //             '}', '[1,2],3,0')),
    //         '["function foo(x, y, z){","    if (x[x[z]] < z) {","    }","\\telse if (y < x[x[z]]) {","        y = z + 5;","    }","    return x[x[z]];","}"]');
    // });
    //
    //
    // it('if inside if', () => {
    //     //     assert.equal(
    //     //         JSON.stringify(showSubCode('function foo(x, y, z, q){\n' +
    //     //             '    let a = x + 1;\n' +
    //     //             '    let b = a + y;\n' +
    //     //             '    let c = z[a];\n' +
    //     //             '    \n' +
    //     //             '    if (b < q) {\n' +
    //     //             '        c = c + 5;\n' +
    //     //             '        a= z[a];\n' +
    //     //             '            if (b>a){\n' +
    //     //             '               c = c+a;\n' +
    //     //             '            }\n' +
    //     //             '            else{\n' +
    //     //             '               c=c-a;\n' +
    //     //             '            }\n' +
    //     //             '        return a + c + b;\n' +
    //     //             '    } else if (b < a * 2) {\n' +
    //     //             '        c = c + x + 5;\n' +
    //     //             '        return a + c + a;\n' +
    //     //             '    } else {\n' +
    //     //             '        c = c + a + 5;\n' +
    //     //             '        return a + c + a;\n' +
    //     //             '    }\n' +
    //     //             '}', '0,1,[2,3],4')),
    //     //         '["function foo(x, y, z, q){","    if (((x) + (1)) + (y) < q) {","            if (((x) + (1)) + (y)>z[(x) + (1)]){","            }","            else{","            }","        return z[(x) + (1)] + (z[(x) + (1)]) + (5) + ((x) + (1)) + (y);","    } else if (((x) + (1)) + (y) < (x) + (1) * 2) {","        return (x) + (1) + ((z[(x) + (1)]) + (x)) + (5) + (x) + (1);","    } else {","        return (x) + (1) + ((z[(x) + (1)]) + ((x) + (1))) + (5) + (x) + (1);","    }","}"]');
    //     // });
    //
    //
    // it('', () => {
    //     assert.equal(
    //         JSON.stringify(showSubCode('', '')),
    //         '');
    // });
    //
    //
    //
    //
    it('is parsing a simple variable declaration 2 correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('var a;')),
            '[{"line":1,"type":"VariableDeclaration","name":"a","condition":"","value":"null (or nothing)"}]');
    });
    //
    it('is parsing a function declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function max(a, b){}')),
            '[{"line":1,"type":"FunctionDeclaration","name":"max","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"a","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"b","condition":"","value":""}]');
    });
    //
    it('is parsing a while statement correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x, y, z){\n' +
                '    let a = x + 1;\n' +
                '    while (a < z) {\n' +
                '        x = a;\n' +
                '        y = z;\n' +
                '    }\n' +
                '    return z;\n' +
                '}\n')),
            '[{"line":1,"type":"FunctionDeclaration","name":"foo","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"x","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"y","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"z","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"a","condition":"","value":"(x) + (1)"},{"line":3,"type":"WhileStatement","name":"","condition":"(a) < (z)","value":""},{"line":4,"type":"AssignmentExpression","name":"x","condition":"","value":"a"},{"line":5,"type":"AssignmentExpression","name":"y","condition":"","value":"z"},{"line":7,"type":"ReturnStatement","name":"","condition":"","value":"z"}]');
    });

    ///from this part- write expected!!!


    // update exp should be after for dec  //no
    // it('is parsing a for statement correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('for (var i=0; i<5; i++){\n' +
    //             'M[i]= -1;\n' +
    //             '}')),
    //         '[{"line":1,"type":"VariableDeclaration","name":"i","condition":"","value":0},{"line":1,"type":"UpdateExpression","name":"","condition":"","value":"i++"},{"line":1,"type":"ForStatement","name":"","condition":"i < 5","value":""},{"line":2,"type":"AssignmentExpression","name":"M[i]","condition":"","value":"-1"}]'
    //     );
    // });

    // it('is parsing an if_Statement correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('function foo(x, y, z){\n' +
    //             '    let a = x + 1;    \n' +
    //             '    if (a < z) {\n' +
    //             '        y= 5;\n' +
    //             '        return x + y;\n' +
    //             '    } else if (x < z * 2) {\n' +
    //             '        y =  x + 5;\n' +
    //             '        return x;\n' +
    //             '    } else {\n' +
    //             '        return  z;\n' +
    //             '    }\n' +
    //             '}')),
    //         '[{"line":1,"type":"FunctionDeclaration","name":"foo","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"x","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"y","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"z","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"a","condition":"","value":"(x) + (1)"},{"line":3,"type":"IfStatement","name":"","condition":"(a) < (z)","value":""},{"line":4,"type":"AssignmentExpression","name":"y","condition":"","value":5},{"line":5,"type":"ReturnStatement","name":"","condition":"","value":"(x) + (y)"},{"line":6,"type":"ElseIfStatement","name":"","condition":"(x) < ((z) * (2))","value":""},{"line":7,"type":"AssignmentExpression","name":"y","condition":"","value":"(x) + (5)"},{"line":8,"type":"ReturnStatement","name":"","condition":"","value":"x"},{"line":9,"type":"ElseStatement","name":"","condition":"","value":""},{"line":10,"type":"ReturnStatement","name":"","condition":"","value":"z"}]'
    //     );
    // });

    // it('is parsing an if_else_Statement correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('if (x<2) \n' +
    //             'x=2;\n' +
    //             'else if (x>3) \n' +
    //             'x=3;')),
    //         '[{"line":1,"type":"IfStatement","name":"","condition":"x < 2","value":""},{"line":2,"type":"AssignmentExpression","name":"x","condition":"","value":2},{"line":3,"type":"ElseIfStatement","name":"","condition":"x > 3","value":""},{"line":4,"type":"AssignmentExpression","name":"x","condition":"","value":3}]'
    //     );
    // });

    // it('is parsing an if_else_Statement_2 correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('function foo(x, y, z){
    //     let a = x + 1;
    //     if (a < z) {
    //         return a;
    //         return y;
    //     } else if (a < y) {
    //         a = a + 5;
    //         return y;
    //     } else if (a>y){
    //         a = z + 5;
    //         return y;
    //     }
    // }
    // ')),
    //         '[{"line":1,"type":"FunctionDeclaration","name":"foo","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"x","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"y","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"z","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"a","condition":"","value":"(x) + (1)"},{"line":3,"type":"IfStatement","name":"","condition":"(a) < (z)","value":""},{"line":4,"type":"ReturnStatement","name":"","condition":"","value":"a"},{"line":5,"type":"ReturnStatement","name":"","condition":"","value":"y"},{"line":6,"type":"ElseIfStatement","name":"","condition":"(a) < (y)","value":""},{"line":7,"type":"AssignmentExpression","name":"a","condition":"","value":"(a) + (5)"},{"line":8,"type":"ReturnStatement","name":"","condition":"","value":"y"},{"line":9,"type":"ElseIfStatement","name":"","condition":"(a) > (y)","value":""},{"line":10,"type":"AssignmentExpression","name":"a","condition":"","value":"(z) + (5)"},{"line":11,"type":"ReturnStatement","name":"","condition":"","value":"y"}]'
    //     );
    // });

    // it('is parsing a return statement correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('function A(){\n' +
    //             'return x;\n' +
    //             '}')),
    //         '[{"line":1,"type":"FunctionDeclaration","name":"A","condition":"","value":""},{"line":2,"type":"ReturnStatement","name":"","condition":"","value":"x"}]'
    //     );
    // });

    it('is parsing a binary exp correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(y){\n' +
                'let x= y+2;\n' +
                '}')),
            '[{"line":1,"type":"FunctionDeclaration","name":"foo","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"y","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"x","condition":"","value":"(y) + (2)"}]'
        );
    });
    //
    it('is parsing a binary exp from both sides correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x, y, z){\n' +
                ' v+c<m+n\n' +
                '}')),
            '[{"line":1,"type":"FunctionDeclaration","name":"foo","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"x","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"y","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"z","condition":"","value":""}]'
        );
    });

    it('is parsing an unary exp correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x, y, z){\n' +
                '  let b= -1;\n' +
                '}')),
            '[{"line":1,"type":"FunctionDeclaration","name":"foo","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"x","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"y","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"z","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"b","condition":"","value":"-1"}]'
        );
    });

    it('is parsing a binary exp ', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x, y, z){\n' +
                '    let a = x+1+y+z;\n' +
                '    let b = a+y+2+1;\n' +
                '    let c = 0+y+x+z;\n' +
                '    \n' +
                '    if (b < z) {\n' +
                '        return x + y + z + c;\n' +
                '    }\n' +
                '}\n')),
            '[{"line":1,"type":"FunctionDeclaration","name":"foo","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"x","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"y","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"z","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"a","condition":"","value":"(((x) + (1)) + (y)) + (z)"},{"line":3,"type":"VariableDeclaration","name":"b","condition":"","value":"(((a) + (y)) + (2)) + (1)"},{"line":4,"type":"VariableDeclaration","name":"c","condition":"","value":"(((0) + (y)) + (x)) + (z)"},{"line":6,"type":"IfStatement","name":"","condition":"(b) < (z)","value":""},{"line":7,"type":"ReturnStatement","name":"","condition":"","value":"(((x) + (y)) + (z)) + (c)"}]'
        );
    });

    it('is parsing an update exp correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x, y, z){\n' +
                ' i++;\n' +
                '}')),
            '[{"line":1,"type":"FunctionDeclaration","name":"foo","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"x","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"y","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"z","condition":"","value":""},{"line":2,"type":"UpdateExpression","name":"","condition":"","value":"i++"}]'
        );
    });
    //
    // it('is parsing a member exp correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('M[1]=4;\n' +
    //             'x= M[i];')),
    //         '[{"line":1,"type":"AssignmentExpression","name":"M[1]","condition":"","value":4},{"line":2,"type":"AssignmentExpression","name":"x","condition":"","value":"M[i]"}]'
    //     );
    // });
    //
    // it('is parsing an update exp correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('i++;')),
    //         '[{"line":1,"type":"UpdateExpression","name":"","condition":"","value":"i++"}]'
    //     );
    // });

    it('is parsing a remove_doubles_func correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(){\n' +
                '    let a = x + 1;\n' +
                '    if (0 < 1) {\n' +
                '        return x;\n' +
                '    } else if (2 < 10) {\n' +
                '        return x;\n' +
                '    } else if (2 < 10) {\n' +
                '        return x;\n' +
                '    }else {\n' +
                '        return x;\n' +
                '    }\n' +
                '}')),
            '[{"line":1,"type":"FunctionDeclaration","name":"foo","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"a","condition":"","value":"(x) + (1)"},{"line":3,"type":"IfStatement","name":"","condition":"(0) < (1)","value":""},{"line":4,"type":"ReturnStatement","name":"","condition":"","value":"x"},{"line":5,"type":"ElseIfStatement","name":"","condition":"(2) < (10)","value":""},{"line":6,"type":"ReturnStatement","name":"","condition":"","value":"x"},{"line":7,"type":"ElseIfStatement","name":"","condition":"(2) < (10)","value":""},{"line":8,"type":"ReturnStatement","name":"","condition":"","value":"x"},{"line":9,"type":"ElseStatement","name":"","condition":"","value":""},{"line":9,"type":"ElseStatement","name":"","condition":"","value":""},{"line":10,"type":"ReturnStatement","name":"","condition":"","value":"x"}]');
    });






    // it('is parsing a simple variable declaration correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('let a = 1;')),
    //         '[{"line":1,"type":"VariableDeclaration","name":"a","condition":"","value":1}]');
    // });
    //
    // it('is parsing a simple variable declaration correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('let a = 1;')),
    //         '[{"line":1,"type":"VariableDeclaration","name":"a","condition":"","value":1}]');
    // });
    //
    // it('is parsing a simple variable declaration correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('let a = 1;')),
    //         '[{"line":1,"type":"VariableDeclaration","name":"a","condition":"","value":1}]');
    // });
    //
    // it('is parsing a simple variable declaration correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('let a = 1;')),
    //         '[{"line":1,"type":"VariableDeclaration","name":"a","condition":"","value":1}]');
    // });

   // it('testPaint1', () => {
     //   assert.equal(
    //         (showGraph('function foo(x, y, z){\n' +
    //             '    let a = x + 1;\n' +
    //             '    let b = a + y;\n' +
    //             '    let c = 0;\n' +
    //             '    \n' +
    //             '    if (b < z) {\n' +
    //             '        c = c + 5;\n' +
    //             '    } else if (b < z * 2) {\n' +
    //             '        c = c + x + 5;\n' +
    //             '    } else {\n' +
    //             '        c = c + z + 5;\n' +
    //             '    }\n' +
    //             '    \n' +
    //             '    return c;\n' +
    //             '}', '1,2,3')),
    //         "\'1=>operation: a = (x) + (1)\n" +
    //         "b = (a) + (y)\n" +
    //         "c = 0\n" +
    //         "|green\n" +
    //         "3=>start: |green\n" +
    //         "4=>operation: c = (c) + (5)\n" +
    //         "|red\n" +
    //         "5=>condition: (b) < ((z) * (2))\n" +
    //         "|green\n" +
    //         "6=>condition: (b) < (z)\n" +
    //         "|green\n" +
    //         "7=>operation: c = ((c) + (x)) + (5)\n" +
    //         "|green\n" +
    //         "8=>operation: c = ((c) + (z)) + (5)\n" +
    //         "|red\n" +
    //         "9=>operation: return c\n" +
    //         "|green\n" +
    //         "1->6\n" +
    //         "3->9\n" +
    //         "4->3\n" +
    //         "5(yes,right)->7\n" +
    //         "5(no)->8\n" +
    //         "6(yes,right)->4\n" +
    //         "6(no)->5\n" +
    //         "7->3\n" +
    //         "8->3");
    // });

            // it('paintTest ', () => {
            // var code = "function foo(x, y, z){\n" +
            //     "    let a = x + 1;\n" +
            //     "    let b = a + y;\n" +
            //     "    let c = 0;\n" +
            //     "    \n" +
            //     "    if (b < z) {\n" +
            //     "        c = c + 5;\n" +
            //     "    } else if (b < z * 2) {\n" +
            //     "        c = c + x + 5;\n" +
            //     "    } else {\n" +
            //     "        c = c + z + 5;\n" +
            //     "    }\n" +
            //     "    \n" +
            //     "    return c;\n" +
            //     "}";
            // var str = "1=>operation: a = (x) + (1)\n" +
            //     "b = (a) + (y)\n" +
            //     "c = 0\n" +
            //     "|green\n" +
            //     "3=>start: |green\n" +
            //     "4=>operation: c = (c) + (5)\n" +
            //     "|red\n" +
            //     "5=>condition: (b) < ((z) * (2))\n" +
            //     "|green\n" +
            //     "6=>condition: (b) < (z)\n" +
            //     "|green\n" +
            //     "7=>operation: c = ((c) + (x)) + (5)\n" +
            //     "|green\n" +
            //     "8=>operation: c = ((c) + (z)) + (5)\n" +
            //     "|red\n" +
            //     "9=>operation: return c\n" +
            //     "|green\n" +
            //     "1->6\n" +
            //     "3->9\n" +
            //     "4->3\n" +
            //     "5(yes,right)->7\n" +
            //     "5(no)->8\n" +
            //     "6(yes,right)->4\n" +
            //     "6(no)->5\n" +
            //     "7->3\n" +
            //     "8->3";
            //     var ans = showGraph(code, '1,2,3')
            //         assert.equal(str,ans);
            //     });



    // it('painting', () => {
    //     var code="";
    //     var input= '';
    //     let str="";
    //     var ans = showGraph(code, input)
    //     assert.equal(str,ans);
    //
    // });



    it('paint1', () => {
        assert.equal(showGraph('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    }\n' +
            '    return c;\n' +
            '}','1,2,3'),'1=>operation: a = (x) + (1)\n' +
            'b = (a) + (y)\n' +
            'c = 0\n' +
            '|green\n' +
            '3=>start: |green\n' +
            '4=>operation: c = (c) + (5)\n' +
            '|red\n' +
            '6=>condition: (b) < (z)\n' +
            '|green\n' +
            '7=>operation: return c\n' +
            '|green\n' +
            '1->6\n' +
            '3->7\n' +
            '4->3\n' +
            '6(yes,right)->4\n' +
            '6(no)->3\n');

    });

    it('paint2', () => {
        assert.equal(showGraph('function foo(x, y, z){\n' +
            '   let a = x + 1;\n' +
            '   let b = a + y; \n' +
            '   while (a < z) {\n' +
            '       a = a + b; \n' +
            '   }\n' +
            '   return z;\n' +
            '}','1,2,3'),'1=>operation: a = (x) + (1)\n' +
            'b = (a) + (y)\n' +
            '|green\n' +
            '3=>operation: NULL\n' +
            '|green\n' +
            '4=>operation: a = (a) + (b)\n' +
            '|green\n' +
            '5=>operation: return z\n' +
            '|green\n' +
            '6=>condition: (a) < (z)\n' +
            '|green\n' +
            '1->3\n' +
            '3->6\n' +
            '4->3\n' +
            '6(yes,right)->4\n' +
            '6(no)->5\n');

    });

    it('paint3', () => {
        assert.equal(showGraph('function Yarden(x) {\n' +
            '    let a = 0;\n' +
            '    let b = 1;\n' +
            '    if (x == 2) {\n' +
            '        x = 2;\n' +
            '    } else if (x==1){\n' +
            '        x = 3;\n' +
            '    }\n' +
            '    return 3;\n' +
            '}','1'),'1=>operation: a = 0\n' +
            'b = 1\n' +
            '|green\n' +
            '3=>start: |green\n' +
            '4=>operation: x = 2\n' +
            '|red\n' +
            '5=>condition: (x) == (1)\n' +
            '|green\n' +
            '6=>condition: (x) == (2)\n' +
            '|green\n' +
            '7=>operation: x = 3\n' +
            '|green\n' +
            '9=>operation: return 3\n' +
            '|green\n' +
            '1->6\n' +
            '3->9\n' +
            '4->3\n' +
            '5(yes,right)->7\n' +
            '5(no)->3\n' +
            '6(yes,right)->4\n' +
            '6(no)->5\n' +
            '7->3\n');

    });

    it('paint4', () => {
        assert.equal(showGraph('function Yarden(x) {\n' +
            '    let a = 0;\n' +
            '    let b = 1;\n' +
            '    if (x == 2) {\n' +
            '        x = 2;\n' +
            '    } else if (x==1){\n' +
            '        x = 3;\n' +
            '    }else{\n' +
            '        x = 9;\n' +
            '    }\n' +
            '    return 3;\n' +
            '}','1'),'1=>operation: a = 0\n' +
            'b = 1\n' +
            '|green\n' +
            '3=>start: |green\n' +
            '4=>operation: x = 2\n' +
            '|red\n' +
            '5=>condition: (x) == (1)\n' +
            '|green\n' +
            '6=>condition: (x) == (2)\n' +
            '|green\n' +
            '7=>operation: x = 3\n' +
            '|green\n' +
            '8=>operation: x = 9\n' +
            '|red\n' +
            '9=>operation: return 3\n' +
            '|green\n' +
            '1->6\n' +
            '3->9\n' +
            '4->3\n' +
            '5(yes,right)->7\n' +
            '5(no)->8\n' +
            '6(yes,right)->4\n' +
            '6(no)->5\n' +
            '7->3\n' +
            '8->3\n');

    });


    it('paint2', () => {
        assert.equal(showGraph('function Yarden(x) {\n' +
            '    var a = 0;\n' +
            '    let b = 1;\n' +
            '    a = 3;\n' +
            '    if (x == 2) {\n' +
            '        x = 2;\n' +
            '    } else if (x==1){\n' +
            '        x = 3;\n' +
            '    }else{\n' +
            '        x = 9;\n' +
            '    }\n' +
            '    return 3;\n' +
            '}','2'),'1=>operation: a = 0\n' +
            'b = 1\n' +
            'a = 3\n' +
            '|green\n' +
            '3=>start: |green\n' +
            '4=>operation: x = 2\n' +
            '|green\n' +
            '5=>condition: (x) == (1)\n' +
            '|red\n' +
            '6=>condition: (x) == (2)\n' +
            '|green\n' +
            '7=>operation: x = 3\n' +
            '|red\n' +
            '8=>operation: x = 9\n' +
            '|green\n' +
            '9=>operation: return 3\n' +
            '|green\n' +
            '1->6\n' +
            '3->9\n' +
            '4->3\n' +
            '5(yes,right)->7\n' +
            '5(no)->8\n' +
            '6(yes,right)->4\n' +
            '6(no)->5\n' +
            '7->3\n' +
            '8->3\n');

    });

    it('paint4', () => {
        assert.equal(showGraph('function Yarden(x) {\n' +
            '    var a;\n' +
            '    let b = 1;\n' +
            '    a = 3;\n' +
            '    if (x == 2) {\n' +
            '        x = 2;\n' +
            '    } else if (x==1){\n' +
            '        x = 3;\n' +
            '    }else{\n' +
            '        x = 9;\n' +
            '    }\n' +
            '    return 3;\n' +
            '}','3'),'1=>operation: a = null (or nothing)\n' +
            'b = 1\n' +
            'a = 3\n' +
            '|green\n' +
            '3=>start: |green\n' +
            '4=>operation: x = 2\n' +
            '|red\n' +
            '5=>condition: (x) == (1)\n' +
            '|green\n' +
            '6=>condition: (x) == (2)\n' +
            '|green\n' +
            '7=>operation: x = 3\n' +
            '|red\n' +
            '8=>operation: x = 9\n' +
            '|green\n' +
            '9=>operation: return 3\n' +
            '|green\n' +
            '1->6\n' +
            '3->9\n' +
            '4->3\n' +
            '5(yes,right)->7\n' +
            '5(no)->8\n' +
            '6(yes,right)->4\n' +
            '6(no)->5\n' +
            '7->3\n' +
            '8->3\n');

    });


    it('paint5', () => {
        assert.equal(showGraph('function YR(x) {\n' +
            '    let a = 0;\n' +
            '    let b = 1;\n' +
            '    if (x == 2) {\n' +
            '        x = 2;\n' +
            '        if (x == 2) {\n' +
            '            a = a;\n' +
            '        } else if (x == 1) {\n' +
            '            b = b;\n' +
            '        }\n' +
            '        let f = 1;\n' +
            '        b = f;\n' +
            '    } else if (x == 1) {\n' +
            '        x = x\n' +
            '    } else {\n' +
            '        a = a\n' +
            '    }\n' +
            '    return 3;\n' +
            '}','1'),'1=>operation: a = 0\n' +
            'b = 1\n' +
            '|green\n' +
            '3=>start: |green\n' +
            '4=>operation: x = 2\n' +
            '|red\n' +
            '5=>condition: (x) == (1)\n' +
            '|green\n' +
            '6=>condition: (x) == (2)\n' +
            '|green\n' +
            '7=>start: |red\n' +
            '8=>operation: a = a\n' +
            '|red\n' +
            '9=>condition: (x) == (1)\n' +
            '|red\n' +
            '10=>condition: (x) == (2)\n' +
            '|red\n' +
            '11=>operation: b = b\n' +
            '|red\n' +
            '13=>operation: f = 1\n' +
            'b = f\n' +
            '|red\n' +
            '14=>operation: x = x\n' +
            '|green\n' +
            '15=>operation: a = a\n' +
            '|red\n' +
            '16=>operation: return 3\n' +
            '|green\n' +
            '1->6\n' +
            '3->16\n' +
            '4->10\n' +
            '5(yes,right)->14\n' +
            '5(no)->15\n' +
            '6(yes,right)->4\n' +
            '6(no)->5\n' +
            '7->13\n' +
            '8->7\n' +
            '9(yes,right)->11\n' +
            '9(no)->7\n' +
            '10(yes,right)->8\n' +
            '10(no)->9\n' +
            '11->7\n' +
            '13->3\n' +
            '14->3\n' +
            '15->3\n');

    });

    it('paint6', () => {
        assert.equal(showGraph('function YR(x) {\n' +
            '    while (x == 2) {\n' +
            '        if (x == 1) {\n' +
            '            while (x == 1) {\n' +
            '                if (x == 1) {\n' +
            '                    x = x\n' +
            '                } else if (x == 1) {\n' +
            '                    a = a\n' +
            '                }\n' +
            '            }\n' +
            '        } else {\n' +
            '            while (x == 2) {\n' +
            '                if (x == 1) {\n' +
            '                    x = x\n' +
            '                } else if (x == 2) {\n' +
            '                    a = a\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '    }\n' +
            '    return 3;\n' +
            '}','1'),'1=>operation: NULL\n' +
            '|green\n' +
            '3=>condition: (x) == (1)\n' +
            '|red\n' +
            '4=>operation: return 3\n' +
            '|green\n' +
            '5=>condition: (x) == (2)\n' +
            '|green\n' +
            '7=>operation: NULL\n' +
            '|red\n' +
            '8=>operation: NULL\n' +
            '|green\n' +
            '9=>condition: (x) == (1)\n' +
            '|red\n' +
            '11=>condition: (x) == (1)\n' +
            '|red\n' +
            '12=>start: |red\n' +
            '13=>operation: x = x\n' +
            '|red\n' +
            '14=>condition: (x) == (1)\n' +
            '|red\n' +
            '15=>operation: a = a\n' +
            '|red\n' +
            '16=>operation: NULL\n' +
            '|green\n' +
            '17=>condition: (x) == (1)\n' +
            '|red\n' +
            '19=>condition: (x) == (2)\n' +
            '|red\n' +
            '20=>start: |red\n' +
            '21=>operation: x = x\n' +
            '|red\n' +
            '22=>condition: (x) == (2)\n' +
            '|red\n' +
            '23=>operation: a = a\n' +
            '|red\n' +
            '27=>condition: (x) == (1)\n' +
            '|red\n' +
            '29=>condition: (x) == (2)\n' +
            '|red\n' +
            '30=>start: |red\n' +
            '31=>operation: x = x\n' +
            '|red\n' +
            '32=>condition: (x) == (2)\n' +
            '|red\n' +
            '33=>operation: a = a\n' +
            '|red\n' +
            '1->5\n' +
            '3(yes,right)->7\n' +
            '3(no)->8\n' +
            '5(yes,right)->3\n' +
            '5(no)->4\n' +
            '7->11\n' +
            '8->29\n' +
            '9(yes,right)->13\n' +
            '9(no)->14\n' +
            '11(yes,right)->9\n' +
            '11(no)->10\n' +
            '13->12\n' +
            '14(yes,right)->15\n' +
            '14(no)->16\n' +
            '15->12\n' +
            '16->19\n' +
            '17(yes,right)->21\n' +
            '17(no)->22\n' +
            '19(yes,right)->17\n' +
            '19(no)->18\n' +
            '21->20\n' +
            '22(yes,right)->23\n' +
            '22(no)->20\n' +
            '23->20\n' +
            '27(yes,right)->31\n' +
            '27(no)->32\n' +
            '29(yes,right)->27\n' +
            '29(no)->28\n' +
            '31->30\n' +
            '32(yes,right)->33\n' +
            '32(no)->30\n' +
            '33->30\n');

    });


    it('paint7', () => {
        assert.equal(showGraph('function YR(x) {\n' +
            '    while (x == 2) {\n' +
            '        if (x == 1) {\n' +
            '            while (x == 1) {\n' +
            '                if (x == 1) {\n' +
            '                    x = x\n' +
            '                } else if (x == 1) {\n' +
            '                    a = a\n' +
            '                }\n' +
            '            }\n' +
            '        } else {\n' +
            '            while (x == 2) {\n' +
            '                if (x == 1) {\n' +
            '                    x = x\n' +
            '                } else if (x == 2) {\n' +
            '                    a = a\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '    }\n' +
            '    return 3;\n' +
            '}','2'),'1=>operation: NULL\n' +
            '|green\n' +
            '3=>condition: (x) == (1)\n' +
            '|green\n' +
            '4=>operation: return 3\n' +
            '|green\n' +
            '5=>condition: (x) == (2)\n' +
            '|green\n' +
            '7=>operation: NULL\n' +
            '|red\n' +
            '8=>operation: NULL\n' +
            '|green\n' +
            '9=>condition: (x) == (1)\n' +
            '|red\n' +
            '11=>condition: (x) == (1)\n' +
            '|red\n' +
            '12=>start: |red\n' +
            '13=>operation: x = x\n' +
            '|red\n' +
            '14=>condition: (x) == (1)\n' +
            '|red\n' +
            '15=>operation: a = a\n' +
            '|red\n' +
            '16=>operation: NULL\n' +
            '|green\n' +
            '17=>condition: (x) == (1)\n' +
            '|green\n' +
            '19=>condition: (x) == (2)\n' +
            '|green\n' +
            '20=>start: |green\n' +
            '21=>operation: x = x\n' +
            '|red\n' +
            '22=>condition: (x) == (2)\n' +
            '|green\n' +
            '23=>operation: a = a\n' +
            '|green\n' +
            '27=>condition: (x) == (1)\n' +
            '|green\n' +
            '29=>condition: (x) == (2)\n' +
            '|green\n' +
            '30=>start: |green\n' +
            '31=>operation: x = x\n' +
            '|red\n' +
            '32=>condition: (x) == (2)\n' +
            '|green\n' +
            '33=>operation: a = a\n' +
            '|green\n' +
            '1->5\n' +
            '3(yes,right)->7\n' +
            '3(no)->8\n' +
            '5(yes,right)->3\n' +
            '5(no)->4\n' +
            '7->11\n' +
            '8->29\n' +
            '9(yes,right)->13\n' +
            '9(no)->14\n' +
            '11(yes,right)->9\n' +
            '11(no)->10\n' +
            '13->12\n' +
            '14(yes,right)->15\n' +
            '14(no)->16\n' +
            '15->12\n' +
            '16->19\n' +
            '17(yes,right)->21\n' +
            '17(no)->22\n' +
            '19(yes,right)->17\n' +
            '19(no)->18\n' +
            '21->20\n' +
            '22(yes,right)->23\n' +
            '22(no)->20\n' +
            '23->20\n' +
            '27(yes,right)->31\n' +
            '27(no)->32\n' +
            '29(yes,right)->27\n' +
            '29(no)->28\n' +
            '31->30\n' +
            '32(yes,right)->33\n' +
            '32(no)->30\n' +
            '33->30\n');

    });


    it('paint8', () => {
        assert.equal(showGraph('function foo(x){\n' +
            '   let a = x + 1;\n' +
            '   if (x < 4) {\n' +
            '       x++;\n' +
            '   }\n' +
            '   \n' +
            '   return a;\n' +
            '}','1'),'1=>operation: a = (x) + (1)\n' +
            '|green\n' +
            '3=>start: |green\n' +
            '4=>operation: x++\n' +
            '|green\n' +
            '6=>condition: (x) < (4)\n' +
            '|green\n' +
            '7=>operation: return a\n' +
            '|green\n' +
            '1->6\n' +
            '3->7\n' +
            '4->3\n' +
            '6(yes,right)->4\n' +
            '6(no)->3\n');

    });


});
