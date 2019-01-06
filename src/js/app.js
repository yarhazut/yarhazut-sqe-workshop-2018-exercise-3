import $ from 'jquery';
import {showSubCode, parseCode, substituteCode, getIfDictionary, createGraph, showGraph} from './code-analyzer';



$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        // //toTable=[];
        // let codeToParse = $('#codePlaceholder').val();
        // let params = document.getElementById('inputText').value;
        // // let parsedCode = parseCode(codeToParse);
        // // $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        // let table = parseCode(codeToParse);
        // table.forEach(function(item){
        //     $('#parsedCode').append('<tr><td>'+item.line+'</td><td>'+item.type+'</td><td>'+item.name+'</td><td>'+item.condition+'</td><td>'+item.value+'</td></tr>');
        // });
        //
        // //console.log(JSON.stringify(table));
        // //let table2= substituteCode(table);
        // let newCode= showSubCode(codeToParse, params);
        // let subTable= document.getElementById('subTable');//html table for newCode
        // let ifDictionary= getIfDictionary();
        //
        // for (let i=0; i< newCode.length; i++){
        //     var row = subTable.insertRow(i);
        //     var cell1 = row.insertCell(0);
        //     cell1.innerHTML = newCode[i];
        //     if (i in ifDictionary){
        //         if (ifDictionary[i]==true)
        //             row.className= 'green';
        //         else
        //             row.className= 'red';
        //     }
        //
        // }
        // //createGraph(codeToParse, params);


        /////////////////////////////////////////
        let codeToParse = $('#codePlaceholder').val();
        let params = document.getElementById('inputText').value;
        ////////////////////////////////////////////////////////

        var stringi= showGraph(codeToParse, params);
        showAndPaintgraph(stringi);

        console.log(stringi);
        console.log('hello');
        let outp= showGraph('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}', '1,2,3');
        console.log(outp);
        //console.log(table2);
        //hello


        function showAndPaintgraph(stringi)
        {
            var diagram = flowchart.parse(stringi);
            diagram.drawSVG('chart', {
                'x': 0,
                'y': 0,
                'line-width': 3,
                'line-length': 50,
                'text-margin': 10,
                'font-size': 14,
                'font-color': 'black',
                'line-color': 'black',
                'element-color': 'black',
                'fill': 'white',
                'yes-text': 'T',
                'no-text': 'F',
                'arrow-end': 'block',
                'scale': 1,
                'symbols': {
                    'start': {
                        'font-color': 'black',
                        'element-color': 'black',
                        'fill': 'white'
                    },
                    'end':{
                        'class': 'end-element'
                    }
                },
                'flowstate' : {
                    'green' : { 'fill' : 'green'},
                    'white': {'fill' : 'red'}
                }
            });
        }
    });


});
