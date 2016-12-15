/**
 * Created by Rexxar on 2016/11/20.
 */

var option_num, essay_num;//选择题和问答题数量
var quiz_name;

function result() {
    var jsObj = {};
    jsObj.option_num = option_num;//⚠option_num是整数，不是字符串
    jsObj.essay_num = essay_num;
    jsObj.quiz_name = quiz_name;
    jsObj.option_question = [];
    jsObj.essay_question = [];
    alert("this is result");

    for (var i = 1; i <= option_num; i++) {
        var option_question = {};
        var title = document.getElementById("" + i).value;
        alert(title);
        option_question.title = title;
        option_question.a = document.getElementById(i + "_a").value;//未完成
        option_question.b = document.getElementById(i + "_b").value;
        option_question.c = document.getElementById(i + "_c").value;
        option_question.d = document.getElementById(i + "_d").value;

        var check_radio = document.getElementsByName("" + i);
        var answer;
        if (check_radio[0].checked) {
            answer = "a";
        } else if (check_radio[1].checked) {
            answer = "b";
        } else if (check_radio[2].checked) {
            answer = "c";
        } else if (check_radio[3].checked) {
            answer = "d";
        }
        option_question.answer = answer;

        jsObj.option_question.push(option_question);
    }
    for (var i = option_num * 1 + 1; i <= essay_num * 1 + option_num * 1; i++) {
        var essay_question = {};
        var title = document.getElementById("" + i).value;
        essay_question.title = title;
        jsObj.essay_question.push(essay_question);
    }

    var jsonStr = JSON.stringify(jsObj);
    alert(jsonStr);


    // alert("this is ready");
    // $.post("test.php",
    //     {name:"John",city:"Duckburg"},
    //     function (data) {
    //         alert("from js: " + data);
    //     }
    // );

}


function createDiv() {
    // var o = document.getElementById("exercise");
    var o = document.body;

    var quizName = document.getElementById("quizName").value;
    quiz_name = quizName;
    var optionQuestionCount = document.getElementById("optionQuestionCount").value;
    var essayQuestionCount = document.getElementById("essayQuestionCount").value;


    option_num = optionQuestionCount;
    essay_num = essayQuestionCount;

    document.getElementById("releaseQuizForm").remove();
    document.getElementById("quizTitle").innerText = quizName;

    var form = document.createElement("form");
    form.action = "#";
    form.method = "post";

    o.appendChild(form);

    alert("hello");
    for (var i = 1; i <= optionQuestionCount; i++) {
        var divOp = document.createElement("div");
        divOp.className = "list-group-item-text bs-callout bs-callout-info";
        {
            var label = document.createElement("label");
            var textarea = document.createElement("textarea");

            label.for = i;
            label.className = "control-label";
            label.innerHTML = i + '.';

            textarea.className = "form-control form-group";
            textarea.rows = "3";
            textarea.id=i;
            // textarea.name = i + "_question";
            textarea.placeholder = "输入题目";

            divOp.appendChild(label);
            divOp.appendChild(textarea);

            for (var j = 1; j <= 4; j++) {
                var ch;
                j == 1 && (ch = "a") || j == 2 && (ch = "b") || j == 3 && (ch = "c") || j == 4 && (ch = "d");

                var divOption = document.createElement("div");

                divOption.className = "input-group form-group";
                var span = document.createElement("span");

                span.className = "input-group-addon";
                var inputSpan = document.createElement("input");
                inputSpan.type = "radio";
                inputSpan.name = i;
                inputSpan.value = ch;

                span.appendChild(inputSpan);
                var input = document.createElement("input");
                input.type = "text";
                input.className = "form-control";
                input.placeholder = "输入" + ch + "选项";
                input.id = i + "_" + ch;

                divOption.appendChild(span);
                divOption.appendChild(input);

                divOp.appendChild(divOption);
            }
        }
        form.appendChild(divOp);
    }

    for (var i = optionQuestionCount * 1 + 1; i <= essayQuestionCount * 1 + optionQuestionCount * 1; i++) {
        var divOp = document.createElement("div");
        divOp.className = "list-group-item-text bs-callout bs-callout-warning";
        {
            var label = document.createElement("label");
            var textarea = document.createElement("textarea");

            label.for = i;
            label.className = "control-label";
            label.innerHTML = i + '.';

            textarea.className = "form-control form-group";
            textarea.rows = "3";
            // textarea.name = i + "_question";
            textarea.id = i;
            textarea.placeholder = "输入主观题题目";

            divOp.appendChild(label);
            divOp.appendChild(textarea);
        }
        form.appendChild(divOp);
    }

    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary center-block";
    button.onclick = result;
    var buttonSpan = document.createElement("span");
    button.innerHTML = "<span class=\"glyphicon glyphicon-ok\" ></span> 发布";

    form.appendChild(button);
}
